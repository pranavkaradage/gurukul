import React from "react";

const AcademicUnits = ({ units, setSelectedUnit }) => {
    return (
        <section
            id="units"
            style={{
                padding: "5rem 0",
                background: "white",
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
                        Our <span className="gradient-text">Academic Units</span>
                    </h2>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            color: "#64748b",
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        Specialized academies designed to nurture excellence in every field
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {units.map((unit) => (
                        <div
                            key={unit.id}
                            className="hover-scale"
                            style={{
                                background: "white",
                                borderRadius: "1rem",
                                overflow: "hidden",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                            onClick={() => setSelectedUnit(unit)}
                        >
                            <img
                                src={unit.photo || "/placeholder.svg"}
                                alt={unit.name}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                }}
                            />
                            <div style={{ padding: "1.5rem" }}>
                                <h3
                                    style={{
                                        fontSize: "1.3rem",
                                        fontWeight: "600",
                                        color: "#1e293b",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {unit.name}
                                </h3>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {unit.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            style={{
                                                color: "#64748b",
                                                marginBottom: "0.5rem",
                                                paddingLeft: "1rem",
                                                position: "relative",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    left: 0,
                                                    color: "#0ea5e9",
                                                }}
                                            >
                                                •
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    style={{
                                        background: "#f1f5f9",
                                        padding: "1rem",
                                        borderRadius: "0.5rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <strong style={{ color: "#0369a1" }}>Results: </strong>
                                    <span style={{ color: "#64748b" }}>{unit.results}</span>
                                </div>
                                <button
                                    style={{
                                        background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
                                        color: "white",
                                        border: "none",
                                        padding: "0.75rem 1.5rem",
                                        borderRadius: "0.5rem",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        fontWeight: "500",
                                        width: "100%",
                                    }}
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AcademicUnits;