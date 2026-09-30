// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assessts/logo-gurukul.png"; // <-- Your logo import
// import RegistrationModal from "../RegistrationModal";
// import { useTheme } from "../../context/ThemeContext";

// const animationKeyframes = `
//   @keyframes floatZoomAnimation {
//     0%, 100% { transform: translateY(0px) scale(1); }
//     50% { transform: translateY(-8px) scale(0.95); }
//   }
//   @keyframes pulse {
//     0%, 100% { transform: scale(1); }
//     50% { transform: scale(1.05); }
//   }
//   @keyframes bounce {
//     0%, 100% { transform: translateY(0); }
//     50% { transform: translateY(-5px); }
//   }
//   @keyframes shimmer {
//     0% { background-position: -1000px 0; }
//     100% { background-position: 1000px 0; }
//   }
//   @keyframes newBadgeZoom {
//     0%, 100% {
//       transform: scale(1) translateY(0);
//       opacity: 1;
//     }
//     25% {
//       transform: scale(1.15) translateY(-2px);
//       opacity: 0.9;
//     }
//     50% {
//       transform: scale(0.95) translateY(0);
//       opacity: 1;
//     }
//     75% {
//       transform: scale(1.1) translateY(-1px);
//       opacity: 0.95;
//     }
//   }
//   @keyframes newBadgePulse {
//     0%, 100% {
//       transform: scale(1);
//       box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0.5);
//     }
//     50% {
//       transform: scale(1.08);
//       box-shadow: 0 3px 10px rgba(59, 130, 246, 0.6), 0 0 0 3px rgba(59, 130, 246, 0);
//     }
//   }
//   @keyframes newBadgeGlow {
//     0%, 100% {
//       box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4),
//                   0 0 8px rgba(59, 130, 246, 0.2);
//     }
//     50% {
//       box-shadow: 0 3px 10px rgba(59, 130, 246, 0.6),
//                   0 0 15px rgba(59, 130, 246, 0.4);
//     }
//   }
//   @keyframes buttonShimmer {
//     0% {
//       background-position: -200% center;
//     }
//     100% {
//       background-position: 200% center;
//     }
//   }
//   @keyframes registerButtonPulse {
//     0%, 100% {
//       box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3),
//                   0 0 0 0 rgba(14, 165, 233, 0.4);
//     }
//     50% {
//       box-shadow: 0 6px 20px rgba(14, 165, 233, 0.5),
//                   0 0 0 4px rgba(14, 165, 233, 0);
//     }
//   }
// `;

