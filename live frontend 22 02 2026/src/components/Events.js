import React from "react";
const Events = ({ events }) => {
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
                        School <span className="gradient-text">Events</span>
                    </h2>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {events.map((event, index) => (
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
                                    width: "80px",
                                    height: "80px",
                                    background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 1rem",
                                    fontSize: "2rem",
                                }}
                            >
                                🎉
                            </div>
                            <h3
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "600",
                                    color: "#1e293b",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {event}
                            </h3>
                            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                                Join us for this exciting event celebrating our school community
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;