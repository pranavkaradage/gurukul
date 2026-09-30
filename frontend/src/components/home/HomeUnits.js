import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtils';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, revealUp, zoomIn } from '../common/Reveal';
import { useTheme } from '../../context/ThemeContext';

const HomeUnits = ({ units }) => {
  const { colors } = useTheme();
  return (
    <section style={{ padding: '4rem 2rem', background: colors.background }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <Reveal as={motion.h2} variants={revealUp} style={{ fontSize: '2.5rem', fontWeight: '700', color: colors.text, marginBottom: '2rem' }}>
          Our <span className="gradient-text">Academic Units</span>
        </Reveal>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {units.map((unit) => {
            const imageUrl = getImageUrl(unit.photo);
            return (
              <Link to={`/unit/${unit.unitId || unit.id}`} key={unit.id || unit.unitId} className="hover-scale" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Reveal as={motion.div} variants={zoomIn} style={{ background: colors.card, borderRadius: '1rem', overflow: 'hidden', boxShadow: colors.cardShadow }}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={unit.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  ) : null}
                  {!imageUrl && (
                    <div style={{ width: '100%', height: '200px', background: colors.backgroundGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }}>
                      {unit.name}
                    </div>
                  )}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: colors.text }}>{unit.name}</h3>
                  </div>
                </Reveal>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
export default HomeUnits;