// const styles = {
//   header: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1500,
//     transition: "all 0.3s ease",
//     padding: "0.2rem 0", // Corrected the unit
//     backdropFilter: "blur(10px)",
//     backgroundColor: "rgba(255,255,255,0.9)",
//   },
//   navContainer: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "0 2rem",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   logoLink: {
//     textDecoration: "none",
//     display: "flex",
//     alignItems: "center",
//     gap: "1rem",
//     cursor: "pointer",
//   },
//   logoHalfCircleDown: {
//     width: 180,
//     height: 90,
//     background: "white",
//     borderTopLeftRadius: 0,
//     borderTopRightRadius: 0,
//     borderBottomLeftRadius: 180,
//     borderBottomRightRadius: 180,
//     overflow: "hidden",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     boxShadow: "0 6px 15px rgba(0, 0, 0, 0.12)", // Adjusted shadow for better visibility
//     animation: "floatZoomAnimation 5s ease-in-out infinite",
//     transition: "transform 0.3s ease",
//     cursor: "pointer",
//   },
//   logoImage: {
//     width: "85%",
//     height: "auto",
//     objectFit: "contain",
//   },
//   desktopNav: {
//     display: "flex",
//     alignItems: "center",
//     gap: "0.5rem",
//   },
//   navButton: {
//     background: "none",
//     border: "none",
//     padding: "0.5rem 1rem",
//     fontSize: "1rem",
//     cursor: "pointer",
//     borderRadius: "0.5rem",
//     transition: "background 0.2s ease",
//     fontFamily: "'Poppins', sans-serif",
//   },
//   dropdown: {
//     position: "relative",
//   },
//   dropdownContent: {
//     position: "absolute",
//     top: "100%",
//     left: 0,
//     background: "white",
//     borderRadius: "0.5rem",
//     boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
//     minWidth: "280px",
//     zIndex: 1001,
//     border: "1px solid #f1f5f9",
//     padding: "0.5rem 0",
//     opacity: 0,
//     visibility: "hidden",
//     transform: "translateY(10px)",
//     transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s",
//   },
//   dropdownContentOpen: {
//     opacity: 1,
//     visibility: "visible",
//     transform: "translateY(0)",
//   },
//   dropdownLink: {
//     display: "block",
//     color: "#1e293b",
//     padding: "0.75rem 1.5rem",
//     textDecoration: "none",
//     fontSize: "0.95rem",
//     transition: "background-color 0.2s ease, color 0.2s ease",
//   },
//   hamburgerBtn: {
//     background: "none",
//     border: "none",
//     fontSize: "1.75rem",
//     cursor: "pointer",
//     display: "none",
//   },
//   mobileMenu: {
//     position: "fixed",
//     top: 0,
//     right: 0,
//     width: "100%",
//     maxWidth: "320px",
//     height: "100vh",
//     background: "rgba(255, 255, 255, 0.98)",
//     backdropFilter: "blur(5px)",
//     zIndex: 2000,
//     padding: "1rem",
//     overflowY: "auto",
//     transform: "translateX(100%)",
//     transition: "transform 0.3s ease-in-out",
//     boxShadow: "-5px 0 15px rgba(0,0,0,0.1)",
//   },
//   mobileMenuOpen: {
//     transform: "translateX(0)",
//   },
//   mobileBackdrop: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     background: "rgba(15, 23, 42, 0.35)",
//     backdropFilter: "blur(2px)",
//     zIndex: 1950,
//   },
//   registerButtonContainer: {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     marginLeft: "1.5rem",
//   },
//   registerButton: {
//     background: "none",
//     color: "white",
//     border: "none",
//     padding: "0",
//     fontSize: "1.5rem",
//     fontWeight: "700",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     position: "relative",
//     fontFamily: "'Poppins', sans-serif",
//     display: "inline-block",
//     textDecoration: "none",
//     paddingRight: "3.5rem",
//     paddingTop: "0.25rem",
//   },
//   registerText: {
//     position: "relative",
//     display: "inline-block",
//     fontSize: "1.5rem",
//     fontWeight: "700",
//     lineHeight: 1.2,
//     color: "white",
//     textShadow:
//       "0 2px 8px rgba(255, 255, 255, 0.4), 0 0 12px rgba(59, 130, 246, 0.3)",
//     filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2))",
//     transition: "all 0.3s ease",
//   },
//   newBadge: {
//     position: "absolute",
//     top: "-0.15rem",
//     right: "0",
//     background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
//     color: "white",
//     fontSize: "0.55rem",
//     fontWeight: "700",
//     padding: "0.25rem 0.6rem",
//     borderRadius: "0.75rem",
//     boxShadow: "0 2px 6px rgba(59, 130, 246, 0.4)",
//     animation:
//       "newBadgeZoom 2.5s ease-in-out infinite, newBadgeGlow 2s ease-in-out infinite",
//     textTransform: "capitalize",
//     letterSpacing: "0.3px",
//     transformOrigin: "center center",
//     whiteSpace: "nowrap",
//     lineHeight: 1.2,
//     zIndex: 10,
//   },
// };

