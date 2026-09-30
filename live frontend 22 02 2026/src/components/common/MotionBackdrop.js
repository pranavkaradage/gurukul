import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  { size: 380, hue: 200, top: '-15%', left: '-10%', blur: 120, opacity: 0.55 },
  { size: 320, hue: 340, top: '25%', right: '-12%', blur: 110, opacity: 0.5 },
  { size: 420, hue: 160, bottom: '-20%', left: '15%', blur: 140, opacity: 0.45 },
  { size: 260, hue: 45, top: '60%', right: '20%', blur: 100, opacity: 0.4 },
  { size: 340, hue: 265, top: '10%', left: '45%', blur: 130, opacity: 0.4 },
  { size: 280, hue: 12, top: '75%', left: '-8%', blur: 120, opacity: 0.38 }
];

const MotionBackdrop = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray('.backdrop__blob');
      blobs.forEach((blob, idx) => {
        const amplitude = 50 + idx * 12;
        const duration = 18 + idx * 3;

        gsap.to(blob, {
          x: () => gsap.utils.random(-amplitude, amplitude),
          y: () => gsap.utils.random(-amplitude, amplitude),
          scale: () => gsap.utils.random(0.92, 1.08),
          rotate: () => gsap.utils.random(-12, 12),
          duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      });

      ScrollTrigger.batch('.section-motion', {
        start: 'top bottom-=120',
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out'
            }
          )
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 20% 20%, rgba(148, 197, 255, 0.2), transparent 60%), radial-gradient(circle at 80% 10%, rgba(251, 191, 36, 0.12), transparent 55%), #f1f5f9'
      }}
    >
      {layers.map((layer, idx) => (
        <span
          key={idx}
          className="backdrop__blob"
          style={{
            position: 'absolute',
            width: layer.size,
            height: layer.size,
            borderRadius: '50%',
            filter: `blur(${layer.blur}px)`,
            opacity: layer.opacity,
            background: `linear-gradient(135deg, hsla(${layer.hue}, 100%, 65%, 0.75), hsla(${layer.hue}, 90%, 72%, 0.4))`,
            mixBlendMode: 'soft-light',
            ...('top' in layer ? { top: layer.top } : {}),
            ...('bottom' in layer ? { bottom: layer.bottom } : {}),
            ...('left' in layer ? { left: layer.left } : {}),
            ...('right' in layer ? { right: layer.right } : {})
          }}
        />
      ))}
    </div>
  );
};

export default MotionBackdrop;


