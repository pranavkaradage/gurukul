import React from 'react';
import GoogleMap from '../common/GoogleMap';

const UnitContact = ({ contact }) => {
  if (!contact) {
    return null;
  }

  return (
    <section style={{ padding: '4rem 2rem', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', textAlign: 'center', marginBottom: '3rem' }}>
          <span className="gradient-text">Contact Us & Location</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>Get in Touch</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.1rem' }}>{contact.address || 'Address not available'}</p>
            {contact.phones && contact.phones.length > 0 ? (
              contact.phones.filter(phone => phone && phone.trim() !== '').map((phone, index) => (
                <a key={index} href={`tel:${phone}`} style={{ display: 'block', color: '#0ea5e9', textDecoration: 'none', marginBottom: '0.5rem', fontWeight: '500', fontSize: '1.1rem' }}>
                  📞 {phone}
                </a>
              ))
            ) : (
              <p style={{ color: '#64748b', fontSize: '1rem' }}>Phone numbers not available</p>
            )}
          </div>
          <div>
            <GoogleMap embedUrl={contact.mapEmbedUrl} title="Unit Location" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default UnitContact;