// const Header = ({ title, units }) => {
//   const { theme, toggleTheme, colors, isDark } = useTheme();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const isTransparent = !isScrolled && location.pathname === "/" && !isMenuOpen;

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     const openRegistrationHandler = () => setRegistrationModalOpen(true);
//     window.addEventListener("open-registration-modal", openRegistrationHandler);
//     const styleSheet = document.createElement("style");
//     styleSheet.type = "text/css";
//     styleSheet.innerText = `
//             @media (max-width: 1024px) {
//                 .desktop-nav { display: none !important; }
//                 .hamburger-btn { display: block !important; }
//             }
//         `;
//     document.head.appendChild(styleSheet);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener(
//         "open-registration-modal",
//         openRegistrationHandler
//       );
//       document.head.removeChild(styleSheet);
//     };
//   }, []);

//   const handleNavClick = (sectionId) => {
//     setMenuOpen(false);
//     if (location.pathname !== "/") {
//       navigate("/", { state: { scrollTo: sectionId } });
//     } else {
//       const element = document.getElementById(sectionId);
//       if (element) {
//         // --- FIX APPLIED HERE ---
//         // Use requestAnimationFrame to wait for the browser layout to be stable
//         requestAnimationFrame(() => {
//           const headerOffset = 80;
//           const elementPosition = element.getBoundingClientRect().top;
//           const offsetPosition =
//             elementPosition + window.pageYOffset - headerOffset;
//           window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//         });
//       }
//     }
//   };

//   const navLinks = [
//     { label: "Home", id: "home" },
//     { label: "About Us", id: "about-us" },
//     { label: "Admissions", id: "admissions" },
//     { label: "Circulars", id: "circulars" },
//     { label: "Events", id: "events" },
//     { label: "Gallery", id: "gallery" },
//     { label: "Contact", id: "contact" },
//   ];

//   const renderNavLinks = (isMobile = false) => (
//     <>
//       {navLinks.map((link) => (
//         <button
//           key={link.id}
//           onClick={() => handleNavClick(link.id)}
//           style={{
//             ...styles.navButton,
//             color: isMobile
//               ? colors.text
//               : isTransparent
//               ? "white"
//               : colors.text,
//             width: isMobile ? "100%" : "auto",
//             textAlign: isMobile ? "left" : "center",
//             fontSize: isMobile ? "1.2rem" : "1rem",
//           }}
//         >
//           {link.label}
//         </button>
//       ))}
//     </>
//   );

//   const renderUnitLinks = (isMobile = false) => (
//     <>
//       {isMobile && (
//         <h3
//           style={{
//             color: colors.primary,
//             fontSize: "1.2rem",
//             padding: "0.5rem 1rem",
//             marginTop: "1rem",
//             borderTop: `1px solid ${colors.border}`,
//           }}
//         >
//           Our Units
//         </h3>
//       )}
//       {units && units.length > 0 ? (
//         units.map((unit) => {
//           // Prioritize unitId (string) over id (number) for URL routing
//           const unitIdentifier =
//             unit.unitId || (unit.id ? String(unit.id) : null);
//           if (!unitIdentifier) return null; // Skip units without valid identifier
//           return (
//             <Link
//               key={unit.id || unit.unitId}
//               to={`/unit/${unitIdentifier}`}
//               onClick={() => isMobile && setMenuOpen(false)}
//               style={{
//                 ...styles.dropdownLink,
//                 ...(isMobile && { paddingLeft: "2rem" }),
//                 color: colors.text,
//               }}
//               className="dropdown-link-hover"
//             >
//               {unit.name || "Unnamed Unit"}
//             </Link>
//           );
//         })
//       ) : (
//         <p
//           style={{
//             padding: "0.5rem 1rem",
//             color: colors.textSecondary,
//             fontSize: "0.9rem",
//           }}
//         >
//           No units available
//         </p>
//       )}
//     </>
//   );

