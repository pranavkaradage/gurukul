import React from "react";
import { useTheme } from '../context/ThemeContext';

const AboutUs = ({ about, management }) => {
    const { colors } = useTheme();
    
    return (
        <section
            id="about-us"
            style={{
                padding: "5rem 0",
                background: colors.backgroundGradient,
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 2rem",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "700",
                            color: colors.text,
                            marginBottom: "1rem",
                        }}
                    >
                        About <span className="gradient-text">Gurukul</span>
                    </h2>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            color: colors.textSecondary,
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        {about.description}
                    </p>
                </div>

                {/* Vision, Mission, Ethos */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                        marginBottom: "4rem",
                    }}
                >
                    <div
                        style={{
                            background: colors.card,
                            padding: "2rem",
                            borderRadius: "1rem",
                            boxShadow: colors.cardShadow,
                            textAlign: "center",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: colors.primary,
                                marginBottom: "1rem",
                            }}
                        >
                            Vision
                        </h3>
                        <p style={{ color: colors.textSecondary }}>{about.vision}</p>
                    </div>

                    <div
                        style={{
                            background: colors.card,
                            padding: "2rem",
                            borderRadius: "1rem",
                            boxShadow: colors.cardShadow,
                            textAlign: "center",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: colors.primary,
                                marginBottom: "1rem",
                            }}
                        >
                            Mission
                        </h3>
                        <p style={{ color: colors.textSecondary }}>{about.mission}</p>
                    </div>

                    <div
                        style={{
                            background: colors.card,
                            padding: "2rem",
                            borderRadius: "1rem",
                            boxShadow: colors.cardShadow,
                            textAlign: "center",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: colors.primary,
                                marginBottom: "1rem",
                            }}
                        >
                            Our Ethos
                        </h3>
                        <ul style={{ listStyle: "none", padding: 0, color: colors.textSecondary }}>
                            {about.ethos.map((item, index) => (
                                <li key={index} style={{ marginBottom: "0.5rem" }}>
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Management */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h3
                        style={{
                            fontSize: "2rem",
                            fontWeight: "600",
                            color: colors.text,
                            marginBottom: "2rem",
                        }}
                    >
                        Leadership
                    </h3>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "3rem",
                            flexWrap: "wrap",
                        }}
                    >
                        {[...management]
                            .sort((a, b) => {
                                const rank = (t) => {
                                    const title = (t || '').toLowerCase();
                                    if (title.includes('chairman') && !title.includes('vice')) return 1;
                                    if (title.includes('vice') && title.includes('chairman')) return 2;
                                    return 3;
                                };
                                return rank(a.title) - rank(b.title);
                            })
                            .slice(0, 2)
                            .map((person, index) => (
                            <div
                                key={index}
                                style={{
                                    textAlign: "center",
                                    background: colors.card,
                                    padding: "2rem",
                                    borderRadius: "1rem",
                                    boxShadow: colors.cardShadow,
                                    minWidth: "250px",
                                }}
                            >
                                <img
                                    src={person.photo || "/placeholder.svg"}
                                    alt={person.name}
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginBottom: "1rem",
                                        border: `4px solid ${colors.primary}`,
                                    }}
                                />
                                <h4
                                    style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "600",
                                        color: colors.text,
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {person.name}
                                </h4>
                                <p style={{ color: colors.primary, fontWeight: "500" }}>{person.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;