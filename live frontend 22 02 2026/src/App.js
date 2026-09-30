import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UnitPage from "./pages/UnitPage";
import CircularsPage from "./pages/CircularsPage";
import AdminPage from "./pages/AdminPage"; // <-- IMPORT THE NEW ADMIN PAGE
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import OpeningAnimation from "./components/common/OpeningAnimation";
import Chatbot from "./components/common/Chatbot";
import FloatingSocialIcons from "./components/common/FloatingSocialIcons";
import DynamicFormPopup from "./components/common/DynamicFormPopup"; // <-- IMPORT NEW POPUP
import { publicApi } from "./services/api";
import { ThemeProvider } from "./context/ThemeContext";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";
  const [showOpening, setShowOpening] = useState(true); // Show on every page load/refresh
  const [units, setUnits] = useState([]);
  const [appData, setAppData] = useState({
    contact: { email: "", whatsapp: "" },
    socialMedia: { facebook: "", instagram: "", youtube: "" },
  });
  const [siteTitle, setSiteTitle] = useState("Gurukul Shikshan Samuh");

  // Fetch units from API for Header
  useEffect(() => {
    if (!isAdminPage) {
      const fetchUnits = async () => {
        try {
          const response = await publicApi.getAllData();
          setUnits(response.data.units || []);
          setAppData({
            contact: response.data.contact || { email: "", whatsapp: "" },
            socialMedia: response.data.socialMedia || {
              facebook: "",
              instagram: "",
              youtube: "",
            },
          });
        } catch (error) {
          console.error("Error fetching units for header:", error);
          // Fallback to empty array if API fails
          setUnits([]);
        }
      };
      fetchUnits();
    }
  }, [isAdminPage]);

  return (
    <>
      {showOpening && (
        <OpeningAnimation
          onComplete={() => {
            setShowOpening(false);
          }}
        />
      )}
      {!isAdminPage && <Header title={siteTitle} units={units} />}
      <Wrapper>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/unit/:unitId" element={<UnitPage />} />
            <Route path="/circulars" element={<CircularsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </Wrapper>
      {!isAdminPage && (
        <Footer
          title={siteTitle}
          contact={appData.contact}
          socialMedia={appData.socialMedia}
        />
      )}
      {!isAdminPage && <FloatingSocialIcons socialMedia={appData.socialMedia} />}
      {!isAdminPage && <Chatbot />}
      {!isAdminPage && <DynamicFormPopup />}
    </>
  );
};

// We need to wrap App with Router to use useLocation
const AppWrapper = () => (
  <ThemeProvider>
    <Router>
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          html { scroll-behavior: smooth; }
          body { 
            font-family: 'Poppins', sans-serif; 
            line-height: 1.6; 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          body.light-mode { background-color: #ffffff; color: #1e293b; }
          body.dark-mode { background-color: #0f172a; color: #f1f5f9; }
          .gradient-text { 
            background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
            background-clip: text; 
          }
          [data-theme="dark"] .gradient-text {
            background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .hover-scale { transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .hover-scale:hover { transform: scale(1.05); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
          * { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
        `}</style>
      <App />
    </Router>
  </ThemeProvider>
);

export default AppWrapper;