//   return (
//     <>
//       <style>{`
//                 ${animationKeyframes}
//                 .dropdown-link-hover:hover { background-color: ${colors.hover} !important; }
//                 .logo-container-hover:hover { transform: scale(1.1); }
//                 /* Hide the inline Register button on tablet/mobile to avoid overlap */
//                 @media (max-width: 1024px) {
//                     .register-inline { display: none !important; }
//                 }
//                 .register-btn-hover {
//                     text-decoration: none;
//                 }
//                 .register-btn-hover:hover .register-text-main {
//                     opacity: 0.85;
//                     transform: scale(1.02);
//                 }
//                 .register-btn-transparent:hover .register-text-main {
//                     text-shadow: 0 2px 12px rgba(255, 255, 255, 0.5), 0 0 15px rgba(59, 130, 246, 0.4);
//                 }
//                 .register-btn-solid:hover .register-text-main {
//                     text-shadow: 0 2px 12px rgba(14, 165, 233, 0.4), 0 0 15px rgba(14, 165, 233, 0.3);
//                 }
//                 .register-btn-hover:active {
//                     transform: scale(0.98);
//                 }
//                 .register-text-main {
//                     transition: all 0.3s ease;
//                 }
//                 .new-badge-animated {
//                     animation: newBadgeZoom 2.5s ease-in-out infinite,
//                                newBadgeGlow 2s ease-in-out infinite !important;
//                 }
//                 .register-btn-hover:hover .new-badge-animated {
//                     animation: newBadgeZoom 0.8s ease-in-out infinite,
//                                newBadgePulse 1.2s ease-in-out infinite !important;
//                 }
//                 @keyframes newBadgeSpin {
//                     0% { transform: scale(1) rotate(0deg); }
//                     25% { transform: scale(1.2) rotate(-5deg); }
//                     50% { transform: scale(0.9) rotate(5deg); }
//                     75% { transform: scale(1.15) rotate(-3deg); }
//                     100% { transform: scale(1) rotate(0deg); }
//                 }
//             `}</style>
//       <header
//         style={{
//           ...styles.header,
//           background: isTransparent
//             ? "transparent"
//             : isDark
//             ? colors.backgroundAlt
//             : styles.header.backgroundColor,
//           backdropFilter: isTransparent ? "none" : styles.header.backdropFilter,
//           borderBottom: isTransparent ? "none" : `1px solid ${colors.border}`,
//         }}
//       >
//         <div style={styles.navContainer}>
//           <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//             <div onClick={() => handleNavClick("home")} style={styles.logoLink}>
//               <div
//                 style={styles.logoHalfCircleDown}
//                 className="logo-container-hover"
//               >
//                 <img src={logo} alt="Gurukul Logo" style={styles.logoImage} />
//               </div>
//             </div>
//             <div
//               style={{ ...styles.registerButtonContainer, flexShrink: 0 }}
//               className="register-inline"
//             >
//               <button
//                 onClick={() => setRegistrationModalOpen(true)}
//                 style={{
//                   ...styles.registerButton,
//                   color: isTransparent ? "white" : "#0ea5e9",
//                 }}
//                 className={`register-btn-hover ${
//                   isTransparent
//                     ? "register-btn-transparent"
//                     : "register-btn-solid"
//                 }`}
//               >
//                 <span
//                   style={{
//                     ...styles.registerText,
//                     color: isTransparent ? "white" : "#0ea5e9",
//                     textShadow: isTransparent
//                       ? "0 2px 8px rgba(255, 255, 255, 0.4), 0 0 12px rgba(59, 130, 246, 0.3)"
//                       : "0 2px 8px rgba(14, 165, 233, 0.3), 0 0 12px rgba(14, 165, 233, 0.2)",
//                     filter: isTransparent
//                       ? "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2))"
//                       : "drop-shadow(0 2px 4px rgba(14, 165, 233, 0.2))",
//                   }}
//                   className="register-text-main"
//                 >
//                   Register
//                 </span>
//                 <span style={styles.newBadge} className="new-badge-animated">
//                   New
//                 </span>
//               </button>
//             </div>
//           </div>

