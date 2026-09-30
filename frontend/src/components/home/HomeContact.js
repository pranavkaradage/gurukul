import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const HomeContact = ({ contact = {}, socialMedia = {} }) => {
  const { colors } = useTheme();
  
  const email = contact?.email || '';
  const whatsapp = contact?.whatsapp || '';
  const whatsappNumber = whatsapp ? whatsapp.replace(/\+/g, '') : '';
  
  return (
    <section style={{ padding: '4rem 2rem', background: colors.backgroundGradient }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: colors.text, marginBottom: '2rem' }}>
          <span className="gradient-text">Contact Us</span>
        </h2>
        <div style={{ background: colors.card, padding: '2rem', borderRadius: '1rem', border: `1px solid ${colors.border}`, boxShadow: colors.cardShadow }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: colors.text, marginBottom: '1.5rem' }}>Get in Touch</h3>
            {email && (
              <p style={{ fontSize: '1.2rem', color: colors.textSecondary, marginBottom: '1rem' }}>
                  <strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: colors.primary, textDecoration: 'none' }}>{email}</a>
              </p>
            )}
            {whatsapp && (
              <p style={{ fontSize: '1.2rem', color: colors.textSecondary, marginBottom: '2rem' }}>
                  <strong>WhatsApp:</strong> <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{ color: colors.primary, textDecoration: 'none' }}>{whatsapp}</a>
              </p>
            )}
        </div>
      </div>
    </section>
  );
};
export default HomeContact;