"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "../utils/gsap";
import styles from "./RecordsSection.module.css";

interface Record {
    event: string;
    category: string;
    time: string;
    name: string;
    year: string;
}

const records: Record[] = [
    { event: "100m", category: "中学男子", time: "11.82", name: "田中 太郎", year: "2024" },
    { event: "100m", category: "中学女子", time: "12.95", name: "佐藤 花子", year: "2024" },
    { event: "200m", category: "中学男子", time: "24.15", name: "山田 健一", year: "2023" },
    { event: "800m", category: "中学女子", time: "2:18.42", name: "鈴木 美咲", year: "2024" },
    { event: "1500m", category: "中学男子", time: "4:12.35", name: "高橋 翔太", year: "2024" },
    { event: "走幅跳", category: "小学男子", time: "4.85m", name: "伊藤 大輝", year: "2024" },
];

function SplitFlapDigit({ value, delay }: { value: string; delay: number }) {
    const [displayValue, setDisplayValue] = useState("0");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAnimating(true);

            // Simulate split-flap animation with rapid character changes
            let count = 0;
            const chars = "0123456789.:m";
            const interval = setInterval(() => {
                if (count < 10) {
                    setDisplayValue(chars[Math.floor(Math.random() * chars.length)]);
                    count++;
                } else {
                    setDisplayValue(value);
                    setIsAnimating(false);
                    clearInterval(interval);
                }
            }, 50);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return (
        <span className={`${styles.digit} ${isAnimating ? styles.animating : ""}`}>
            {displayValue}
        </span>
    );
}

function RecordTime({ time }: { time: string }) {
    return (
        <div className={styles.time}>
            {time.split("").map((char, i) => (
                <SplitFlapDigit key={i} value={char} delay={i * 100} />
            ))}
        </div>
    );
}

export default function RecordsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [isInView, setIsInView] = useState(false);

    const categories = ["all", "小学男子", "小学女子", "中学男子", "中学女子"];

    const filteredRecords = activeCategory === "all"
        ? records
        : records.filter((r) => r.category === activeCategory);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 60%",
                onEnter: () => setIsInView(true),
            });

            // Title animation
            gsap.from(`.${styles.title}`, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                x: -50,
                duration: 1,
                ease: "power4.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="records" ref={sectionRef} className={styles.records}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.label}>RECORDS</span>
                    <h2 className={styles.title}>チーム記録</h2>
                </div>

                {/* Category Filter */}
                <div className={styles.filters}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterButton} ${activeCategory === cat ? styles.active : ""}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat === "all" ? "ALL" : cat}
                        </button>
                    ))}
                </div>

                {/* Records Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>種目</th>
                                <th>カテゴリ</th>
                                <th>記録</th>
                                <th>選手</th>
                                <th>年度</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record, index) => (
                                <tr key={`${record.event}-${record.category}`} className={styles.row}>
                                    <td className={styles.event}>{record.event}</td>
                                    <td className={styles.category}>{record.category}</td>
                                    <td>
                                        {isInView ? (
                                            <RecordTime time={record.time} />
                                        ) : (
                                            <span className={styles.time}>--:--</span>
                                        )}
                                    </td>
                                    <td className={styles.name}>{record.name}</td>
                                    <td className={styles.year}>{record.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
