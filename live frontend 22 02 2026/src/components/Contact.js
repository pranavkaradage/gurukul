import React from "react";
import { useTheme } from '../context/ThemeContext';

const Contact = ({ contact }) => {
    const { colors } = useTheme();
    
    return (
        <section
            id="contact"
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
                        Contact <span className="gradient-text">Us</span>
                    </h2>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {/* Head Office */}
                    <div
                        style={{
                            background: colors.card,
                            padding: "2rem",
                            borderRadius: "1rem",
                            boxShadow: colors.cardShadow,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: colors.text,
                                marginBottom: "1rem",
                            }}
                        >
                            {contact.headOffice.name}
                        </h3>
                        <p
                            style={{
                                color: colors.textSecondary,
                                marginBottom: "1rem",
                                lineHeight: "1.6",
                            }}
                        >
                            {contact.headOffice.address}
                        </p>
                        <div style={{ marginBottom: "1rem" }}>
                            {contact.headOffice.phones.map((phone, index) => (
                                <a
                                    key={index}
                                    href={`tel:${phone}`}
                                    style={{
                                        display: "block",
                                        color: colors.primary,
                                        textDecoration: "none",
                                        marginBottom: "0.25rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    📞 {phone}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Ichalkaranji Branch */}
                    <div
                        style={{
                            background: colors.card,
                            padding: "2rem",
                            borderRadius: "1rem",
                            boxShadow: colors.cardShadow,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: colors.text,
                                marginBottom: "1rem",
                            }}
                        >
                            {contact.ichalkaranji.name}
                        </h3>
                        <p
                            style={{
                                color: colors.textSecondary,
                                marginBottom: "1rem",
                                lineHeight: "1.6",
                            }}
                        >
                            {contact.ichalkaranji.address}
                        </p>
                        <div style={{ marginBottom: "1rem" }}>
                            {contact.ichalkaranji.phones.map((phone, index) => (
                                <a
                                    key={index}
                                    href={`tel:${phone}`}
                                    style={{
                                        display: "block",
                                        color: colors.primary,
                                        textDecoration: "none",
                                        marginBottom: "0.25rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    📞 {phone}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* General Contact */}
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "3rem",
                        background: colors.card,
                        padding: "2rem",
                        borderRadius: "1rem",
                        boxShadow: colors.cardShadow,
                    }}
                >
                    <h3
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: colors.text,
                            marginBottom: "1rem",
                        }}
                    >
                        General Information
                    </h3>
                    <p style={{ marginBottom: "1rem", color: colors.textSecondary }}>
                        <strong>Email:</strong>{" "}
                        <a
                            href={`mailto:${contact.email}`}
                            style={{
                                color: colors.primary,
                                textDecoration: "none",
                            }}
                        >
                            {contact.email}
                        </a>
                    </p>
                    <p style={{ color: colors.textSecondary }}>
                        <strong>WhatsApp:</strong>{" "}
                        <a
                            href={`https://wa.me/${contact.whatsapp.replace("+", "")}`}
                            style={{
                                color: colors.primary,
                                textDecoration: "none",
                            }}
                        >
                            {contact.whatsapp}
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;