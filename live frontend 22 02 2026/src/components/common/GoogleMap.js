import React from 'react';

const GoogleMap = ({ embedUrl, title }) => {
  // Don't render iframe if embedUrl is empty or invalid
  if (!embedUrl || embedUrl.trim() === '' || embedUrl === '""' || embedUrl === "''") {
    return (
      <div style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Map location not available</p>
      </div>
    );
  }

  return (
    <div style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Google Map for ${title}`}
      ></iframe>
    </div>
  );
};

export default GoogleMap;