//           <nav style={{ ...styles.desktopNav }} className="desktop-nav">
//             {renderNavLinks(false).props.children.slice(0, 2)}
//             <div
//               style={styles.dropdown}
//               onMouseEnter={() => setDropdownOpen(true)}
//               onMouseLeave={() => setDropdownOpen(false)}
//             >
//               <button
//                 onClick={() => handleNavClick("units")}
//                 style={{
//                   ...styles.navButton,
//                   color: isTransparent ? "white" : colors.text,
//                 }}
//               >
//                 Our Units ▼
//               </button>
//               <div
//                 style={{
//                   ...styles.dropdownContent,
//                   ...(isDropdownOpen && styles.dropdownContentOpen),
//                   background: colors.card,
//                   borderColor: colors.border,
//                 }}
//               >
//                 {renderUnitLinks(false)}
//               </div>
//             </div>
//             {renderNavLinks(false).props.children.slice(2)}
//             <button
//               onClick={toggleTheme}
//               style={{
//                 ...styles.navButton,
//                 color: isTransparent ? "white" : colors.text,
//                 marginLeft: "0.5rem",
//                 padding: "0.5rem",
//                 borderRadius: "50%",
//                 width: "40px",
//                 height: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 background: isTransparent
//                   ? "rgba(255,255,255,0.1)"
//                   : colors.hover,
//                 transition: "all 0.3s ease",
//               }}
//               title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
//               aria-label="Toggle theme"
//             >
//               {isDark ? "☀️" : "🌙"}
//             </button>
//           </nav>

//           <button
//             style={{
//               ...styles.hamburgerBtn,
//               color: isTransparent ? "white" : colors.text,
//             }}
//             className="hamburger-btn"
//             onClick={() => setMenuOpen((prev) => !prev)}
//             aria-label="Toggle menu"
//             aria-expanded={isMenuOpen ? "true" : "false"}
//           >
//             ☰
//           </button>
//         </div>
//       </header>
//       {/* Backdrop for mobile menu (click to close) */}
//       {isMenuOpen && (
//         <div
//           style={styles.mobileBackdrop}
//           onClick={() => setMenuOpen(false)}
//           aria-hidden="true"
//         ></div>
//       )}
//       <div
//         style={{
//           ...styles.mobileMenu,
//           ...(isMenuOpen && styles.mobileMenuOpen),
//           background: colors.card,
//         }}
//       >
//         <div
//           style={{
//             textAlign: "right",
//             padding: "0.5rem",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <button
//             onClick={() => {
//               toggleTheme();
//             }}
//             style={{
//               ...styles.hamburgerBtn,
//               display: "block",
//               color: colors.text,
//               fontSize: "1.5rem",
//               padding: "0.5rem",
//             }}
//             title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
//             aria-label="Toggle theme"
//           >
//             {isDark ? "☀️" : "🌙"}
//           </button>
//           <button
//             style={{
//               ...styles.hamburgerBtn,
//               display: "block",
//               color: colors.text,
//             }}
//             onClick={() => setMenuOpen(false)}
//           >
//             ✕
//           </button>
//         </div>
//         <div
//           style={{
//             padding: "0.5rem 1rem",
//             borderBottom: `1px solid ${colors.border}`,
//             marginBottom: "1rem",
//             position: "relative",
//           }}
//         >
//           <button
//             onClick={() => {
//               setRegistrationModalOpen(true);
//               setMenuOpen(false);
//             }}
//             style={{
//               ...styles.registerButton,
//               width: "100%",
//               textAlign: "center",
//               color: "#1e293b",
//               paddingRight: "0",
//             }}
//             className="register-btn-hover"
//           >
//             <span
//               style={{
//                 ...styles.registerText,
//                 display: "inline-block",
//                 position: "relative",
//                 paddingRight: "3rem",
//                 color: "#1e293b",
//               }}
//               className="register-text-main"
//             >
//               Register
//             </span>
//             <span
//               style={{ ...styles.newBadge, right: "0", top: "0.25rem" }}
//               className="new-badge-animated"
//             >
//               New
//             </span>
//           </button>
//         </div>
//         <nav
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "0.5rem",
//             marginTop: "1rem",
//           }}
//         >
//           {renderNavLinks(true)}
//           {renderUnitLinks(true)}
//         </nav>
//       </div>
//       <RegistrationModal
//         isOpen={isRegistrationModalOpen}
//         onClose={() => setRegistrationModalOpen(false)}
//       />
//     </>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assessts/logo-gurukul.png"; // <-- Your logo import
import { useTheme } from "../../context/ThemeContext";

