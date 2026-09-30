import React from "react";

const Facilities = ({ facilities }) => {
    return (
        <section
            style={{
                padding: "5rem 0",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
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
                            color: "#1e293b",
                            marginBottom: "1rem",
                        }}
                    >
                        World-Class <span className="gradient-text">Facilities</span>
                    </h2>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {facilities.map((facility, index) => (
                        <div
                            key={index}
                            className="hover-scale"
                            style={{
                                background: "white",
                                padding: "2rem",
                                borderRadius: "1rem",
                                textAlign: "center",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 1rem",
                                    fontSize: "1.5rem",
                                }}
                            >
                                🏫
                            </div>
                            <h3
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                    color: "#1e293b",
                                }}
                            >
                                {facility}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Facilities;