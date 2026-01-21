"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollIndicator.module.css";

export default function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY < 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <button
            className={`${styles.indicator} ${isVisible ? styles.visible : ""}`}
            onClick={scrollToContent}
            aria-label="下にスクロール"
        >
            <span className={styles.text}>SCROLL</span>
            <div className={styles.line}>
                <div className={styles.lineFill} />
            </div>
        </button>
    );
}
