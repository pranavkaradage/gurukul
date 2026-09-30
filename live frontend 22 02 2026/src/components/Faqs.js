import React from "react";

const Faqs = ({ faqs }) => {
    return (
        <section
            style={{
                padding: "5rem 0",
                background: "white",
            }}
        >
            <div
                style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "0 2rem",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "700",
                            color: "#1e293b",
                            marginBottom: "1rem",
                        }}
                    >
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                </div>

                <div style={{ space: "1rem" }}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            style={{
                                background: "#f8fafc",
                                borderRadius: "1rem",
                                padding: "1.5rem",
                                marginBottom: "1rem",
                                border: "1px solid #e2e8f0",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                    color: "#1e293b",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {faq.question}
                            </h3>
                            <p style={{ color: "#64748b", lineHeight: "1.6" }}>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faqs;