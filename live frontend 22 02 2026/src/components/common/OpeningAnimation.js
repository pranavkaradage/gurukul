import React, { useState, useEffect } from "react";
import logo from "../../assessts/logo-gurukul.png";

const OpeningAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState("loading"); // loading -> reveal -> complete
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Prevent scrolling during animation
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Premium Loading with Logo (2.5 seconds)
    if (stage === "loading") {
      const startTime = Date.now();
      const duration = 2500; // 2.5 seconds
      
      const loadingInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        setLoadingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(loadingInterval);
          setStage("reveal");
        }
      }, 16);

      return () => clearInterval(loadingInterval);
    }

    // Stage 3: Elegant Website Reveal (0.7 seconds)
    if (stage === "reveal") {
      const revealTimer = setTimeout(() => {
        setStage("complete");
        setTimeout(() => {
          onComplete();
        }, 300);
      }, 700);

      return () => clearTimeout(revealTimer);
    }
  }, [stage, onComplete]);

  return (
    <>
      <style>{`
        @keyframes logoEntrance {
          0% {
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
            filter: blur(10px);
          }
          60% {
            transform: scale(1.15) rotate(5deg);
            opacity: 0.9;
            filter: blur(2px);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            filter: blur(0);
          }
        }
        
        @keyframes logoPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.08) rotate(2deg);
            opacity: 0.95;
          }
        }
        
        @keyframes logoShimmer {
          0% {
            filter: brightness(1) drop-shadow(0 0 20px rgba(251, 191, 36, 0.3));
          }
          50% {
            filter: brightness(1.2) drop-shadow(0 0 40px rgba(251, 191, 36, 0.6));
          }
          100% {
            filter: brightness(1) drop-shadow(0 0 20px rgba(251, 191, 36, 0.3));
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes fadeSlideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-30px);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        .opening-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10000;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }
        
        /* Premium Loading Screen */
        .loading-screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.98) 0%,
            rgba(30, 41, 59, 0.95) 50%,
            rgba(15, 23, 42, 0.98) 100%
          );
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          opacity: 0;
          animation: fadeIn 0.5s ease-in-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .logo-container {
          position: relative;
          width: 240px;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .logo-image {
          width: 100%;
          height: auto;
          max-width: 200px;
          animation: logoEntrance 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards,
                     logoPulse 3s ease-in-out 1.2s infinite,
                     logoShimmer 4s ease-in-out 1.2s infinite;
          filter: drop-shadow(0 15px 40px rgba(251, 191, 36, 0.4));
          will-change: transform, filter;
        }
        
        .logo-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(251, 191, 36, 0.25) 0%,
            rgba(251, 191, 36, 0.1) 40%,
            transparent 70%
          );
          animation: glowPulse 3s ease-in-out infinite;
        }
        
        .logo-rings {
          position: absolute;
          width: 120%;
          height: 120%;
          border: 2px solid rgba(251, 191, 36, 0.2);
          border-radius: 50%;
          animation: glowPulse 3s ease-in-out infinite;
        }
        
        .logo-rings::before {
          content: '';
          position: absolute;
          width: 140%;
          height: 140%;
          top: -20%;
          left: -20%;
          border: 1px solid rgba(251, 191, 36, 0.15);
          border-radius: 50%;
          animation: glowPulse 4s ease-in-out infinite;
        }
        
        .loading-text {
          color: #f8fafc;
          font-size: clamp(1.2rem, 4vw, 1.8rem);
          font-weight: 300;
          letter-spacing: 8px;
          text-transform: uppercase;
          opacity: 0.9;
          text-shadow: 0 2px 20px rgba(251, 191, 36, 0.3);
          animation: fadeIn 0.8s ease-in-out 0.5s forwards;
          opacity: 0;
        }
        
        .loading-indicator-container {
          width: min(300px, 80vw);
          height: 2px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        .loading-bar {
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(251, 191, 36, 0.6) 20%,
            rgba(251, 191, 36, 0.9) 50%,
            rgba(251, 191, 36, 0.6) 80%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
          border-radius: 10px;
          transition: width 0.1s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.5),
                      0 0 40px rgba(251, 191, 36, 0.3);
        }
        
        /* Elegant Website Reveal */
        .reveal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.98) 0%,
            rgba(30, 41, 59, 0.95) 100%
          );
          animation: fadeSlideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .logo-container {
            width: 180px;
            height: 180px;
          }
          
          .logo-image {
            max-width: 150px;
          }
          
          .loading-text {
            letter-spacing: 4px;
            font-size: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .logo-container {
            width: 150px;
            height: 150px;
          }
          
          .logo-image {
            max-width: 120px;
          }
          
          .loading-text {
            letter-spacing: 3px;
            font-size: 0.9rem;
          }
        }
      `}</style>
      
      <div className="opening-container">
        {/* Premium Loading Screen with Logo */}
        {(stage === "loading" || stage === "reveal") && (
          <div className="loading-screen">
            <div className="logo-container">
              <div className="logo-glow" />
              <div className="logo-rings" />
              <img src={logo} alt="Gurukul Logo" className="logo-image" />
            </div>
            <div className="loading-text">Gurukul</div>
            <div className="loading-indicator-container">
              <div
                className="loading-bar"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Elegant Website Reveal */}
        {stage === "reveal" && <div className="reveal-overlay" />}
      </div>
    </>
  );
};

export default OpeningAnimation;

