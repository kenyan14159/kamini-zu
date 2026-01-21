"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "./Button";
import styles from "./JoinSection.module.css";

export default function JoinSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const [focused, setFocused] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        inquiryType: "入部について",
        contact: "",
        message: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // エラーをクリア
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
        if (submitStatus === "error") {
            setSubmitStatus("idle");
            setErrorMessage("");
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = "お名前を入力してください";
        }
        
        if (!formData.contact.trim()) {
            newErrors.contact = "連絡先を入力してください";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9-+()]+$/;
            const cleanedContact = formData.contact.replace(/\s/g, "");
            if (!emailRegex.test(formData.contact) && !phoneRegex.test(cleanedContact)) {
                newErrors.contact = "メールアドレスまたは電話番号の形式が正しくありません";
            }
        }
        
        if (formData.message && formData.message.length > 1000) {
            newErrors.message = "1000文字以内で入力してください";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        try {
            const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

            if (!endpoint) {
                setSubmitStatus("error");
                setErrorMessage("送信先が未設定です。NEXT_PUBLIC_CONTACT_ENDPOINT を設定してください。");
                return;
            }

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", inquiryType: "入部について", contact: "", message: "" });
                setErrors({});
                // 3秒後に成功メッセージを非表示
                setTimeout(() => setSubmitStatus("idle"), 3000);
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "送信に失敗しました");
            }
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage("ネットワークエラーが発生しました。しばらく待ってから再度お試しください。");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" ref={sectionRef} className={styles.join}>
            <div className={`${styles.startLine} ${focused ? styles.active : ""}`} ref={lineRef} />

            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Content Side */}
                    <div className={styles.content}>
                        <span className={styles.label}>CONTACT</span>
                        <h2 className={styles.title}>お問い合わせ</h2>
                        <p className={styles.description}>
                            入部に関するご相談やご質問など、
                            お気軽にお問い合わせください。
                        </p>

                        <div className={styles.info}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    {/* Location Icon */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <span className={styles.infoLabel}>LOCATION</span>
                                    <div className={styles.infoValue}>富山県富山市立大沢野</div>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    {/* Mail Icon */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <span className={styles.infoLabel}>EMAIL</span>
                                    <div className={styles.infoValue}>contact@kamini-zu.jp</div>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    {/* Phone Icon */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <span className={styles.infoLabel}>PHONE</span>
                                    <div className={styles.infoValue}>03-1234-5678</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className={styles.formWrapper}>
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            {/* 成功/エラーメッセージ */}
                            {submitStatus === "success" && (
                                <div className={styles.successMessage} role="alert">
                                    送信が完了しました。担当者よりご連絡いたします。
                                </div>
                            )}
                            {submitStatus === "error" && (
                                <div className={styles.errorMessage} role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="name">
                                    お名前 <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`${styles.formInput} ${errors.name ? styles.formInputError : ""}`}
                                    required
                                    placeholder="山田 太郎"
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    value={formData.name}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                {errors.name && (
                                    <span id="name-error" className={styles.errorMessage} role="alert" aria-live="polite">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="inquiryType">お問い合わせ項目</label>
                                <select
                                    id="inquiryType"
                                    name="inquiryType"
                                    className={styles.formInput}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    value={formData.inquiryType}
                                    onChange={handleChange}
                                >
                                    <option>入部について</option>
                                    <option>体験・見学について</option>
                                    <option>練習内容について</option>
                                    <option>大会・記録について</option>
                                    <option>その他</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="contact">
                                    連絡先（メールまたは電話番号） <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    className={`${styles.formInput} ${errors.contact ? styles.formInputError : ""}`}
                                    required
                                    placeholder="example@email.com"
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    value={formData.contact}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.contact}
                                    aria-describedby={errors.contact ? "contact-error" : undefined}
                                />
                                {errors.contact && (
                                    <span id="contact-error" className={styles.errorMessage} role="alert" aria-live="polite">
                                        {errors.contact}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="message">メッセージ・質問など</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className={`${styles.formInput} ${errors.message ? styles.formInputError : ""}`}
                                    placeholder="お問い合わせ内容をご記入ください"
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    value={formData.message}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                />
                                {errors.message && (
                                    <span id="message-error" className={styles.errorMessage} role="alert" aria-live="polite">
                                        {errors.message}
                                    </span>
                                )}
                            </div>

                            <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "送信中..." : "送信する"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
