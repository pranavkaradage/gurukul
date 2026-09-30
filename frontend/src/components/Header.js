// import React from "react";

// const Header = ({ isScrolled, isMenuOpen, setMenuOpen, activeSection, scrollToSection, title }) => {
//     return (
//         <header
//             style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 zIndex: 1000,
//                 background: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
//                 backdropFilter: isScrolled ? "blur(10px)" : "none",
//                 transition: "all 0.3s ease",
//                 padding: "1rem 0",
//                 borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.1)" : "none",
//             }}
//         >
//             <div
//                 style={{
//                     maxWidth: "1200px",
//                     margin: "0 auto",
//                     padding: "0 2rem",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                 }}
//             >
//                 {/* Logo */}
//                 <div
//                     style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "1rem",
//                         cursor: "pointer",
//                     }}
//                     onClick={() => scrollToSection("home")}
//                 >
//                     <div
//                         style={{
//                             width: "50px",
//                             height: "50px",
//                             borderRadius: "50%",
//                             background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: "white",
//                             fontWeight: "bold",
//                             fontSize: "1.5rem",
//                         }}
//                     >
//                         G
//                     </div>
//                     <div>
//                         <h2
//                             style={{
//                                 fontSize: "1.2rem",
//                                 fontWeight: "700",
//                                 color: isScrolled ? "#1e293b" : "white",
//                                 margin: 0,
//                             }}
//                         >
//                             {title}
//                         </h2>
//                     </div>
//                 </div>

//                 {/* Desktop Navigation */}
//                 <nav
//                     style={{
//                         display: window.innerWidth > 768 ? "flex" : "none",
//                         gap: "2rem",
//                         alignItems: "center",
//                     }}
//                 >
//                     {[
//                         { id: "home", label: "Home" },
//                         { id: "about-us", label: "About Us" },
//                         { id: "units", label: "Our Units" },
//                         { id: "admissions", label: "Admissions" },
//                         { id: "contact", label: "Contact" },
//                     ].map((item) => (
//                         <button
//                             key={item.id}
//                             onClick={() => scrollToSection(item.id)}
//                             style={{
//                                 background: "none",
//                                 border: "none",
//                                 color: isScrolled ? "#1e293b" : "white",
//                                 fontSize: "1rem",
//                                 fontWeight: activeSection === item.id ? "600" : "400",
//                                 cursor: "pointer",
//                                 padding: "0.5rem 1rem",
//                                 borderRadius: "0.5rem",
//                                 transition: "all 0.3s ease",
//                                 textDecoration: activeSection === item.id ? "underline" : "none",
//                                 textUnderlineOffset: "0.5rem",
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.target.style.background = "rgba(14, 165, 233, 0.1)";
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.target.style.background = "none";
//                             }}
//                         >
//                             {item.label}
//                         </button>
//                     ))}
//                 </nav>

//                 {/* Mobile Menu Button */}
//                 <button
//                     style={{
//                         display: window.innerWidth <= 768 ? "block" : "none",
//                         background: "none",
//                         border: "none",
//                         color: isScrolled ? "#1e293b" : "white",
//                         fontSize: "1.5rem",
//                         cursor: "pointer",
//                     }}
//                     onClick={() => setMenuOpen(!isMenuOpen)}
//                 >
//                     ☰
//                 </button>
//             </div>

//             {/* Mobile Menu */}
//             {isMenuOpen && (
//                 <div
//                     style={{
//                         position: "absolute",
//                         top: "100%",
//                         left: 0,
//                         right: 0,
//                         background: "white",
//                         boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//                         padding: "1rem",
//                     }}
//                 >
//                     {[
//                         { id: "home", label: "Home" },
//                         { id: "about-us", label: "About Us" },
//                         { id: "units", label: "Our Units" },
//                         { id: "admissions", label: "Admissions" },
//                         { id: "contact", label: "Contact" },
//                     ].map((item) => (
//                         <button
//                             key={item.id}
//                             onClick={() => scrollToSection(item.id)}
//                             style={{
//                                 display: "block",
//                                 width: "100%",
//                                 background: "none",
//                                 border: "none",
//                                 color: "#1e293b",
//                                 fontSize: "1rem",
//                                 padding: "1rem",
//                                 textAlign: "left",
//                                 cursor: "pointer",
//                                 borderBottom: "1px solid #e2e8f0",
//                             }}
//                         >
//                             {item.label}
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </header>
//     );
// };

// export default Header;
import React, { useState, useEffect } from "react";

const Header = ({ isScrolled, isMenuOpen, setMenuOpen, activeSection, scrollToSection, title }) => {
    // --- START OF FIX ---
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        // Function to update the isMobile state
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Add event listener when the component mounts
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount and cleanup on unmount
    // --- END OF FIX ---

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
                backdropFilter: isScrolled ? "blur(10px)" : "none",
                transition: "all 0.3s ease",
                padding: "1rem 0",
                borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.1)" : "none",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        cursor: "pointer",
                    }}
                    onClick={() => scrollToSection("home")}
                >
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                        }}
                    >
                        G
                    </div>
                    <div>
                        <h2
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "700",
                                color: isScrolled ? "#1e293b" : "white",
                                margin: 0,
                            }}
                        >
                            {title}
                        </h2>
                    </div>
                </div>

                {/* Desktop Navigation - UPDATED LOGIC */}
                {!isMobile && (
                    <nav
                        style={{
                            display: "flex",
                            gap: "2rem",
                            alignItems: "center",
                        }}
                    >
                        {[
                            { id: "home", label: "Home" },
                            { id: "about-us", label: "About Us" },
                            { id: "units", label: "Our Units" },
                            { id: "admissions", label: "Admissions" },
                            { id: "contact", label: "Contact" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: isScrolled ? "#1e293b" : "white",
                                    fontSize: "1rem",
                                    fontWeight: activeSection === item.id ? "600" : "400",
                                    cursor: "pointer",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "0.5rem",
                                    transition: "all 0.3s ease",
                                    textDecoration: activeSection === item.id ? "underline" : "none",
                                    textUnderlineOffset: "0.5rem",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = "rgba(14, 165, 233, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = "none";
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                )}

                {/* Mobile Menu Button - UPDATED LOGIC */}
                {isMobile && (
                    <button
                        style={{
                            background: "none",
                            border: "none",
                            color: isScrolled ? "#1e293b" : "white",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                        }}
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            {isMobile && isMenuOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "white",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        padding: "1rem",
                    }}
                >
                    {[
                        { id: "home", label: "Home" },
                        { id: "about-us", label: "About Us" },
                        { id: "units", label: "Our Units" },
                        { id: "admissions", label: "Admissions" },
                        { id: "contact", label: "Contact" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                scrollToSection(item.id);
                                setMenuOpen(false); // Close menu on click
                            }}
                            style={{
                                display: "block",
                                width: "100%",
                                background: "none",
                                border: "none",
                                color: "#1e293b",
                                fontSize: "1rem",
                                padding: "1rem",
                                textAlign: "left",
                                cursor: "pointer",
                                borderBottom: "1px solid #e2e8f0",
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;