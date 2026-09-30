// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import Swal from "sweetalert2";
// // import { useTheme } from "../context/ThemeContext";
// // import Img from "../assessts/Add.jpeg";

// // const RegistrationModal = ({ isOpen, onClose }) => {
// //   const { colors } = useTheme();

// //   const [formData, setFormData] = useState({
// //     branch: "",
// //     studentName: "",
// //     schoolName: "",
// //     villageOrCity: "",
// //     address: "",
// //     mobileNumber: "",
// //     lastExamPercentage: "",
// //     emailId: "",
// //     interestedFor: [],
// //   });

// //   const [branchChoice, setBranchChoice] = useState(""); // "Science" | "Commerce"
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   useEffect(() => {
// //     if (!isOpen) return;
// //     const onKey = (e) => {
// //       if (e.key === "Escape") onClose();
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, [isOpen, onClose]);

// //   // --- REAL-TIME VALIDATION ---
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     // 1. Validation for Name, School, and Village (No Numbers allowed)
// //     if (["studentName", "schoolName", "villageOrCity"].includes(name)) {
// //       if (/\d/.test(value)) {
// //         Swal.fire({
// //           icon: "warning",
// //           title: "Invalid Input",
// //           text: "Only characters are allowed (no numbers).",
// //           toast: true,
// //           position: "top-end",
// //           showConfirmButton: false,
// //           timer: 3000,
// //         });
// //         return;
// //       }
// //     }

// //     // 2. Validation for Mobile Number (Only Numbers allowed)
// //     if (name === "mobileNumber") {
// //       if (!/^\d*$/.test(value)) {
// //         Swal.fire({
// //           icon: "warning",
// //           title: "Invalid Input",
// //           text: "Only numbers are allowed.",
// //           toast: true,
// //           position: "top-end",
// //           showConfirmButton: false,
// //           timer: 3000,
// //         });
// //         return;
// //       }
// //     }

// //     setFormData((s) => ({ ...s, [name]: value }));
// //   };

// //   const handleBranchChange = (value) => {
// //     setBranchChoice(value);
// //     setFormData((s) => ({ ...s, branch: value, interestedFor: [] }));
// //   };

// //   const handleInterestToggle = (value) => {
// //     setFormData((s) => {
// //       const currentList = s.interestedFor || [];

// //       // Logic 1: If "Not decided" is clicked
// //       if (value === "Not decided") {
// //         // If it is currently selected, deselect it (empty array)
// //         if (currentList.includes("Not decided")) {
// //           return { ...s, interestedFor: [] };
// //         }
// //         // If it is NOT selected, select it and clear everything else
// //         return { ...s, interestedFor: ["Not decided"] };
// //       }

// //       // Logic 2: If any other option is clicked
// //       // Note: The 'disabled' attribute on inputs prevents selecting incompatible options,
// //       // but we keep logic here for safety.

// //       // If "Not decided" is active, and user clicks something else (programmatically allowed),
// //       // we usually want to clear "Not decided" or prevent the action.
// //       // Based on UI patterns: selecting a specific option usually clears "Not decided".
// //       let newList = [...currentList];

// //       if (newList.includes("Not decided")) {
// //         // Remove 'Not decided' and start fresh with the new value
// //         newList = [value];
// //       } else {
// //         // Standard Toggle
// //         if (newList.includes(value)) {
// //           newList = newList.filter((item) => item !== value);
// //         } else {
// //           newList.push(value);
// //         }
// //       }

// //       return { ...s, interestedFor: newList };
// //     });
// //   };

// //   // Helper to determine if a checkbox should be disabled
// //   const isOptionDisabled = (option) => {
// //     const selected = formData.interestedFor || [];

// //     // 1. If "Not decided" is selected, everything else is disabled
// //     if (selected.includes("Not decided") && option !== "Not decided") {
// //       return true;
// //     }

// //     // 2. Science Logic: JEE vs NEET
// //     if (branchChoice === "Science") {
// //       if (option === "JEE" && selected.includes("NEET")) return true;
// //       if (option === "NEET" && selected.includes("JEE")) return true;
// //     }

// //     return false;
// //   };

// //   const validatePercentage = (val) => {
// //     if (val === "") return false;
// //     const n = Number(val);
// //     return !Number.isNaN(n) && n >= 0 && n <= 100;
// //   };

// //   const getInterestedOptions = () => {
// //     if (branchChoice === "Science") return ["CET", "JEE", "NEET", "Not decided"];
// //     if (branchChoice === "Commerce") return ["CA Foundation", "Not decided"];
// //     return [];
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!branchChoice) {
// //       return Swal.fire({
// //         icon: "error",
// //         title: "Missing field",
// //         text: "Please select a Branch.",
// //       });
// //     }
// //     if (!formData.studentName.trim()) {
// //       return Swal.fire({
// //         icon: "error",
// //         title: "Missing field",
// //         text: "Please enter student's full name.",
// //       });
// //     }
// //     if (!formData.schoolName.trim()) {
// //       return Swal.fire({
// //         icon: "error",
// //         title: "Missing field",
// //         text: "Please enter school name.",
// //       });
// //     }
// //     if (!formData.villageOrCity.trim()) {
// //       return Swal.fire({
// //         icon: "error",
// //         title: "Missing field",
// //         text: "Please enter village or city.",
// //       });
// //     }
// //     if (!formData.address.trim()) {
// //       return Swal.fire({
// //         icon: "error",
// //         title: "Missing field",
// //         text: "Please enter address.",
// //       });
// //     }
// //     if (!/^\d{10}$/.test(formData.mobileNumber)) {
// //       return Swal.fire({
// //         icon: "error",
// //         title: "Invalid mobile",
// //         text: "Please enter a valid 10-digit mobile number.",
// //       });
// //     }
// //     if (!validatePercentage(formData.lastExamPercentage)) {
// //       return Swal.fire({
// //         icon: "error",
// //         title: "Invalid percentage",
// //         text: "Please enter last exam percentage between 0 and 100.",
// //       });
// //     }
// //     if (
// //       getInterestedOptions().length > 0 &&
// //       (!formData.interestedFor || formData.interestedFor.length === 0)
// //     ) {
// //       return Swal.fire({
// //         icon: "error",
// //         title: "Missing field",
// //         text: "Please choose at least one option under 'Interested For'.",
// //       });
// //     }

// //     setIsSubmitting(true);

// //     try {
// //       const payload = {
// //         ...formData,
// //         branch: branchChoice,
// //         lastExamPercentage: Number(formData.lastExamPercentage),
// //         interestedFor: formData.interestedFor.join(","),
// //       };

// //       const response = await axios.post(
// //         "https://gurukulschools.org/api/api/public/student-registration",
// //         payload
// //       );

// //       if (response.status === 200) {
// //         Swal.fire({
// //           icon: "success",
// //           title: "Registration Successful!",
// //           text: "Your registration has been submitted successfully. We will contact you soon.",
// //           confirmButtonColor: "#0ea5e9",
// //           confirmButtonText: "OK",
// //         });

// //         setFormData({
// //           branch: "",
// //           studentName: "",
// //           schoolName: "",
// //           villageOrCity: "",
// //           address: "",
// //           mobileNumber: "",
// //           lastExamPercentage: "",
// //           emailId: "",
// //           interestedFor: [],
// //         });
// //         setBranchChoice("");
// //         onClose();
// //       } else {
// //         throw new Error("Unexpected response");
// //       }
// //     } catch (error) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Registration Failed",
// //         text:
// //           error.response?.data?.message ||
// //           error.message ||
// //           "Something went wrong. Please try again.",
// //         confirmButtonColor: "#ef4444",
// //         confirmButtonText: "OK",
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   if (!isOpen) return null;

// //   const overlay = {
// //     position: "fixed",
// //     inset: 0,
// //     background:
// //       "linear-gradient(180deg, rgba(2,6,23,0.5) 0%, rgba(2,6,23,0.6) 100%)",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     zIndex: 2000,
// //     padding: "1rem",
// //     WebkitOverflowScrolling: "touch",
// //   };

// //   const closeButtonStyle = {
// //     position: "absolute",
// //     top: "0.6rem",
// //     right: "0.6rem",
// //     background: "none",
// //     border: "none",
// //     fontSize: "1.4rem",
// //     cursor: "pointer",
// //     color: colors.textSecondary,
// //     width: "36px",
// //     height: "36px",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     borderRadius: "50%",
// //   };

// //   const inputBaseStyle = {
// //     width: "100%",
// //     padding: "0.75rem",
// //     border: `1px solid ${colors.border}`,
// //     borderRadius: "0.5rem",
// //     fontSize: "1rem",
// //     fontFamily: "inherit",
// //     transition: "border-color 0.15s ease",
// //     boxSizing: "border-box",
// //     background: colors.backgroundAlt,
// //     color: colors.text,
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         /* FORCE SWEETALERT TO BE ON TOP */
// //         .swal2-container {
// //           z-index: 99999 !important;
// //         }

// //         @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
// //         @keyframes slideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

// //         .registration-modal-container {
// //           width: 100%;
// //           max-width: 1000px;
// //           max-height: calc(100vh - 48px);
// //           overflow: auto;
// //           -webkit-overflow-scrolling: touch;
// //           border-radius: 14px;
// //           box-shadow: 0 20px 60px rgba(2,6,23,0.45);
// //           display: grid;
// //           grid-template-columns: 420px 1fr;
// //           gap: 1.25rem;
// //           padding: 1.15rem;
// //           background: ${colors.card};
// //           position: relative;
// //           animation: slideUp 0.22s ease-in-out;
// //         }

// //         .registration-modal-container::-webkit-scrollbar { width: 10px; height: 10px; }
// //         .registration-modal-container::-webkit-scrollbar-track { background: transparent; }
// //         .registration-modal-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 12px; border: 2px solid transparent; background-clip: padding-box; }
// //         .registration-modal-container { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.08) transparent; }

// //         .registration-left-panel {
// //           padding: 1rem;
// //           border-radius: 10px;
// //           display: flex;
// //           flex-direction: column;
// //           gap: 0.9rem;
// //           justify-content: center;
// //           align-items: center; /* Center the image */
// //           min-height: 220px;
// //           background: ${colors.backgroundAlt}; /* Added a subtle background for the image container */
// //         }

// //         .registration-form-panel { padding: 0.15rem 0; min-height: 220px; }

// //         .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
// //         .form-group { margin-bottom: 1rem; }
// //         label.modal-label { display:block; margin-bottom:0.35rem; color: ${colors.text}; font-weight:600; font-size:0.95rem; }
// //         .modal-input:focus { outline:none; border-color: ${colors.primary}; box-shadow: 0 0 0 6px ${colors.primary}18; }

// //         .modal-submit-btn { width:100%; padding:0.95rem; background: linear-gradient(90deg, ${colors.primary}, ${colors.primary}); color:${colors.buttonText}; border:none; border-radius:0.6rem; font-weight:700; cursor:pointer; box-shadow: 0 8px 30px ${colors.primary}22; }
// //         .modal-submit-btn:disabled { opacity:0.75; cursor:not-allowed; }

// //         .radio-row { display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center; }
// //         .radio-row label { display:flex; align-items:center; gap:0.45rem; color:${colors.text}; cursor:pointer; padding:0.18rem 0.2rem; border-radius:6px; }

// //         .interest-list { display:flex; flex-direction:column; gap:8px; margin-top:6px; }
// //         .interest-item { display:flex; align-items:center; gap:0.6rem; cursor:pointer; color: ${colors.text}; }
// //         .interest-item.disabled-option { opacity: 0.5; cursor: not-allowed; }
// //         .interest-item input { width: 18px; height: 18px; }

// //         @media (max-width: 920px) {
// //           .registration-modal-container { grid-template-columns: 1fr; padding: 0.9rem; gap: 0.9rem; max-width: 760px; }
// //           .form-grid { grid-template-columns: 1fr; }
// //           .registration-left-panel { order: -1; min-height: auto; }
// //         }
// //         @media (max-width: 480px) {
// //           .registration-modal-container { max-width:100%; width:100%; height:100%; border-radius:0; padding:0.6rem; max-height:100vh; }
// //           .registration-left-panel { padding:0.75rem; border-radius:8px; }
// //           .modal-close-btn { top:0.45rem; right:0.45rem; }
// //         }
// //       `}</style>

// //       <div style={overlay} onClick={onClose}>
// //         <div
// //           className="registration-modal-container"
// //           onClick={(e) => e.stopPropagation()}
// //           role="dialog"
// //           aria-modal="true"
// //         >
// //           <button
// //             style={closeButtonStyle}
// //             onClick={onClose}
// //             className="modal-close-btn"
// //             aria-label="Close modal"
// //           >
// //             ×
// //           </button>

// //           <div className="registration-left-panel" aria-hidden={true}>
// //             <img
// //               src={Img}
// //               alt="Gurukul Entrance Test Advertisement"
// //               style={{
// //                 width: "100%",
// //                 maxHeight: "100%",
// //                 borderRadius: "8px",
// //                 objectFit: "contain",
// //               }}
// //             />
// //           </div>

// //           <div className="registration-form-panel">
// //             <form onSubmit={handleSubmit}>
// //               <div className="form-grid">
// //                 <div className="form-group">
// //                   <label className="modal-label" htmlFor="studentName">
// //                     Student Full Name <span style={{ color: "#ef4444" }}>*</span>
// //                   </label>
// //                   <input
// //                     id="studentName"
// //                     name="studentName"
// //                     type="text"
// //                     value={formData.studentName}
// //                     onChange={handleChange}
// //                     style={inputBaseStyle}
// //                     className="modal-input"
// //                     required
// //                     placeholder="Enter student's full name"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="form-grid" style={{ marginTop: 8 }}>
// //                 <div className="form-group">
// //                   <label className="modal-label" htmlFor="schoolName">
// //                     School Name <span style={{ color: "#ef4444" }}>*</span>
// //                   </label>
// //                   <input
// //                     id="schoolName"
// //                     name="schoolName"
// //                     type="text"
// //                     value={formData.schoolName}
// //                     onChange={handleChange}
// //                     style={inputBaseStyle}
// //                     className="modal-input"
// //                     required
// //                     placeholder="Enter school name"
// //                   />
// //                 </div>

// //                 <div className="form-group">
// //                   <label className="modal-label" htmlFor="villageOrCity">
// //                     Village or City <span style={{ color: "#ef4444" }}>*</span>
// //                   </label>
// //                   <input
// //                     id="villageOrCity"
// //                     name="villageOrCity"
// //                     type="text"
// //                     value={formData.villageOrCity}
// //                     onChange={handleChange}
// //                     style={inputBaseStyle}
// //                     className="modal-input"
// //                     required
// //                     placeholder="Enter village or city"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="form-group" style={{ marginTop: 8 }}>
// //                 <label className="modal-label" htmlFor="address">
// //                   Address <span style={{ color: "#ef4444" }}>*</span>
// //                 </label>
// //                 <textarea
// //                   id="address"
// //                   name="address"
// //                   value={formData.address}
// //                   onChange={handleChange}
// //                   style={{
// //                     ...inputBaseStyle,
// //                     minHeight: "96px",
// //                     resize: "vertical",
// //                   }}
// //                   className="modal-input"
// //                   required
// //                   placeholder="Enter full address"
// //                 />
// //               </div>

// //               <div className="form-grid" style={{ marginTop: 8 }}>
// //                 <div className="form-group">
// //                   <label className="modal-label" htmlFor="mobileNumber">
// //                     Mobile Number <span style={{ color: "#ef4444" }}>*</span>
// //                   </label>
// //                   <input
// //                     id="mobileNumber"
// //                     name="mobileNumber"
// //                     type="tel"
// //                     value={formData.mobileNumber}
// //                     onChange={handleChange}
// //                     style={inputBaseStyle}
// //                     className="modal-input"
// //                     required
// //                     placeholder="Enter mobile number"
// //                     pattern="[0-9]{10}"
// //                     maxLength="10"
// //                   />
// //                 </div>

// //                 <div className="form-group">
// //                   <label className="modal-label" htmlFor="emailId">
// //                     Email (optional)
// //                   </label>
// //                   <input
// //                     id="emailId"
// //                     name="emailId"
// //                     type="email"
// //                     value={formData.emailId}
// //                     onChange={handleChange}
// //                     style={inputBaseStyle}
// //                     className="modal-input"
// //                     placeholder="Enter email (optional)"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="form-grid" style={{ marginTop: 8 }}>
// //                 <div className="form-group">
// //                   <label className="modal-label" htmlFor="lastExamPercentage">
// //                     Last Exam Percentage{" "}
// //                     <span style={{ color: "#ef4444" }}>*</span>
// //                   </label>
// //                   <input
// //                     id="lastExamPercentage"
// //                     name="lastExamPercentage"
// //                     type="number"
// //                     inputMode="decimal"
// //                     min="0"
// //                     max="100"
// //                     step="0.01"
// //                     value={formData.lastExamPercentage}
// //                     onChange={handleChange}
// //                     style={inputBaseStyle}
// //                     className="modal-input"
// //                     required
// //                     placeholder="e.g., 85.5"
// //                   />
// //                 </div>

// //                 <div className="form-group">
// //                   <label className="modal-label">
// //                     Branch <span style={{ color: "#ef4444" }}>*</span>
// //                   </label>
// //                   <div
// //                     className="radio-row"
// //                     role="radiogroup"
// //                     aria-label="Branch choice"
// //                   >
// //                     <label>
// //                       <input
// //                         type="radio"
// //                         name="branchRadio"
// //                         value="Commerce"
// //                         checked={branchChoice === "Commerce"}
// //                         onChange={() => handleBranchChange("Commerce")}
// //                         required
// //                       />
// //                       <span>Commerce</span>
// //                     </label>
// //                     <label>
// //                       <input
// //                         type="radio"
// //                         name="branchRadio"
// //                         value="Science"
// //                         checked={branchChoice === "Science"}
// //                         onChange={() => handleBranchChange("Science")}
// //                         required
// //                       />
// //                       <span>Science</span>
// //                     </label>
// //                   </div>
// //                 </div>

// //                 <div className="form-group">
// //                   <label className="modal-label">
// //                     Interested For <span style={{ color: "#ef4444" }}>*</span>
// //                   </label>

// //                   {getInterestedOptions().length > 0 ? (
// //                     <div
// //                       className="interest-list"
// //                       role="group"
// //                       aria-label="Interested for options"
// //                     >
// //                       {getInterestedOptions().map((opt) => {
// //                         const isDisabled = isOptionDisabled(opt);
// //                         return (
// //                           <label
// //                             key={opt}
// //                             className={`interest-item ${
// //                               isDisabled ? "disabled-option" : ""
// //                             }`}
// //                           >
// //                             <input
// //                               type="checkbox"
// //                               name="interestedForCheckbox"
// //                               value={opt}
// //                               checked={(formData.interestedFor || []).includes(
// //                                 opt
// //                               )}
// //                               onChange={() => handleInterestToggle(opt)}
// //                               disabled={isDisabled}
// //                             />
// //                             <span>{opt}</span>
// //                           </label>
// //                         );
// //                       })}
// //                     </div>
// //                   ) : (
// //                     <div
// //                       style={{
// //                         color: colors.textSecondary,
// //                         fontSize: "0.95rem",
// //                       }}
// //                     >
// //                       {branchChoice
// //                         ? "No specific options for this branch."
// //                         : "Please select a Branch to see options."}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div style={{ marginTop: "0.75rem" }}>
// //                 <button
// //                   type="submit"
// //                   className="modal-submit-btn"
// //                   disabled={isSubmitting}
// //                 >
// //                   {isSubmitting ? "Submitting..." : "Submit Registration"}
// //                 </button>
// //               </div>

// //               <div style={{ height: 18 }} aria-hidden="true" />
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default RegistrationModal;

// import React, { useEffect } from "react";
// import { useTheme } from "../context/ThemeContext";
// import Img from "../assessts/Add.jpeg";

// const RegistrationModal = ({ isOpen, onClose }) => {
//   const { colors } = useTheme();

//   // Handle closing on Escape key
//   useEffect(() => {
//     if (!isOpen) return;
//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   // --- STYLES ---

//   const overlay = {
//     position: "fixed",
//     inset: 0,
//     background:
//       "linear-gradient(180deg, rgba(2,6,23,0.5) 0%, rgba(2,6,23,0.6) 100%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 2000,
//     padding: "1rem",
//     WebkitOverflowScrolling: "touch",
//     backdropFilter: "blur(3px)",
//   };

//   const closeButtonStyle = {
//     position: "absolute",
//     top: "0.6rem",
//     right: "0.6rem",
//     background: "none",
//     border: "none",
//     fontSize: "1.4rem",
//     cursor: "pointer",
//     color: colors.textSecondary,
//     width: "36px",
//     height: "36px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: "50%",
//     zIndex: 10,
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
//         @keyframes slideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

//         .registration-modal-container {
//           width: 100%;
//           max-width: 900px;
//           /* Adjust height behavior for content */
//           min-height: 400px;
//           max-height: calc(100vh - 48px);
//           overflow: auto;
//           -webkit-overflow-scrolling: touch;
//           border-radius: 14px;
//           box-shadow: 0 20px 60px rgba(2,6,23,0.45);
//           display: grid;
//           /* Split layout: Image Left, Content Right */
//           grid-template-columns: 40% 1fr;
//           gap: 1.25rem;
//           padding: 1.15rem;
//           background: ${colors.card};
//           position: relative;
//           animation: slideUp 0.22s ease-in-out;
//         }

//         .registration-left-panel {
//           border-radius: 10px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: ${colors.backgroundAlt};
//           overflow: hidden;
//           height: 100%;
//           min-height: 300px;
//         }

//         .registration-right-panel {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           padding: 2rem 1rem;
//           color: ${colors.text};
//         }

//         .closed-icon {
//           font-size: 4rem;
//           margin-bottom: 1.5rem;
//           color: #ef4444; /* Red color for alert/closed status */
//           background: #ef444415;
//           width: 100px;
//           height: 100px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//         }

//         .closed-title {
//           font-size: 2rem;
//           font-weight: 700;
//           margin-bottom: 1rem;
//           color: ${colors.text};
//         }

//         .closed-message {
//           font-size: 1.1rem;
//           line-height: 1.6;
//           color: ${colors.textSecondary};
//           margin-bottom: 2rem;
//           max-width: 400px;
//         }

//         .ok-btn {
//           padding: 0.75rem 2.5rem;
//           background: ${colors.primary};
//           color: ${colors.buttonText};
//           border: none;
//           border-radius: 0.5rem;
//           font-weight: 600;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: opacity 0.2s;
//         }

//         .ok-btn:hover {
//           opacity: 0.9;
//         }

//         /* --- RESPONSIVE BREAKPOINTS --- */

//         @media (max-width: 768px) {
//           .registration-modal-container {
//             grid-template-columns: 1fr; /* Stack vertically */
//             grid-template-rows: auto 1fr;
//             max-width: 500px;
//             gap: 0;
//             padding: 0;
//             overflow: hidden;
//           }

//           .registration-left-panel {
//             min-height: 200px;
//             max-height: 250px;
//             border-radius: 0;
//           }

//           .registration-right-panel {
//             padding: 2rem;
//           }

//           .closed-title {
//             font-size: 1.75rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .registration-modal-container {
//              height: auto;
//              max-height: 90vh;
//              border-radius: 12px;
//           }

//           .registration-left-panel {
//              min-height: 180px;
//           }

//           .closed-icon {
//             font-size: 3rem;
//             width: 80px;
//             height: 80px;
//             margin-bottom: 1rem;
//           }

//           .closed-title {
//             font-size: 1.5rem;
//           }
//         }
//       `}</style>

//       <div style={overlay} onClick={onClose}>
//         <div
//           className="registration-modal-container"
//           onClick={(e) => e.stopPropagation()}
//           role="dialog"
//           aria-modal="true"
//         >
//           {/* Close X Button */}
//           <button
//             style={closeButtonStyle}
//             onClick={onClose}
//             className="modal-close-btn"
//             aria-label="Close modal"
//           >
//             ×
//           </button>

//           {/* Left Panel: Image */}
//           <div className="registration-left-panel" aria-hidden={true}>
//             <img
//               src={Img}
//               alt="Gurukul Entrance Test Advertisement"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </div>

//           {/* Right Panel: Closed Message */}
//           <div className="registration-right-panel">
//             <div className="closed-icon">
//               {/* Simple Lock Icon or Stop Icon */}
//               <span>!</span>
//             </div>

//             <h2 className="closed-title">Registrations Closed</h2>

//             <p className="closed-message">
//               Thank you for your interest. The registration period for the
//               entrance test has officially ended.
//               <br />
//               <br />
//               <strong>Please wait for the results to be announced.</strong>
//             </p>

//             <button className="ok-btn" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // export default RegistrationModal;
// import React, { useEffect } from "react";
// import { useTheme } from "../context/ThemeContext";
// import Img from "../assessts/Add.jpeg";

// const RegistrationModal = ({ isOpen, onClose }) => {
//   const { colors } = useTheme();

//   // Handle Escape key to close
//   useEffect(() => {
//     if (!isOpen) return;
//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   // --- INLINE STYLES ---

//   const overlayStyle = {
//     position: "fixed",
//     inset: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.75)",
//     backdropFilter: "blur(4px)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 9999,
//     padding: "1rem", // Padding ensures modal doesn't touch screen edges
//   };

//   const closeBtnStyle = {
//     position: "absolute",
//     top: "0.8rem",
//     right: "0.8rem",
//     background: "rgba(0, 0, 0, 0.15)", // Slightly darker for visibility on light images
//     border: "none",
//     color: colors.text,
//     width: "36px",
//     height: "36px",
//     borderRadius: "50%",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "1.5rem",
//     transition: "background 0.2s ease",
//     zIndex: 50, // High z-index to stay above image
//     backdropFilter: "blur(2px)",
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes modalPop {
//           0% { opacity: 0; transform: scale(0.96) translateY(15px); }
//           100% { opacity: 1; transform: scale(1) translateY(0); }
//         }

//         .info-modal-container {
//           width: 100%;
//           max-width: 900px;
//           background: ${colors.card};
//           border-radius: 16px;
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
//           display: grid;
//           grid-template-columns: 1fr 1fr; /* Desktop: 50% Image, 50% Text */
//           position: relative;

//           /* IMPORTANT: This controls the main scroll behavior */
//           max-height: 90vh; /* Don't exceed 90% of screen height */
//           overflow-y: auto; /* Scroll internally if content is too big */

//           animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
//         }

//         /* Customize Scrollbar for the modal */
//         .info-modal-container::-webkit-scrollbar {
//           width: 8px;
//         }
//         .info-modal-container::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .info-modal-container::-webkit-scrollbar-thumb {
//           background-color: rgba(0, 0, 0, 0.2);
//           border-radius: 4px;
//         }

//         /* --- LEFT SIDE: IMAGE --- */
//         .modal-image-wrapper {
//           background-color: ${colors.backgroundAlt};
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//           /* Sticky prevents the image from disappearing when scrolling text on Desktop */
//           position: sticky;
//           top: 0;
//           height: 100%;
//           min-height: 400px;
//         }

//         .modal-image-wrapper img {
//           width: 100%;
//           height: 100%;
//           object-fit: contain; /* Keeps ratio on desktop */
//           max-height: 80vh; /* Limits image height on desktop */
//         }

//         /* --- RIGHT SIDE: CONTENT --- */
//         .modal-content-wrapper {
//           padding: 3rem 2.5rem;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           color: ${colors.text};
//         }

//         .status-badge {
//           display: inline-block;
//           background: ${colors.primary}15;
//           color: ${colors.primary};
//           font-size: 0.8rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 1.2px;
//           padding: 0.5rem 1rem;
//           border-radius: 50px;
//           margin-bottom: 1.5rem;
//           align-self: flex-start;
//         }

//         .modal-heading {
//           font-size: 2.2rem;
//           font-weight: 800;
//           margin: 0 0 1rem 0;
//           line-height: 1.1;
//           color: ${colors.text};
//         }

//         .modal-text {
//           font-size: 1.05rem;
//           line-height: 1.6;
//           color: ${colors.textSecondary};
//           margin-bottom: 2rem;
//         }

//         .info-box {
//           background: ${colors.backgroundAlt};
//           border-left: 5px solid ${colors.primary};
//           padding: 1.2rem;
//           border-radius: 6px;
//           margin-bottom: 2.5rem;
//         }

//         .info-box-text {
//           font-size: 0.95rem;
//           color: ${colors.text};
//           font-weight: 500;
//         }

//         .modal-btn-primary {
//           background: ${colors.primary};
//           color: ${colors.buttonText};
//           border: none;
//           padding: 1rem 2.5rem;
//           font-size: 1rem;
//           font-weight: 600;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           box-shadow: 0 4px 15px ${colors.primary}40;
//         }

//         .modal-btn-primary:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px ${colors.primary}60;
//           opacity: 0.95;
//         }

//         /* --- RESPONSIVE MOBILE BREAKPOINT --- */
//         @media (max-width: 768px) {
//           .info-modal-container {
//             /* Switch to a vertical stack */
//             display: flex;
//             flex-direction: column;

//             /* Ensure the modal fits inside the screen but allows scrolling */
//             max-height: 85vh;
//             width: 100%;
//           }

//           .modal-image-wrapper {
//             /* Reset sticky positioning for mobile so it flows normally */
//             position: relative;
//             min-height: auto;
//             height: auto;
//             width: 100%;
//             background: transparent;
//             padding: 0;
//           }

//           .modal-image-wrapper img {
//             /* Restore natural aspect ratio */
//             width: 100%;
//             height: auto;
//             max-height: none; /* Allow image to be as tall as needed */
//             object-fit: contain;
//             display: block; /* Remove bottom whitespace */
//           }

//           .modal-content-wrapper {
//             padding: 1.5rem;
//             /* Content flows naturally below image */
//           }

//           .modal-heading {
//             font-size: 1.75rem;
//           }

//           .modal-btn-primary {
//             width: 100%;
//           }

//           .close-btn-mobile-adjust {
//             background: rgba(255, 255, 255, 0.8); /* Lighter bg for mobile image overlap */
//             color: #000;
//           }
//         }
//       `}</style>

//       <div style={overlayStyle} onClick={onClose}>
//         <div
//           className="info-modal-container"
//           onClick={(e) => e.stopPropagation()}
//           role="dialog"
//           aria-modal="true"
//         >
//           {/* Close Button */}
//           <button
//             style={closeBtnStyle}
//             onClick={onClose}
//             className="modal-close-btn close-btn-mobile-adjust"
//             aria-label="Close"
//           >
//             ✕
//           </button>

//           {/* Image Section */}
//           {/* <div className="modal-image-wrapper">
//             <img src={Img} alt="Gurukul Announcement" />
//           </div> */}

//           {/* Content Section */}
//           <div className="modal-content-wrapper">
//             <span className="status-badge">Announcement</span>

//             <h2 className="modal-heading">Registrations are now closed</h2>

//             <p className="modal-text">
//               We appreciate your interest! The registration window for this
//               academic session has officially ended.{" "}
//               <b>Result Coming Soon...</b>
//             </p>
//             {/*
//             <div className="info-box">
//               <div className="info-box-text">
//                 <strong>What happens next?</strong>
//                 <br />
//                 We are currently processing applications. Please stay tuned for
//                 the results which will be announced soon.
//               </div>
//             </div> */}
//             {/*
//             <button className="modal-btn-primary" onClick={onClose}>
//               Wait for Results
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RegistrationModal;
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ResultPDF from "../assessts/result.pdf";
import Confetti from "react-confetti";

const RegistrationModal = ({ isOpen, onClose }) => {
  const { colors } = useTheme();

  // State for window size to ensure confetti covers the whole screen
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handle Window Resize for Confetti
  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", detectSize);
    return () => window.removeEventListener("resize", detectSize);
  }, []);

  // Handle Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // --- INLINE STYLES ---

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "1rem",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "rgba(0, 0, 0, 0.1)",
    border: "none",
    color: colors.text,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    transition: "background 0.2s ease",
    zIndex: 100,
  };

  return (
    <>
      <style>{`
        @keyframes modalPop {
          0% { opacity: 0; transform: scale(0.96) translateY(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .info-modal-container {
          width: 100%;
          max-width: 1000px;
          height: 90vh;
          background: ${colors.card};
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10000; /* Ensure modal is above confetti layer if needed */
        }

        /* --- HEADER SECTION --- */
        .modal-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid ${colors.text}20;
          background: ${colors.card};
          flex-shrink: 0;
          
          /* FLEX ROW LAYOUT */
          display: flex;
          flex-direction: row; 
          align-items: center;
          gap: 1rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #4caf50; /* Green for success */
          color: white;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          white-space: nowrap; /* Prevent breaking */
        }

        .modal-heading {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
          color: ${colors.text};
          line-height: 1;
        }

        /* --- PDF SECTION --- */
        .pdf-container {
          flex-grow: 1;
          width: 100%;
          background: #525659;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .pdf-fallback {
            color: white;
            text-align: center;
            padding: 2rem;
        }

        /* --- FOOTER / ACTIONS --- */
        .modal-footer {
            padding: 1rem 2rem;
            background: ${colors.backgroundAlt};
            border-top: 1px solid ${colors.text}10;
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            flex-shrink: 0;
        }

        .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            font-size: 0.9rem;
            transition: transform 0.1s ease;
        }

        .btn-secondary {
            background: transparent;
            color: ${colors.textSecondary};
            border: 1px solid ${colors.text}30;
        }
        
        .btn-primary {
            background: ${colors.primary};
            color: ${colors.buttonText};
            border: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 768px) {
          .info-modal-container {
            height: 95vh;
            max-width: 100%;
          }
          .modal-header {
            padding: 1rem;
            flex-wrap: wrap; /* Allow wrap on very small screens to prevent overflow */
          }
          .modal-heading {
            font-size: 1.2rem;
          }
          .status-badge {
            font-size: 0.7rem;
            padding: 0.3rem 0.6rem;
          }
          .modal-footer {
            padding: 1rem;
            justify-content: space-between;
          }
        }
      `}</style>

      {/* Confetti Component - Runs on Mount */}
      {isOpen && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false} // false = runs once then stops (like a burst)
          numberOfPieces={1000} // High number for big effect
          gravity={0.18} // Speed of fall
          style={{ position: "fixed", top: 0, left: 0, zIndex: 10001 }}
        />
      )}

      <div style={overlayStyle} onClick={onClose}>
        <div
          className="info-modal-container"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button style={closeBtnStyle} onClick={onClose} aria-label="Close">
            ✕
          </button>

          {/* Header: Row Layout */}
          <div className="modal-header">
            <span className="status-badge">Official Result</span>
            <h2 className="modal-heading">Entrance Exam Results</h2>
          </div>

          {/* PDF Viewer */}
          <div className="pdf-container">
            <iframe
              src={`${ResultPDF}#toolbar=0&navpanes=0&scrollbar=0`}
              title="Result PDF"
              type="application/pdf"
            >
              <div className="pdf-fallback">
                <p>Your browser does not support viewing PDFs directly.</p>
                <a
                  href={ResultPDF}
                  download="Result.pdf"
                  className="btn btn-primary"
                  style={{ display: "inline-block", marginTop: "10px" }}
                >
                  Download PDF
                </a>
              </div>
            </iframe>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <a
              href={ResultPDF}
              download="Result.pdf"
              className="btn btn-primary"
            >
              <span>Download Result</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationModal;