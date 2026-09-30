import React from 'react';
import { getImageUrl } from '../../utils/imageUtils';

const PrincipalsDesk = ({ principal }) => {
  // Guard Clause: If there is no principal data, render nothing.
  if (!principal) {
    return null;
  }

  const imageUrl = getImageUrl(principal.photo);

  return (
    <section style={{ padding: '4rem 2rem', background: '#ffffff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '3rem' }}>
          From the <span className="gradient-text">Principal's Desk</span>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            {imageUrl ? (
              <img src={imageUrl} alt={principal.name} style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '5px solid #0ea5e9', marginBottom: '1rem' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            ) : null}
            {!imageUrl && (
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', border: '5px solid #0ea5e9', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '4rem', fontWeight: '600' }}>
                {principal.name ? principal.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <h4 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#1e293b', margin: 0 }}>{principal.name}</h4>
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <p style={{ fontSize: '1.1rem', color: '#475569', fontStyle: 'italic', lineHeight: '1.8', borderLeft: '4px solid #0ea5e9', paddingLeft: '2rem', margin: 0 }}>
              "{principal.message}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalsDesk;