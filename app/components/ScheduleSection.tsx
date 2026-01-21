"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../utils/gsap";
import styles from "./ScheduleSection.module.css";

const SCHEDULE_DATA = [
    {
        month: "APR",
        day: "04",
        title: "春季陸上競技大会",
        type: "COMPETITION",
        location: "県総合運動公園",
    },
    {
        month: "MAY",
        day: "15",
        title: "記録会・強化練習",
        type: "PRACTICE",
        location: "市営陸上競技場",
    },
    {
        month: "JUL",
        day: "22",
        title: "夏季合宿",
        type: "EVENT",
        location: "高原トレーニングセンター",
    },
    {
        month: "SEP",
        day: "10",
        title: "秋季選手権",
        type: "COMPETITION",
        location: "県総合運動公園",
    },
    {
        month: "DEC",
        day: "25",
        title: "クリスマスリレーマラソン",
        type: "EVENT",
        location: "海浜公園コース",
    },
];

export default function ScheduleSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Timeline Line animation
            gsap.from(`.${styles.timelineLine}`, {
                scaleY: 0,
                transformOrigin: "top",
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            // Items animation
            itemsRef.current.forEach((item, index) => {
                if (!item) return;

                const isLeft = index % 2 === 0;

                gsap.from(item, {
                    x: isLeft ? -50 : 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="schedule" ref={sectionRef} className={styles.schedule}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>SCHEDULE</span>
                    <h2 className={styles.title}>ANNUAL PLAN</h2>
                    <p className={styles.description}>
                        年間の主要な大会とイベントスケジュール
                    </p>
                </div>

                <div className={styles.timeline}>
                    <div className={styles.timelineLine} />

                    {SCHEDULE_DATA.map((event, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                ref={(el) => { itemsRef.current[index] = el; }}
                                className={`${styles.eventCard} ${isLeft ? styles.left : styles.right}`}
                            >
                                <div className={styles.eventDot} />

                                <div className={styles.eventDate}>
                                    <span className={styles.eventMonth}>{event.month}</span>
                                    <span className={styles.eventDay}>{event.day}</span>
                                </div>

                                <div className={styles.eventContent}>
                                    <div className={styles.eventType}>
                                        {event.type}
                                    </div>
                                    <h3 className={styles.eventTitle}>{event.title}</h3>
                                    <p className={styles.eventLocation}>
                                        {/* SVG Location Icon */}
                                        <svg className={styles.locationIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        {event.location}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
