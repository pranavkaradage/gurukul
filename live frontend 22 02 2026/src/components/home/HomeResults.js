import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const HomeResults = ({ results }) => {
  const { colors } = useTheme();
  
  // This is a "guard clause". If results is undefined or null, the component returns nothing instead of crashing.
  if (!results) {
    return null; 
  }

  return (
    <section style={{ padding: '4rem 2rem', background: colors.backgroundAlt }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: colors.text, marginBottom: '2rem' }}>
          Our <span className="gradient-text">Stellar Results (2025)</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {/* This line is now safe because of the check above */}
          {Object.entries(results).map(([key, value]) => (
            <div key={key} style={{ background: colors.card, padding: '2rem', borderRadius: '1rem', border: `1px solid ${colors.border}`, boxShadow: colors.cardShadow }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: colors.primary, textTransform: 'uppercase', marginBottom: '1rem' }}>{key}</h3>
              <p style={{ fontSize: '1rem', color: colors.textSecondary }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeResults;