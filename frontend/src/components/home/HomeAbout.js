import React from 'react';
import { getImageUrl } from '../../utils/imageUtils';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, revealUp, zoomIn } from '../common/Reveal';
import { useTheme } from '../../context/ThemeContext';

const HomeAbout = ({ about, management }) => {
  const { colors } = useTheme();
  return (
    <section style={{ padding: '4rem 2rem', background: colors.backgroundGradient }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Reveal as={motion.h2} variants={revealUp} style={{ fontSize: '2.5rem', fontWeight: '700', color: colors.text, marginBottom: '1rem' }}>About <span className="gradient-text">Gurukul Shikshan Samuh</span></Reveal>
          <Reveal as={motion.p} variants={revealUp} style={{ fontSize: '1.1rem', color: colors.textSecondary, maxWidth: '800px', margin: '0 auto' }}>{about.shortInfo}</Reveal>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <Reveal as={motion.div} variants={zoomIn} style={{ background: colors.card, padding: '2rem', borderRadius: '1rem', boxShadow: colors.cardShadow, textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: colors.primary, marginBottom: '1rem' }}>Our Vision</h3>
            <p style={{ color: colors.textSecondary }}>{about.vision}</p>
          </Reveal>
          <Reveal as={motion.div} variants={zoomIn} style={{ background: colors.card, padding: '2rem', borderRadius: '1rem', boxShadow: colors.cardShadow, textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: colors.primary, marginBottom: '1rem' }}>Our Mission</h3>
            <p style={{ color: colors.textSecondary }}>{about.mission}</p>
          </Reveal>
        </motion.div>
        <div style={{ textAlign: 'center' }}>
          <Reveal as={motion.h3} variants={revealUp} style={{ fontSize: '2rem', fontWeight: '600', color: colors.text, marginBottom: '2rem' }}>Leadership</Reveal>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {([...management]
              .sort((a, b) => {
                const rank = (t) => {
                  const title = (t || '').toLowerCase();
                  if (title.includes('chairman') && !title.includes('vice')) return 1;
                  if (title.includes('vice') && title.includes('chairman')) return 2;
                  return 3;
                };
                return rank(a.title) - rank(b.title);
              })
              .slice(0, 2)  // show up to two leaders
            ).map((person, index) => {
              const imageUrl = getImageUrl(person.photo);
              return (
                <Reveal as={motion.div} key={index} variants={zoomIn} style={{ textAlign: 'center', minWidth: '250px' }}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={person.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: `4px solid ${colors.primary}` }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  ) : null}
                  {!imageUrl && (
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: colors.backgroundGradient, margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${colors.primary}`, color: colors.textSecondary, fontSize: '2rem', fontWeight: '600' }}>
                      {person.name ? person.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>{person.name}</h4>
                  <p style={{ color: colors.primary, fontWeight: '500' }}>{person.title}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeAbout;