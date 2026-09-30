import React from 'react';

const UnitCirculars = ({ circulars }) => {
  return (
    <section style={{ padding: '4rem 2rem', background: '#ffffff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', textAlign: 'center', marginBottom: '2rem' }}>
          <span className="gradient-text">Circulars</span>
        </h2>
        <div style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#1e293b', fontWeight: '600' }}>Subject</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#1e293b', fontWeight: '600' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {circulars.length > 0 ? circulars.map((circular) => (
                <tr key={circular.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', color: '#1e293b', fontWeight: '500' }}>{circular.subject}</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{circular.date}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="2" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No recent circulars to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default UnitCirculars;