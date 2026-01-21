import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください").max(100, "100文字以内で入力してください"),
  grade: z.string().min(1),
  contact: z.string().min(1, "連絡先を入力してください").refine(
    (val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9-+()]+$/;
      const cleanedContact = val.replace(/\s/g, "");
      return emailRegex.test(val) || phoneRegex.test(cleanedContact);
    },
    "メールアドレスまたは電話番号の形式が正しくありません"
  ),
  message: z.string().max(1000, "1000文字以内で入力してください").optional(),
});

// レート制限用の簡易実装（本番ではRedis等を使用推奨）
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1分間
    return true;
  }
  
  if (limit.count >= 5) {
    return false; // 1分間に5回まで
  }
  
  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
               request.headers.get("x-real-ip") || 
               "unknown";
    
    // レート制限チェック
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "送信回数が多すぎます。しばらく待ってから再度お試しください。" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = contactSchema.parse(body);

    // メール送信処理（SendGrid、Resend、Nodemailer等）
    // 例: ここではコンソールに出力（本番環境では実際のメール送信サービスを使用）
    console.log("Contact form submission:", {
      name: validated.name,
      grade: validated.grade,
      contact: validated.contact,
      message: validated.message,
      timestamp: new Date().toISOString(),
    });

    // TODO: 実際のメール送信処理を実装
    // 例: Resendを使用する場合
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "contact@kamini-zu.jp",
    //   to: "admin@kamini-zu.jp",
    //   subject: `体験入部申し込み: ${validated.name}`,
    //   html: `
    //     <h2>体験入部申し込み</h2>
    //     <p><strong>お名前:</strong> ${validated.name}</p>
    //     <p><strong>学年:</strong> ${validated.grade}</p>
    //     <p><strong>連絡先:</strong> ${validated.contact}</p>
    //     ${validated.message ? `<p><strong>メッセージ:</strong><br>${validated.message}</p>` : ""}
    //   `,
    // });

    // またはデータベース保存（Prisma、Drizzle等）
    
    return NextResponse.json({ 
      success: true,
      message: "送信が完了しました。担当者よりご連絡いたします。" 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "バリデーションエラーが発生しました" },
        { status: 400 }
      );
    }
    
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "送信に失敗しました。しばらく待ってから再度お試しください。" },
      { status: 500 }
    );
  }
}

