import React, { useState } from 'react';
import { publicApi } from '../../services/api';

const UnitAdmissionForm = ({ unitName, contact }) => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const mobile = formData.get("mobile");
        const query = formData.get("query");

        try {
            // Submit to API
            await publicApi.submitAdmissionInquiry({
                name,
                mobile,
                query,
                unitName
            });

            setSubmitted(true);
            e.target.reset();

            // Also open WhatsApp (optional)
            if (contact && contact.whatsapp) {
                const message = `New Admission Query for ${unitName}:\n\nName: ${name}\nMobile: ${mobile}\nQuery: ${query}`;
                const whatsappUrl = `https://wa.me/${contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, "_blank");
            }
        } catch (error) {
            console.error("Error submitting inquiry:", error);
            alert("Failed to submit inquiry. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b' }}>
                        Admission <span className="gradient-text">Inquiry</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Fill out the form below, and our team will connect with you via WhatsApp.</p>
                </div>
                <form onSubmit={handleFormSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1e293b', fontWeight: '500' }}>Full Name *</label>
                        <input type="text" name="name" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '1rem' }} />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1e293b', fontWeight: '500' }}>Mobile Number *</label>
                        <input type="tel" name="mobile" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '1rem' }} />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1e293b', fontWeight: '500' }}>Your Query</label>
                        <textarea name="query" rows="4" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }} />
                    </div>
                    {submitted && (
                        <div style={{ marginBottom: '1rem', padding: '1rem', background: '#d1fae5', color: '#065f46', borderRadius: '0.5rem' }}>
                            Inquiry submitted successfully!
                        </div>
                    )}
                    <button type="submit" disabled={submitting} style={{ width: '100%', background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)', color: 'white', border: 'none', padding: '1rem', borderRadius: '0.5rem', fontSize: '1.1rem', fontWeight: '600', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? 'Submitting...' : 'Submit Inquiry'}
                    </button>
                </form>
            </div>
        </section>
    );
};
export default UnitAdmissionForm;