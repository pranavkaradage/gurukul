import React from "react";
import { useTheme } from '../../context/ThemeContext';

const Footer = ({ title, contact, socialMedia }) => {
  const { colors, isDark } = useTheme();
  const footerBg = isDark 
    ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" 
    : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)";
  return (
    <footer id="site-footer" style={{ background: footerBg, color: "white", padding: "3rem 0 1rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>G</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>{title}</h3>
            </div>
            <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>Blending modern education with traditional Indian culture since 2009.</p>
          </div>
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem" }}>Contact Info</h4>
            <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>📧 <a href={`mailto:${contact.email}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>{contact.email}</a></p>
            <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>📱 <a href={`https://wa.me/${contact.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none' }}>{contact.whatsapp}</a></p>
          </div>
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem" }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '999px',
                      background: '#1877F2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(24, 119, 242, 0.4)',
                    }}
                  >
                    <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: 700, fontFamily: 'system-ui' }}>
                      f
                    </span>
                  </div>
                </a>
              )}
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '999px',
                      background: 'radial-gradient(circle at 30% 30%, #feda77, #f58529, #dd2a7b, #8134af, #515bd4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(221, 42, 123, 0.5)',
                    }}
                  >
                    <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: 700 }}>
                      ◎
                    </span>
                  </div>
                </a>
              )}
              {socialMedia.youtube && (
                <a
                  href={socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '999px',
                      background: '#FF0000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(255, 0, 0, 0.45)',
                    }}
                  >
                    <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>
                      ▶
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #334155", paddingTop: "1rem", textAlign: "center", color: "#94a3b8", fontSize: "0.9rem" }}>
          <p>© {new Date().getFullYear()} {title}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;