const animationKeyframes = `
  @keyframes floatZoomAnimation {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-8px) scale(0.95); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  @keyframes newBadgeZoom {
    0%, 100% { 
      transform: scale(1) translateY(0);
      opacity: 1;
    }
    25% { 
      transform: scale(1.15) translateY(-2px);
      opacity: 0.9;
    }
    50% { 
      transform: scale(0.95) translateY(0);
      opacity: 1;
    }
    75% { 
      transform: scale(1.1) translateY(-1px);
      opacity: 0.95;
    }
  }
  @keyframes newBadgePulse {
    0%, 100% { 
      transform: scale(1);
      box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4), 0 0 0 0 rgba(220, 38, 38, 0.5);
    }
    50% { 
      transform: scale(1.08);
      box-shadow: 0 3px 10px rgba(220, 38, 38, 0.6), 0 0 0 3px rgba(220, 38, 38, 0);
    }
  }
  @keyframes newBadgeGlow {
    0%, 100% {
      box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4), 
                  0 0 8px rgba(220, 38, 38, 0.2);
    }
    50% {
      box-shadow: 0 3px 10px rgba(220, 38, 38, 0.6), 
                  0 0 15px rgba(220, 38, 38, 0.4);
    }
  }
  @keyframes buttonShimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }
  @keyframes registerButtonPulse {
    0%, 100% {
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3),
                  0 0 0 0 rgba(220, 38, 38, 0.4);
    }
    50% {
      box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5),
                  0 0 0 4px rgba(220, 38, 38, 0);
    }
  }
`;

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1500,
    transition: "all 0.3s ease",
    padding: "0.5rem 0",
    backdropFilter: "blur(12px)",
    backgroundColor: "rgba(255,255,255,0.95)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  navContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoLink: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    cursor: "pointer",
  },
  logoHalfCircleDown: {
    width: 180,
    height: 90,
    background: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    animation: "floatZoomAnimation 5s ease-in-out infinite",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  logoImage: {
    width: "85%",
    height: "auto",
    objectFit: "contain",
  },
  desktopNav: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  navButton: {
    background: "none",
    border: "none",
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
  },
  dropdown: {
    position: "relative",
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    minWidth: "280px",
    zIndex: 1001,
    border: "1px solid #f1f5f9",
    padding: "0.5rem 0",
    opacity: 0,
    visibility: "hidden",
    transform: "translateY(10px)",
    transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s",
  },
  dropdownContentOpen: {
    opacity: 1,
    visibility: "visible",
    transform: "translateY(0)",
  },
  dropdownLink: {
    display: "block",
    color: "#1e293b",
    padding: "0.75rem 1.5rem",
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  hamburgerBtn: {
    background: "none",
    border: "none",
    fontSize: "1.75rem",
    cursor: "pointer",
    display: "none",
  },
  mobileMenu: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    maxWidth: "320px",
    height: "100vh",
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(5px)",
    zIndex: 2000,
    padding: "1rem",
    overflowY: "auto",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    boxShadow: "-5px 0 15px rgba(0,0,0,0.1)",
  },
  mobileMenuOpen: {
    transform: "translateX(0)",
  },
  mobileBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(15, 23, 42, 0.35)",
    backdropFilter: "blur(2px)",
    zIndex: 1950,
  },
  registerButtonContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginLeft: "1.5rem",
  },
  registerButton: {
    background: "none",
    color: "white",
    border: "none",
    padding: "0",
    fontSize: "1.5rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
    display: "inline-block",
    textDecoration: "none",
    paddingRight: "3.5rem",
    paddingTop: "0.25rem",
  },
  registerText: {
    position: "relative",
    display: "inline-block",
    fontSize: "1.5rem",
    fontWeight: "700",
    lineHeight: 1.2,
    color: "white",
    textShadow:
      "0 2px 8px rgba(255, 255, 255, 0.4), 0 0 12px rgba(220, 38, 38, 0.3)", // <-- RED COLOR CHANGE
    filter: "drop-shadow(0 2px 4px rgba(220, 38, 38, 0.2))", // <-- RED COLOR CHANGE
    transition: "all 0.3s ease",
  },
  newBadge: {
    position: "absolute",
    top: "-0.15rem",
    right: "0",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", // <-- RED COLOR CHANGE
    color: "white",
    fontSize: "0.55rem",
    fontWeight: "700",
    padding: "0.25rem 0.6rem",
    borderRadius: "0.75rem",
    boxShadow: "0 2px 6px rgba(220, 38, 38, 0.4)", // <-- RED COLOR CHANGE
    animation:
      "newBadgeZoom 2.5s ease-in-out infinite, newBadgeGlow 2s ease-in-out infinite",
    textTransform: "capitalize",
    letterSpacing: "0.3px",
    transformOrigin: "center center",
    whiteSpace: "nowrap",
    lineHeight: 1.2,
    zIndex: 10,
  },
};

