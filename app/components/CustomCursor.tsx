"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isKeyboardUser, setIsKeyboardUser] = useState(false);

    useEffect(() => {
        // タッチデバイス判定
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const cursor = cursorRef.current;
        if (!cursor) return;

        let rafId: number | null = null;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        // キーボード操作の検出
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Tab") {
                setIsKeyboardUser(true);
                setIsVisible(false);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            // キーボードユーザーの場合は非表示のまま
            if (isKeyboardUser) return;
            
            setIsVisible(true);
            targetX = e.clientX;
            targetY = e.clientY;

            // requestAnimationFrameで最適化
            if (rafId === null) {
                rafId = requestAnimationFrame(() => {
                    // 線形補間でスムーズに
                    currentX += (targetX - currentX) * 0.15;
                    currentY += (targetY - currentY) * 0.15;

                    gsap.set(cursor, {
                        x: currentX,
                        y: currentY,
                        duration: 0,
                    });

                    rafId = null;
                });
            }
        };

        const handleMouseEnter = () => {
            if (!isKeyboardUser) setIsVisible(true);
        };
        
        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        const handleMouseEnterInteractive = () => setIsHovering(true);
        const handleMouseLeaveInteractive = () => setIsHovering(false);

        // イベントリスナーの登録
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnterInteractive);
            el.addEventListener("mouseleave", handleMouseLeaveInteractive);
        });

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnterInteractive);
                el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
            });
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [isKeyboardUser]);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    // キーボードユーザーの場合は非表示
    if (isKeyboardUser) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className="cursor-main"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: isHovering ? "40px" : "12px",
                height: isHovering ? "40px" : "12px",
                backgroundColor: isHovering ? "transparent" : "var(--color-primary)",
                border: isHovering ? "1px solid var(--color-primary)" : "none",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 9999,
                transform: "translate(-50%, -50%)",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.3s ease",
                willChange: "transform",
            }}
            aria-hidden="true"
        />
    );
}
