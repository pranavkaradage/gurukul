
import React from 'react';

const UnitFeatures = ({ features }) => {
  return (
    <section style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '2rem' }}>
          Key <span className="gradient-text">Features</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {features.map((feature, index) => (
            <div key={index} style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: '#0ea5e9', fontSize: '1.5rem', fontWeight: 'bold' }}>✓</span>
              <p style={{ fontSize: '1rem', color: '#475569', margin: 0, textAlign: 'left' }}>{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default UnitFeatures;