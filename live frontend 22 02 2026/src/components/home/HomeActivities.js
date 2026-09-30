import React from 'react';

const HomeActivities = ({ activities }) => {
  return (
    <section style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '2rem' }}>
          Key <span className="gradient-text">Activities</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {activities.map((activity, index) => (
            <div key={index} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <img src={activity.image} alt={activity.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>{activity.name}</h3>
                <p style={{ color: '#64748b' }}>{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeActivities;