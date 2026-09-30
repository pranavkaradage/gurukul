// // import React, { useEffect } from "react";
// // import { useLocation } from "react-router-dom";
// // import { AppData } from "../data";
// // import Hero from "../components/home/Hero";
// // import HomeAbout from "../components/home/HomeAbout";
// // import HomeUnits from "../components/home/HomeUnits";
// // import HomeAdmissions from "../components/home/HomeAdmissions";
// // import HomeCirculars from "../components/home/HomeCirculars";
// // import HomeEvents from "../components/home/HomeEvents";
// // import HomeGallery from "../components/home/HomeGallery";
// // import HomeContact from "../components/home/HomeContact";
// // import HomeResults from "../components/home/HomeResults";

// // const HomePage = () => {
// //   const location = useLocation();

// //   useEffect(() => {
// //     if (location.state?.scrollTo) {
// //       const element = document.getElementById(location.state.scrollTo);
// //       if (element) {
// //         const headerOffset = 80;
// //         const elementPosition = element.getBoundingClientRect().top;
// //         const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

// //         window.scrollTo({
// //              top: offsetPosition,
// //              behavior: "smooth"
// //         });
// //       }
// //     }
// //   }, [location]);

// //   return (
// //     <>
// //       <div id="home"><Hero slides={AppData.heroSlides} /></div>
// //       <div id="results"><HomeResults results={AppData.homeResults} /></div>
// //       <div id="about-us"><HomeAbout about={AppData.about} management={AppData.management} /></div>
// //       <div id="units"><HomeUnits units={AppData.units} /></div>
// //       <div id="admissions"><HomeAdmissions contact={AppData.contact} /></div>

// //       {/* ENSURING CORRECT PROP NAMES ARE USED */}
// //       <div id="circulars"><HomeCirculars circulars={AppData.homepageCirculars} /></div>
// //       <div id="events"><HomeEvents events={AppData.homepageEvents} /></div>
// //       <div id="gallery"><HomeGallery gallery={AppData.homepageGallery} /></div>

// //       <div id="contact"><HomeContact contact={AppData.contact} socialMedia={AppData.socialMedia} /></div>
// //     </>
// //   );
// // };

// // export default HomePage;
// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { AppData } from "../data";
// import Hero from "../components/home/Hero";
// import HomeAbout from "../components/home/HomeAbout";
// import HomeUnits from "../components/home/HomeUnits";
// import HomeAdmissions from "../components/home/HomeAdmissions";
// import HomeCirculars from "../components/home/HomeCirculars";
// import HomeEvents from "../components/home/HomeEvents";
// import HomeGallery from "../components/home/HomeGallery";
// import HomeContact from "../components/home/HomeContact";
// import HomeResults from "../components/home/HomeResults";

// const HomePage = () => {
//   const location = useLocation();

//   // --- START OF FIX ---
//   useEffect(() => {
//     if (location.state?.scrollTo) {
//       const element = document.getElementById(location.state.scrollTo);
//       if (element) {
//         // Use requestAnimationFrame to ensure layout is stable after page navigation
//         requestAnimationFrame(() => {
//           const headerOffset = 80;
//           const elementPosition = element.getBoundingClientRect().top;
//           const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//           window.scrollTo({
//                top: offsetPosition,
//                behavior: "smooth"
//           });
//         });
//       }
//     }
//   }, [location]);
//   // --- END OF FIX ---

//   return (
//     <>
//       <div id="home"><Hero slides={AppData.heroSlides} /></div>
//       <div id="results"><HomeResults results={AppData.homeResults} /></div>
//       <div id="about-us"><HomeAbout about={AppData.about} management={AppData.management} /></div>
//       <div id="units"><HomeUnits units={AppData.units} /></div>
//       <div id="admissions"><HomeAdmissions contact={AppData.contact} /></div>

//       {/* ENSURING CORRECT PROP NAMES ARE USED */}
//       <div id="circulars"><HomeCirculars circulars={AppData.homepageCirculars} /></div>
//       <div id="events"><HomeEvents events={AppData.homepageEvents} /></div>
//       <div id="gallery"><HomeGallery gallery={AppData.homepageGallery} /></div>

//       <div id="contact"><HomeContact contact={AppData.contact} socialMedia={AppData.socialMedia} /></div>
//     </>
//   );
// };

// export default HomePage;
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppData } from "../data";
import Hero from "../components/home/Hero";
import HomeAbout from "../components/home/HomeAbout";
import HomeUnits from "../components/home/HomeUnits";
import HomeAdmissions from "../components/home/HomeAdmissions";
import HomeCirculars from "../components/home/HomeCirculars";
import HomeEvents from "../components/home/HomeEvents";
import HomeGallery from "../components/home/HomeGallery";
import HomeContact from "../components/home/HomeContact";
import HomeResults from "../components/home/HomeResults";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // --- FIX APPLIED HERE ---
        // Use requestAnimationFrame to ensure layout is stable after navigating
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

  return (
    <>
      <div id="home">
        <Hero slides={AppData.heroSlides} />
      </div>
      <div id="results">
        <HomeResults results={AppData.homeResults} />
      </div>
      <div id="about-us">
        <HomeAbout about={AppData.about} management={AppData.management} />
      </div>
      <div id="units">
        <HomeUnits units={AppData.units} />
      </div>
      <div id="admissions">
        <HomeAdmissions contact={AppData.contact} />
      </div>

      <div id="circulars">
        <HomeCirculars circulars={AppData.homepageCirculars} />
      </div>
      <div id="events">
        <HomeEvents events={AppData.homepageEvents} />
      </div>
      <div id="gallery">
        <HomeGallery gallery={AppData.homepageGallery} />
      </div>

      <div id="contact">
        <HomeContact
          contact={AppData.contact}
          socialMedia={AppData.socialMedia}
        />
      </div>
    </>
  );
};

export default HomePage;
