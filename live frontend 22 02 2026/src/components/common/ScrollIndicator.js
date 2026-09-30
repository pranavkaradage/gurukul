import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const ScrollIndicator = () => {
  const { colors } = useTheme();
  const [showIndicator, setShowIndicator] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Show indicator when scrolled past 100px from top
      setShowIndicator(scrollTop > 100);

      // Consider "near bottom" when within 200px of bottom or scroll percentage > 90%
      setIsNearBottom(scrollTop + windowHeight >= documentHeight - 200 || scrollPercentage > 90);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showIndicator) return null;

  return (
    <>
      <style>{`
        .scroll-indicator {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colors.card};
          border: 2px solid ${colors.border};
          border-radius: 50%;
          cursor: pointer;
          z-index: 9998;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transform: translateY(20px) scale(0.8);
          animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .scroll-indicator:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          border-color: ${colors.primary};
        }

        .scroll-indicator:active {
          transform: translateY(0) scale(0.95);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }

        .scroll-icon {
          width: 24px;
          height: 24px;
          transition: all 0.3s ease;
          color: ${colors.primary};
        }

        .scroll-indicator:hover .scroll-icon {
          color: ${colors.primaryDark};
        }

        .scroll-down-icon {
          animation: bounce 2s ease-in-out infinite;
        }

        .scroll-up-icon {
          animation: none;
        }

        @media (max-width: 768px) {
          .scroll-indicator {
            bottom: 80px;
            right: 20px;
            width: 45px;
            height: 45px;
          }
          .scroll-icon {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
      <div
        className="scroll-indicator"
        onClick={isNearBottom ? scrollToTop : undefined}
        title={isNearBottom ? "Scroll to top" : "Scroll down"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (isNearBottom) scrollToTop();
          }
        }}
      >
        {isNearBottom ? (
          <svg
            className="scroll-icon scroll-up-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        ) : (
          <svg
            className="scroll-icon scroll-down-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </div>
    </>
  );
};

export default ScrollIndicator;

