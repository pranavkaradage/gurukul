import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const HomeAdmissions = ({ contact }) => {
    const { colors } = useTheme();
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const mobile = formData.get("mobile");
        const query = formData.get("query");
        const message = `New Admission Query from Homepage:\n\nName: ${name}\nMobile: ${mobile}\nQuery: ${query}`;
        const whatsappUrl = `https://wa.me/${contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        e.target.reset();
    };

    return (
        <section style={{ padding: '4rem 2rem', background: colors.backgroundGradient }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: colors.text }}>
                        Admission <span className="gradient-text">Inquiry</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: colors.textSecondary }}>Fill out the form below, and our team will connect with you via WhatsApp.</p>
                </div>
                <form onSubmit={handleFormSubmit} style={{ background: colors.card, padding: '2rem', borderRadius: '1rem', border: `1px solid ${colors.border}`, boxShadow: colors.cardShadow }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.text, fontWeight: '500' }}>Full Name *</label>
                        <input type="text" name="name" required style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', fontSize: '1rem', background: colors.backgroundAlt, color: colors.text }} />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.text, fontWeight: '500' }}>Mobile Number *</label>
                        <input type="tel" name="mobile" required style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', fontSize: '1rem', background: colors.backgroundAlt, color: colors.text }} />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.text, fontWeight: '500' }}>Your Query</label>
                        <textarea name="query" rows="4" placeholder="e.g., I'd like to know about the admission process for GEMS." style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical', background: colors.backgroundAlt, color: colors.text }} />
                    </div>
                    <button type="submit" style={{ width: '100%', background: colors.buttonPrimary, color: colors.buttonText, border: 'none', padding: '1rem', borderRadius: '0.5rem', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' }}>
                        Send WhatsApp Message
                    </button>
                </form>
            </div>
        </section>
    );
};
export default HomeAdmissions;