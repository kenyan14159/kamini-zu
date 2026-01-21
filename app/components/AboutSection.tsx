"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../utils/gsap";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.from(`.${styles.title}`, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power4.out",
            });

            // Description animation
            gsap.from(`.${styles.description}`, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.2,
            });

            // Features removed
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className={styles.about}>
            <div className={styles.container}>
                {/* Section Header */}
                <div className={styles.header}>
                    <span className={styles.label}>ABOUT</span>
                    <h2 className={styles.title}>
                        すべての一歩が、<br />
                        <span className={styles.highlight}>未来を刻む。</span>
                    </h2>
                    <p className={styles.description}>
                        「かみにーず」は、富山県富山市立大沢野を拠点とする陸上クラブチームです。
                        全国中学駅伝出場を目指し、小学生・中学生が日々練習に励んでいます。
                    </p>
                </div>

                {/* Stats removed */}
            </div>
        </section>
    );
}
