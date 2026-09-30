import React, { useState } from 'react';
import { getImageUrl } from '../../utils/imageUtils';
import { useTheme } from '../../context/ThemeContext';
import Lightbox from '../common/Lightbox';

const UnitGallery = ({ gallery }) => {
  const { colors } = useTheme();
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: colors.backgroundGradient }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: colors.text, marginBottom: '2rem' }}>
            <span className="gradient-text">Gallery</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {gallery && gallery.length > 0 ? gallery.filter(img => img && img.trim() !== '' && img !== '""' && img !== "''").map((image, index) => {
              // Double-check that image is not empty before rendering
              if (!image || image.trim() === '' || image === '""' || image === "''") return null;
              const imageUrl = getImageUrl(image);
              if (!imageUrl) return null;
              return (
                <div
                  key={index}
                  onClick={() => setLightboxImage(imageUrl)}
                  style={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: colors.cardShadow,
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = colors.cardShadow;
                  }}
                >
                  <img src={imageUrl} alt={`Gallery image ${index + 1}`} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              );
            }).filter(Boolean) : (
              <p style={{ textAlign: 'center', color: colors.textSecondary, padding: '2rem', gridColumn: '1 / -1' }}>No gallery images available.</p>
            )}
          </div>
        </div>
      </section>
      {lightboxImage && <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />}
    </>
  );
};
export default UnitGallery;