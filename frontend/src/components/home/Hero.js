import React, { useState, useEffect } from "react";
import { getImageUrl } from "../../utils/imageUtils";
import { useTheme } from "../../context/ThemeContext";

const Hero = ({ slides = [] }) => {
  const { colors } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default slide if none provided
  const defaultSlides = [
    {
      title: "",
      subtitle: "Your future starts here",
      image: "",
    },
  ];

  const safeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const currentSlideData = safeSlides[currentSlide] || safeSlides[0];

  useEffect(() => {
    if (safeSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % safeSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [safeSlides.length]);

  return (
    <section
      style={{ position: "relative", height: "100vh", overflow: "hidden" }}
    >
      <style>{`
                /* Professional Transition Animations */
                @keyframes fadeUp {
                    0% { transform: translateY(16px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                /* Slide 0: Elegant Zoom In */
                @keyframes slide0-enter {
                    0% { 
                        transform: scale(1.15) translate3d(0, 0, 0);
                        opacity: 0;
                        filter: blur(4px);
                    }
                    100% { 
                        transform: scale(1) translate3d(0, 0, 0);
                        opacity: 1;
                        filter: blur(0);
                    }
                }
                @keyframes slide0-active {
                    0% { transform: scale(1) translate3d(0, 0, 0); }
                    50% { transform: scale(1.08) translate3d(-1%, -1%, 0); }
                    100% { transform: scale(1.05) translate3d(1%, 1%, 0); }
                }
                
                /* Slide 1: Slide from Right with Pan */
                @keyframes slide1-enter {
                    0% { 
                        transform: translate3d(20%, 0, 0) scale(1.1);
                        opacity: 0;
                    }
                    100% { 
                        transform: translate3d(0, 0, 0) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes slide1-active {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    100% { transform: translate3d(-3%, 0, 0) scale(1.06); }
                }
                
                /* Slide 2: Slide from Left with Zoom */
                @keyframes slide2-enter {
                    0% { 
                        transform: translate3d(-20%, 0, 0) scale(0.95);
                        opacity: 0;
                    }
                    100% { 
                        transform: translate3d(0, 0, 0) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes slide2-active {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    100% { transform: translate3d(2%, -2%, 0) scale(1.1); }
                }
                
                /* Slide 3: Slide from Bottom with Fade */
                @keyframes slide3-enter {
                    0% { 
                        transform: translate3d(0, 15%, 0) scale(1.05);
                        opacity: 0;
                    }
                    100% { 
                        transform: translate3d(0, 0, 0) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes slide3-active {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    50% { transform: translate3d(0, -1%, 0) scale(1.07); }
                    100% { transform: translate3d(0, 0, 0) scale(1.04); }
                }
                
                /* Slide 4: Rotate and Zoom */
                @keyframes slide4-enter {
                    0% { 
                        transform: scale(0.9) rotate(-2deg);
                        opacity: 0;
                        filter: brightness(0.8);
                    }
                    100% { 
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                        filter: brightness(1);
                    }
                }
                @keyframes slide4-active {
                    0% { transform: scale(1) rotate(0deg) translate3d(0, 0, 0); }
                    100% { transform: scale(1.12) rotate(1deg) translate3d(-2%, -2%, 0); }
                }
                
                /* Slide 5: Diagonal Slide with Scale */
                @keyframes slide5-enter {
                    0% { 
                        transform: translate3d(15%, -15%, 0) scale(1.2);
                        opacity: 0;
                    }
                    100% { 
                        transform: translate3d(0, 0, 0) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes slide5-active {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    100% { transform: translate3d(-2%, 2%, 0) scale(1.1); }
                }
                
                /* Slide 6: Zoom Out Effect */
                @keyframes slide6-enter {
                    0% { 
                        transform: scale(1.3);
                        opacity: 0;
                        filter: blur(6px);
                    }
                    100% { 
                        transform: scale(1);
                        opacity: 1;
                        filter: blur(0);
                    }
                }
                @keyframes slide6-active {
                    0% { transform: scale(1) translate3d(0, 0, 0); }
                    100% { transform: scale(1.15) translate3d(2%, 2%, 0); }
                }
                
                /* Slide 7: Slide from Top */
                @keyframes slide7-enter {
                    0% { 
                        transform: translate3d(0, -15%, 0) scale(1.05);
                        opacity: 0;
                    }
                    100% { 
                        transform: translate3d(0, 0, 0) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes slide7-active {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    100% { transform: translate3d(0, 2%, 0) scale(1.08); }
                }
                
                /* Default fallback for slides beyond 7 */
                @keyframes slide-default-enter {
                    0% { 
                        transform: scale(1.1);
                        opacity: 0;
                    }
                    100% { 
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                @keyframes slide-default-active {
                    0% { transform: scale(1) translate3d(0, 0, 0); }
                    100% { transform: scale(1.1) translate3d(-1%, -1%, 0); }
                }
            `}</style>
      {safeSlides.map((slide, index) => {
        const imageUrl = getImageUrl(slide.image);
        const isActive = currentSlide === index;
        const slideIndex = index % 8; // Cycle through 8 different transitions

        // Get transition animations based on slide index
        const getEnterAnimation = (idx) => {
          const animations = [
            "slide0-enter",
            "slide1-enter",
            "slide2-enter",
            "slide3-enter",
            "slide4-enter",
            "slide5-enter",
            "slide6-enter",
            "slide7-enter",
          ];
          return animations[idx] || "slide-default-enter";
        };

        const getActiveAnimation = (idx) => {
          const animations = [
            "slide0-active",
            "slide1-active",
            "slide2-active",
            "slide3-active",
            "slide4-active",
            "slide5-active",
            "slide6-active",
            "slide7-active",
          ];
          return animations[idx] || "slide-default-active";
        };

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: isActive ? 1 : 0,
              willChange: "transform, opacity, filter",
              transition: isActive
                ? `opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)`
                : `opacity 800ms ease-in-out`,
              animation: isActive
                ? `${getEnterAnimation(
                    slideIndex
                  )} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards, ${getActiveAnimation(
                    slideIndex
                  )} 10s ease-in-out 1.2s infinite`
                : "none",
            }}
          />
        );
      })}
      {/* Subtle dark overlay for better text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />
      
      {safeSlides.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "0.5rem",
            zIndex: 3,
          }}
        >
          {safeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "2px solid white",
                background: currentSlide === index ? "white" : "transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: currentSlide === index ? "scale(1.15)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default Hero;
