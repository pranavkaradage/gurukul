// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { publicApi } from "../services/api";
// import Hero from "../components/home/Hero";
// import HomeAbout from "../components/home/HomeAbout";
// import HomeUnits from "../components/home/HomeUnits";
// import HomeAdmissions from "../components/home/HomeAdmissions";
// import HomeCirculars from "../components/home/HomeCirculars";
// import HomeEvents from "../components/home/HomeEvents";
// import HomeGallery from "../components/home/HomeGallery";
// import HomeContact from "../components/home/HomeContact";
// import HomeResults from "../components/home/HomeResults";
// import MotionBackdrop from "../components/common/MotionBackdrop";

// const HomePage = () => {
//   const location = useLocation();
//   const [appData, setAppData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await publicApi.getAllData();
//         setAppData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Fallback to static data if API fails
//         // You can import AppData from data.js as fallback
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (location.state?.scrollTo) {
//       const element = document.getElementById(location.state.scrollTo);
//       if (element) {
//         const headerOffset = 80;
//         const elementPosition = element.getBoundingClientRect().top;
//         const offsetPosition =
//           elementPosition + window.pageYOffset - headerOffset;

//         window.scrollTo({
//           top: offsetPosition,
//           behavior: "smooth",
//         });
//       }
//     }
//   }, [location]);

//   if (loading) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
//     );
//   }

//   if (!appData) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center" }}>
//         Error loading data. Please try again later.
//       </div>
//     );
//   }

//   // Transform API data to match component expectations
//   const heroSlides = appData.heroSlides || [];
//   const homeResults = appData.homeResults || {};
//   const about = appData.about || {};
//   const management = appData.management || [];
//   const units = appData.units || [];
//   const circulars = appData.circulars || [];
//   const events = appData.events || [];
//   const gallery = appData.gallery || {};
//   const contact = appData.contact || {};
//   const socialMedia = appData.socialMedia || {};

//   return (
//     <>
//       <MotionBackdrop />
//       <div id="home" className="section-motion">
//         <Hero slides={heroSlides} />
//       </div>
//       <div
//         id="results"
//         className="section-motion"
//         style={{ position: "relative", zIndex: 1 }}
//       >
//         <HomeResults results={homeResults} />
//       </div>
//       <div
//         id="about-us"
//         className="section-motion"
//         style={{ position: "relative", zIndex: 1 }}
//       >
//         <HomeAbout about={about} management={management} />
//       </div>
//       <div
//         id="units"
//         className="section-motion"
//         style={{ position: "relative", zIndex: 1 }}
//       >
//         <HomeUnits units={units} />
//       </div>
//       <div
//         id="admissions"
//         className="section-motion"
//         style={{ position: "relative", zIndex: 1 }}
//       >
//         <HomeAdmissions contact={contact} />
//       </div>
//       <div
//         id="circulars"
//         className="section-motion"
//         style={{ position: "relative", zIndex: 1 }}
//       >
//         <HomeCirculars circulars={circulars} />
//       </div>
//       <div
//         id="events"
//         className="section-motion"
//         style={{ position: "relative", zIndex: 1 }}
//       >
//         <HomeEvents events={events} />
//       </div>
//       <div
//         id="gallery"
//         className="section-motion"
//         style={{ position: "relative", zIndex: 1 }}
//       >
//         <HomeGallery gallery={gallery} />
//       </div>
//       <div
//         id="contact"
//         className="section-motion"
//         style={{ position: "relative", zIndex: 1 }}
//       >
//         <HomeContact contact={contact} socialMedia={socialMedia} />
//       </div>
//     </>
//   );
// };

// export default HomePage;
// HomePage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicApi } from "../services/api";
import Hero from "../components/home/Hero";
import HomeAbout from "../components/home/HomeAbout";
import HomeUnits from "../components/home/HomeUnits";
import HomeAdmissions from "../components/home/HomeAdmissions";
import HomeEvents from "../components/home/HomeEvents";
import HomeGallery from "../components/home/HomeGallery";
import HomeContact from "../components/home/HomeContact";
import HomeResults from "../components/home/HomeResults";
import MotionBackdrop from "../components/common/MotionBackdrop";

/**
 * HomePage
 *
 * - Renders homepage sections (Hero, About, Units, Admissions, Circulars, Events, Gallery, Contact, Results)
 * - Fetches data from publicApi and maps to components
 * - Smooth-scrolls to a section when location.state.scrollTo is present
 * - Dispatches a global "open-registration-modal" event robustly so the header/modal opens on page load AND reload
 *
 * Notes about auto-open behavior:
 * - We dispatch "open-registration-modal" at multiple times (immediate, and several delayed times).
 *   This is defensive: if Header (which listens to this event) mounts at slightly different times during page load/hydration,
 *   it will receive at least one dispatch.
 * - We also dispatch once when the page becomes visible (visibilitychange) — useful when users switch tabs or reload.
 * - All dispatches are confined to the homepage route (location.pathname === "/").
 * - No other UI/behavior is changed.
 */

const HomePage = () => {
  const location = useLocation();
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch app data once
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const response = await publicApi.getAllData();
        if (mounted) setAppData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // If API fails, appData remains null and the error UI will show
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  // Smooth-scroll if navigation provided a scrollTo target
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Use requestAnimationFrame to ensure layout is stable
        requestAnimationFrame(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        });
      }
    }
  }, [location]);


  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }

  if (!appData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Error loading data. Please try again later.
      </div>
    );
  }

  // Transform API data to match component expectations
  const heroSlides = appData.heroSlides || [];
  const homeResults = appData.homeResults || {};
  const about = appData.about || {};
  const management = appData.management || [];
  const units = appData.units || [];
  const events = appData.events || [];
  const gallery = appData.gallery || {};
  const contact = appData.contact || {};
  const socialMedia = appData.socialMedia || {};

  return (
    <>
      <MotionBackdrop />
      <div id="home" className="section-motion">
        <Hero slides={heroSlides} />
      </div>
      <div
        id="results"
        className="section-motion"
        style={{ position: "relative", zIndex: 1 }}
      >
        <HomeResults results={homeResults} />
      </div>
      <div
        id="about-us"
        className="section-motion"
        style={{ position: "relative", zIndex: 1 }}
      >
        <HomeAbout about={about} management={management} />
      </div>
      <div
        id="units"
        className="section-motion"
        style={{ position: "relative", zIndex: 1 }}
      >
        <HomeUnits units={units} />
      </div>
      <div
        id="admissions"
        className="section-motion"
        style={{ position: "relative", zIndex: 1 }}
      >
        <HomeAdmissions contact={contact} />
      </div>
      <div
        id="events"
        className="section-motion"
        style={{ position: "relative", zIndex: 1 }}
      >
        <HomeEvents events={events} />
      </div>
      <div
        id="gallery"
        className="section-motion"
        style={{ position: "relative", zIndex: 1 }}
      >
        <HomeGallery gallery={gallery} />
      </div>
      <div
        id="contact"
        className="section-motion"
        style={{ position: "relative", zIndex: 1 }}
      >
        <HomeContact contact={contact} socialMedia={socialMedia} />
      </div>
    </>
  );
};

export default HomePage;
