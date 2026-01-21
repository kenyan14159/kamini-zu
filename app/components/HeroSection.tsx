"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Button from "./Button";
import ScrollIndicator from "./ScrollIndicator";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main Title Animation
            const chars = titleWrapperRef.current?.querySelectorAll(".char");
            if (chars) {
                gsap.from(chars, {
                    yPercent: 120,
                    opacity: 0,
                    scale: 0.92,
                    rotationZ: -2,
                    filter: "blur(6px)",
                    stagger: 0.06,
                    duration: 1.25,
                    ease: "power4.out",
                    delay: 0.15,
                });
            }

            // Sub elements animation
            gsap.from(`.${styles.heroContent} > *:not(.${styles.titleMain})`, {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.8,
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text: string) => {
        return text.split("").map((char, i) => (
            <span key={i} className={styles.charWrapper}>
                <span className="char">{char}</span>
            </span>
        ));
    };

    return (
        <section ref={sectionRef} className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.heroContent}>

                    <h1 className={styles.titleMain} ref={titleWrapperRef}>
                        <div className={styles.titleRow}>
                            {splitText("かみにーず")}
                        </div>
                    </h1>

                    <p className={styles.mission}>
                        <span className={styles.missionText}>
                            富山県富山市立大沢野の陸上クラブ「かみにーず」<br />
                            全国中学駅伝出場を目指して。
                        </span>
                    </p>

                    <div className={styles.ctaGroup}>
                        <Button variant="primary" size="lg" href="#contact">
                            お問い合わせ
                        </Button>
                        <Button variant="ghost" size="lg" href="#about">
                            クラブについて
                        </Button>
                    </div>
                </div>
            </div>

            <ScrollIndicator />
        </section>
    );
}
