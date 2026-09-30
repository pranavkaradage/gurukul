import React, { useState, useEffect, useRef } from "react";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    let start = 0;
                    const increment = end / (duration / 16);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration, isVisible]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
};

const Statistics = ({ stats }) => {
    return (
        <section
            style={{
                padding: "4rem 0",
                background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
                color: "white",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 2rem",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "2rem",
                        textAlign: "center",
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: "3rem",
                                fontWeight: "800",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <AnimatedCounter end={stats.branches} />
                        </div>
                        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>Branches</p>
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: "3rem",
                                fontWeight: "800",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <AnimatedCounter end={stats.divisions} />
                        </div>
                        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>Divisions</p>
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: "3rem",
                                fontWeight: "800",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <AnimatedCounter end={stats.years} suffix="+" />
                        </div>
                        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>Years of Legacy</p>
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: "3rem",
                                fontWeight: "800",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <AnimatedCounter end={stats.employees} suffix="+" />
                        </div>
                        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>Dedicated Employees</p>
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: "3rem",
                                fontWeight: "800",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <AnimatedCounter end={stats.students} suffix="+" />
                        </div>
                        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>Students Enrolled</p>
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: "3rem",
                                fontWeight: "800",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <AnimatedCounter end={stats.happyParents} suffix="+" />
                        </div>
                        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>Happy Parents</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;