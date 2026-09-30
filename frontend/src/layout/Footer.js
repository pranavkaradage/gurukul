import React from "react";

const Footer = ({ title, contact, scrollToSection }) => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        color: "white",
        padding: "3rem 0 1rem",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* About */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                G
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>{title}</h3>
            </div>
            <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
              Blending modern education with traditional Indian culture since
              2009.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                { id: "about-us", label: "About Us" },
                { id: "units", label: "Our Units" },
                { id: "admissions", label: "Admissions" },
                { id: "contact", label: "Contact" },
              ].map((link) => (
                <li key={link.id} style={{ marginBottom: "0.5rem" }}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#0ea5e9";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#94a3b8";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Contact Info
            </h4>
            <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>
              📧 {contact.email}
            </p>
            <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>
              📱 {contact.whatsapp}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid #334155",
            paddingTop: "1rem",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.9rem",
          }}
        >
          <p>© 2025 {title}. All rights reserveddddddd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
