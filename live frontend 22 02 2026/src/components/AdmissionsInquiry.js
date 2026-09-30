import React from "react";

const AdmissionsInquiry = ({ contact }) => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const mobile = formData.get("mobile");
        const query = formData.get("query");

        const message = encodeURIComponent(`New Admission Query:\n\nName: ${name}\nMobile: ${mobile}\nQuery: ${query}`);
        window.open(`https://wa.me/${contact.whatsapp.replace("+", "")}?text=${message}`, "_blank");
        e.target.reset();
    };

    return (
        <section
            id="admissions"
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
                        Admissions <span className="gradient-text">Inquiry</span>
                    </h2>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            color: "#64748b",
                            marginBottom: "2rem",
                        }}
                    >
                        Have questions about our admission process? Fill out the form below, and our team will connect with you on
                        WhatsApp.
                    </p>
                </div>

                <form
                    onSubmit={handleFormSubmit}
                    style={{
                        background: "#f8fafc",
                        padding: "2rem",
                        borderRadius: "1rem",
                        border: "1px solid #e2e8f0",
                    }}
                >
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "#1e293b",
                                fontWeight: "500",
                            }}
                        >
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.5rem",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "border-color 0.3s ease",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#0ea5e9";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#e2e8f0";
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "#1e293b",
                                fontWeight: "500",
                            }}
                        >
                            Mobile Number *
                        </label>
                        <input
                            type="tel"
                            name="mobile"
                            required
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.5rem",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "border-color 0.3s ease",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#0ea5e9";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#e2e8f0";
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "#1e293b",
                                fontWeight: "500",
                            }}
                        >
                            Your Query
                        </label>
                        <textarea
                            name="query"
                            rows="4"
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.5rem",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "border-color 0.3s ease",
                                resize: "vertical",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#0ea5e9";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#e2e8f0";
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
                            color: "white",
                            border: "none",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 6px 12px rgba(14, 165, 233, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "none";
                        }}
                    >
                        Send WhatsApp Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AdmissionsInquiry;