import React from "react";
import { useTheme } from '../context/ThemeContext';

const Circulars = ({ circulars }) => {
    const { colors } = useTheme();
    
    return (
        <section
            style={{
                padding: "5rem 0",
                background: colors.backgroundAlt,
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
                        Latest <span className="gradient-text">Circulars</span>
                    </h2>
                </div>

                <div
                    style={{
                        background: colors.card,
                        borderRadius: "1rem",
                        overflow: "hidden",
                        boxShadow: colors.cardShadow,
                    }}
                >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: colors.hover }}>
                                <th style={{ padding: "1rem", textAlign: "left", color: colors.text, fontWeight: "600" }}>Unit</th>
                                <th style={{ padding: "1rem", textAlign: "left", color: colors.text, fontWeight: "600" }}>Subject</th>
                                <th style={{ padding: "1rem", textAlign: "left", color: colors.text, fontWeight: "600" }}>Date</th>
                                <th style={{ padding: "1rem", textAlign: "left", color: colors.text, fontWeight: "600" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {circulars.map((circular) => (
                                <tr
                                    key={circular.id}
                                    style={{
                                        borderBottom: `1px solid ${colors.border}`,
                                        transition: "background 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = colors.hover;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = colors.card;
                                    }}
                                >
                                    <td style={{ padding: "1rem", color: colors.textSecondary }}>{circular.unit}</td>
                                    <td style={{ padding: "1rem", color: colors.text, fontWeight: "500" }}>{circular.subject}</td>
                                    <td style={{ padding: "1rem", color: colors.textSecondary }}>{circular.date}</td>
                                    <td style={{ padding: "1rem" }}>
                                        <button
                                            style={{
                                                background: colors.buttonPrimary,
                                                color: colors.buttonText,
                                                border: "none",
                                                padding: "0.5rem 1rem",
                                                borderRadius: "0.25rem",
                                                cursor: "pointer",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Circulars;