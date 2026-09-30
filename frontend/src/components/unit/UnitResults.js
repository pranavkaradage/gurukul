import React from 'react';

const UnitResults = ({ results }) => {
  return (
    <section style={{ padding: '4rem 2rem', background: '#ffffff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '2rem' }}>
          Our <span className="gradient-text">Results</span>
        </h2>
        <div>
          {results.map((result, index) => (
            <div key={index} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', marginBottom: '1rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#0369a1', margin: 0 }}>{result.year} Achievements</h3>
              <p style={{ color: '#475569', margin: '0.5rem 0 0 0' }}>{result.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default UnitResults;