const Header = ({ title, units }) => {
  const { theme, toggleTheme, colors, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isTransparent = !isScrolled && location.pathname === "/" && !isMenuOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
            @media (max-width: 1024px) {
                .desktop-nav { display: none !important; }
                .hamburger-btn { display: block !important; }
            }
        `;
    document.head.appendChild(styleSheet);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);

    // For circulars, navigate to a dedicated page instead of scrolling
    if (sectionId === "circulars") {
      navigate("/circulars");
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        // Use requestAnimationFrame to wait for the browser layout to be stable
        requestAnimationFrame(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        });
      }
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about-us" },
    { label: "Admissions", id: "admissions" },
    { label: "Circulars", id: "circulars" },
    { label: "Events", id: "events" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  const renderNavLinks = (isMobile = false) => (
    <>
      {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => handleNavClick(link.id)}
          className="nav-button-hover"
          style={{
            ...styles.navButton,
            color: isMobile
              ? colors.text
              : isTransparent
              ? "white"
              : colors.text,
            width: isMobile ? "100%" : "auto",
            textAlign: isMobile ? "left" : "center",
            fontSize: isMobile ? "1.2rem" : "1rem",
          }}
        >
          {link.label}
        </button>
      ))}
    </>
  );

  const renderUnitLinks = (isMobile = false) => (
    <>
      {isMobile && (
        <h3
          style={{
            color: colors.primary,
            fontSize: "1.2rem",
            padding: "0.5rem 1rem",
            marginTop: "1rem",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          Our Units
        </h3>
      )}
      {units && units.length > 0 ? (
        units.map((unit) => {
          // Prioritize unitId (string) over id (number) for URL routing
          const unitIdentifier =
            unit.unitId || (unit.id ? String(unit.id) : null);
          if (!unitIdentifier) return null; // Skip units without valid identifier
          return (
            <Link
              key={unit.id || unit.unitId}
              to={`/unit/${unitIdentifier}`}
              onClick={() => isMobile && setMenuOpen(false)}
              style={{
                ...styles.dropdownLink,
                ...(isMobile && { paddingLeft: "2rem" }),
                color: colors.text,
              }}
              className="dropdown-link-hover"
            >
              {unit.name || "Unnamed Unit"}
            </Link>
          );
        })
      ) : (
        <p
          style={{
            padding: "0.5rem 1rem",
            color: colors.textSecondary,
            fontSize: "0.9rem",
          }}
        >
          No units available
        </p>
      )}
    </>
  );

  return (
    <>
      <style>{`
                ${animationKeyframes}
                .dropdown-link-hover:hover { background-color: ${colors.hover} !important; }
                .logo-container-hover:hover { transform: scale(1.08); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important; }
                .nav-button-hover:hover {
                    background-color: ${colors.hover} !important;
                    transform: translateY(-1px);
                }
            `}</style>
      <header
        style={{
          ...styles.header,
          background: isTransparent
            ? "transparent"
            : isDark
            ? colors.backgroundAlt
            : styles.header.backgroundColor,
          backdropFilter: isTransparent ? "none" : styles.header.backdropFilter,
          borderBottom: isTransparent ? "none" : `1px solid ${colors.border}`,
        }}
      >
        <div style={styles.navContainer}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div onClick={() => handleNavClick("home")} style={styles.logoLink}>
              <div
                style={styles.logoHalfCircleDown}
                className="logo-container-hover"
              >
                <img src={logo} alt="Gurukul Logo" style={styles.logoImage} />
              </div>
            </div>
          </div>

          <nav style={{ ...styles.desktopNav }} className="desktop-nav">
            {renderNavLinks(false).props.children.slice(0, 2)}
            <div
              style={styles.dropdown}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick("units")}
                className="nav-button-hover"
                style={{
                  ...styles.navButton,
                  color: isTransparent ? "white" : colors.text,
                }}
              >
                Our Units ▼
              </button>
              <div
                style={{
                  ...styles.dropdownContent,
                  ...(isDropdownOpen && styles.dropdownContentOpen),
                  background: colors.card,
                  borderColor: colors.border,
                }}
              >
                {renderUnitLinks(false)}
              </div>
            </div>
            {renderNavLinks(false).props.children.slice(2)}
            <button
              onClick={toggleTheme}
              style={{
                ...styles.navButton,
                color: isTransparent ? "white" : colors.text,
                marginLeft: "0.5rem",
                padding: "0.5rem",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isTransparent
                  ? "rgba(255,255,255,0.1)"
                  : colors.hover,
                transition: "all 0.3s ease",
              }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </nav>

          <button
            style={{
              ...styles.hamburgerBtn,
              color: isTransparent ? "white" : colors.text,
            }}
            className="hamburger-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            ☰
          </button>
        </div>
      </header>
      {/* Backdrop for mobile menu (click to close) */}
      {isMenuOpen && (
        <div
          style={styles.mobileBackdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <div
        style={{
          ...styles.mobileMenu,
          ...(isMenuOpen && styles.mobileMenuOpen),
          background: colors.card,
        }}
      >
        <div
          style={{
            textAlign: "right",
            padding: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              toggleTheme();
            }}
            style={{
              ...styles.hamburgerBtn,
              display: "block",
              color: colors.text,
              fontSize: "1.5rem",
              padding: "0.5rem",
            }}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button
            style={{
              ...styles.hamburgerBtn,
              display: "block",
              color: colors.text,
            }}
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>
        {/* <div
          style={{
            padding: "0.5rem 1rem",
            borderBottom: `1px solid ${colors.border}`,
            marginBottom: "1rem",
            position: "relative",
          }}
        >
          <button
            onClick={() => {
              setRegistrationModalOpen(true);
              setMenuOpen(false);
            }}
            style={{
              ...styles.registerButton,
              width: "100%",
              textAlign: "center",
              color: "#dc2626", // <-- RED COLOR CHANGE
              paddingRight: "0",
            }}
            className="register-btn-hover"
          >
            <span
              style={{
                ...styles.registerText,
                display: "inline-block",
                position: "relative",
                paddingRight: "3rem",
                color: "#dc2626", // <-- RED COLOR CHANGE
              }}
              className="register-text-main"
            >
              GET Register
            </span>
            <span
              style={{ ...styles.newBadge, right: "0", top: "0.25rem" }}
              className="new-badge-animated"
            >
              New
            </span>
          </button>
        </div> */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          {renderNavLinks(true)}
          {renderUnitLinks(true)}
        </nav>
      </div>
    </>
  );
};

export default Header;
