import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import * as XLSX from "xlsx";
import Swal from "sweetalert2"; // <-- ADDED: SweetAlert2 import
import "sweetalert2/dist/sweetalert2.min.css"; // <-- ADDED: SweetAlert2 styles
import logo from "../../src/assessts/logo-gurukul.png";

const API_URL =
  process.env.REACT_APP_API_URL || "https://gurukulschools.org/api";
// Helper function to convert relative image URLs to absolute URLs
const getImageUrl = (url) => {
  if (!url || url.trim() === "") return null;
  // If it's already a full URL (starts with http:// or https://), return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  // If it's a relative URL starting with /uploads/, prepend the live API domain
  if (url.startsWith("/uploads/")) {
    return `https://gurukulschools.org/api${url}`;
  }
  // If it's a data URL (base64), return as is
  if (url.startsWith("data:")) {
    return url;
  }
  // Otherwise, assume it's a relative URL and prepend API_URL
  return url.startsWith("/") ? `${API_URL}${url}` : `${API_URL}/${url}`;
};

// --- EMPTY DATA STRUCTURE FOR INITIAL POST (NO DUMMY DATA) ---
const DEFAULT_WEBSITE_DATA = {
  heroSlides: [],
  about: { shortInfo: "", vision: "", mission: "" },
  management: [],
  homeResults: {},
  circulars: [],
  events: [],
  gallery: { festivals: [], achievements: [], sports: [], activities: [] },
  units: [],
  contact: { email: "", whatsapp: "" },
  socialMedia: { facebook: "", instagram: "", youtube: "" },
};

// --- STYLES (minified for brevity) ---
const styles = {
  container: {
    fontFamily: "'Poppins',sans-serif",
    color: "#334155",
    backgroundColor: "#f1f5f9",
  },
  loginWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  dashboardWrapper: {
    display: "flex",
    minHeight: "100vh",
    position: "relative",
  },
  loginBox: {
    width: "100%",
    maxWidth: "400px",
    padding: "3rem 2rem",
    backgroundColor: "white",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    margin: "1rem",
    boxSizing: "border-box",
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#1e293b",
    color: "#cbd5e1",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100%",
    zIndex: 120,
    top: 0,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  },
  sidebarHeader: {
    padding: "0.2rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: "1px solid #334155",
    marginBottom: "1rem",
  },
  sidebarLogoContainer: {
    width: 140,
    height: 70,
    backgroundColor: "white",
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 140,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  sidebarLogoImage: { width: "80%", height: "auto", objectFit: "contain" },
  sidebarTitle: {
    color: "white",
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  sidebarNav: { flex: 1, padding: "0 0 1rem 0", overflowY: "auto" },
  sidebarLink: {
    display: "block",
    color: "#e2e8f0",
    textDecoration: "none",
    padding: "1rem 1.5rem",
    margin: "0.25rem 1rem",
    borderRadius: "8px",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  sidebarLinkActive: {
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: 600,
  },
  content: {
    flex: 1,
    marginLeft: "260px",
    padding: "2rem 3rem",
    minWidth: 0,
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  contentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #e2e8f0",
    flexWrap: "wrap",
    gap: "1rem",
  },
  hamburgerBtn: {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    zIndex: 130,
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 115,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
    cursor: "pointer",
  },
  mobileOverlayOpen: { opacity: 1, visibility: "visible" },
  h1: { color: "#1e293b", margin: 0 },
  h2: {
    color: "#1e293b",
    borderBottom: "2px solid #0ea5e9",
    paddingBottom: "0.5rem",
    marginTop: "2.5rem",
    marginBottom: "2rem",
  },
  h3: { color: "#1e293b", marginBottom: "1.5rem", fontSize: "1.25rem" },
  subH4: {
    color: "#0369a1",
    marginTop: "2rem",
    marginBottom: "1rem",
    borderTop: "1px solid #e2e8f0",
    paddingTop: "1.5rem",
    fontSize: "1.1rem",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  formGroup: { marginBottom: "1.5rem" },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#475569",
    fontWeight: 500,
  },
  input: {
    width: "calc(100% - 1.6rem)",
    padding: "0.75rem",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "1rem",
  },
  textarea: {
    width: "calc(100% - 1.6rem)",
    padding: "0.75rem",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "1rem",
    minHeight: "120px",
    fontFamily: "'Poppins', sans-serif",
  },
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    border: "2px dashed #0ea5e9",
    borderRadius: "8px",
    backgroundColor: "#f0f9ff",
    color: "#0369a1",
    outline: "none",
    transition: "border .24s ease-in-out",
    cursor: "pointer",
    minWidth: 0,
    width: "100%",
    boxSizing: "border-box",
  },
  imagePreviewContainer: {
    width: "150px",
    height: "150px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    marginRight: "1rem",
    flexShrink: 0,
    position: "relative",
    maxWidth: "100%",
  },
  imagePreview: { width: "100%", height: "100%", objectFit: "cover" },
  imagePreviewOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s ease",
    cursor: "pointer",
    textAlign: "center",
  },
  galleryDropzone: {
    padding: "2rem",
    border: "2px dashed #0ea5e9",
    borderRadius: "8px",
    backgroundColor: "#f0f9ff",
    color: "#0369a1",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  galleryPreviewContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "1rem",
  },
  galleryPreviewItem: {
    position: "relative",
    width: "120px",
    height: "120px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  },
  galleryPreviewImage: { width: "100%", height: "100%", objectFit: "cover" },
  galleryRemoveBtn: {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "rgba(239, 68, 68, 0.8)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  mapPreviewContainer: {
    marginTop: "1rem",
    width: "100%",
    height: "300px",
    backgroundColor: "#e2e8f0",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
  },
  mapIframe: { border: 0, borderRadius: "8px", width: "100%", height: "100%" },
  accordionItem: {
    backgroundColor: "white",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    marginBottom: "1rem",
    overflow: "hidden",
  },
  accordionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
    cursor: "pointer",
    backgroundColor: "#f8fafc",
  },
  accordionTitle: { margin: 0, fontSize: "1.1rem", fontWeight: 600 },
  accordionContent: { padding: "1.5rem", borderTop: "1px solid #e2e8f0" },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "0.75rem",
    flexWrap: "wrap",
  },
  listItemInput: { flex: 1, margin: 0 },
  button: {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 600,
  },
  buttonPrimary: { backgroundColor: "#0ea5e9", color: "white" },
  buttonSuccess: { backgroundColor: "#10b981", color: "white" },
  buttonDanger: { backgroundColor: "#ef4444", color: "white" },
  buttonDangerOutline: {
    backgroundColor: "transparent",
    color: "#ef4444",
    border: "1px solid #ef4444",
    padding: "0.25rem 0.75rem",
  },
  buttonAdd: {
    backgroundColor: "#3b82f6",
    color: "white",
    marginTop: "1rem",
    fontSize: "0.9rem",
    padding: "0.5rem 1rem",
  },
  loader: { fontSize: "2rem", color: "#0ea5e9" },
  responsiveStyles: `@media (max-width:1024px){.admin-content{margin-left:0!important;padding:1rem!important}.content-header{flex-direction:column;gap:1rem;align-items:flex-start!important}.content-header h1{font-size:1.25rem}.card{padding:1.5rem!important}.form-group input,.form-group textarea{width:100%!important}.hamburger-btn{display:flex!important}@media (max-width:768px){.card{padding:1rem!important}.h2{font-size:1.5rem!important}.h3{font-size:1.1rem!important}.button{padding:0.5rem 1rem!important;font-size:0.9rem!important}.content-header{flex-direction:column;gap:0.75rem}.content-header>div{width:100%;flex-direction:column;gap:0.5rem}.content-header button{width:100%}.image-preview-container{width:120px!important;height:120px!important}.gallery-preview-item{width:100px!important;height:100px!important}.list-item{flex-direction:column!important;align-items:stretch!important}.list-item-input{width:100%!important}}@media (max-width:480px){.login-box{padding:2rem 1.5rem!important;margin:1rem}.card{padding:0.75rem!important}.h2{font-size:1.25rem!important;margin-top:1.5rem!important}.form-group{margin-bottom:1rem!important}.button{font-size:0.85rem!important;padding:0.5rem 0.75rem!important}.accordion-header{padding:0.75rem 1rem!important}.accordion-content{padding:1rem!important}.sidebar-link{padding:0.75rem 1rem!important;margin:0.25rem 0.5rem!important}}`,
};

// --- API HELPER FUNCTION (With Authentication) ---
const fetchApi = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await axios({
      url: `${API_URL}${endpoint}`,
      method: options.method || "GET",
      data: options.body,
      headers: headers,
    });
    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Unauthorized or Forbidden - clear token and redirect to login
      localStorage.removeItem("accessToken");
      window.location.reload();
    }
    throw error;
  }
};

// --- CHILD COMPONENTS ---
const ImageUploader = ({ cI, oIC, l = "Image" }) => {
  const [p, sP] = useState(cI);
  const [iU, sIU] = useState(!1);
  useEffect(() => {
    sP(cI);
  }, [cI]);
  const uF = useCallback(
    async (f) => {
      if (!f) return;
      sIU(!0);
      try {
        const token = localStorage.getItem("accessToken");
        const fd = new FormData();
        fd.append("file", f);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        const res = await axios.post(
          `${API_URL}/api/admin/media/upload`,
          fd,
          config,
        );
        const uploadedUrl = res.data.url;
        sP(uploadedUrl);
        oIC(uploadedUrl);
      } catch (e) {
        if (e.response?.status === 401) {
          localStorage.removeItem("accessToken");
          window.location.reload();
        } else {
          // --- SWEETALERT CHANGE ---
          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text: e.response?.data?.error || e.message,
          });
        }
        sP(cI);
      } finally {
        sIU(!1);
      }
    },
    [oIC, cI],
  );
  const oD = useCallback(
    (aF) => {
      const f = aF[0];
      if (f) {
        const r = new FileReader();
        r.onloadend = () => sP(r.result);
        r.readAsDataURL(f);
        uF(f);
      }
    },
    [uF],
  );
  const {
    getRootProps: gRP,
    getInputProps: gIP,
    isDragActive: iDA,
  } = useDropzone({
    onDrop: oD,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: !1,
    disabled: iU,
  });
  const imageUrl = getImageUrl(p);
  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>{l}</label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
        className="image-uploader-wrapper"
      >
        <div
          style={styles.imagePreviewContainer}
          {...gRP()}
          className="image-preview-parent"
        >
          {iU ? (
            <div
              style={{
                ...styles.imagePreview,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#0ea5e9" }}>Uploading...</span>
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              style={styles.imagePreview}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          ) : (
            <img
              src="https://via.placeholder.com/150"
              alt="Preview"
              style={styles.imagePreview}
            />
          )}
          <div
            style={{
              ...styles.imagePreviewOverlay,
              cursor: iU ? "not-allowed" : "pointer",
            }}
            className="image-preview-overlay-child"
          >
            Change
          </div>
        </div>
        <div
          {...gRP()}
          style={{
            ...styles.dropzone,
            opacity: iU ? 0.6 : 1,
            cursor: iU ? "not-allowed" : "pointer",
            flex: 1,
            minWidth: "200px",
          }}
        >
          <input {...gIP()} />
          {iU ? (
            <p>Processing...</p>
          ) : iDA ? (
            <p>Drop image...</p>
          ) : (
            <p>Drag 'n' drop or click</p>
          )}
        </div>
      </div>
    </div>
  );
};
const GalleryUploader = ({ cIs, oGC }) => {
  const [p, sP] = useState(cIs || []);
  const [iU, sIU] = useState(!1);
  useEffect(() => {
    sP(cIs || []);
  }, [cIs]);
  const uF = useCallback(
    async (f) => {
      if (f.length === 0) return;
      sIU(!0);
      const token = localStorage.getItem("accessToken");
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      const ps = f.map((file) => {
        const fd = new FormData();
        fd.append("file", file);
        return axios.post(`${API_URL}/api/admin/media/upload`, fd, config);
      });
      try {
        const rs = await Promise.all(ps);
        const nUs = rs.map((r) => r.data.url);
        const uG = [...p, ...nUs];
        sP(uG);
        oGC(uG);
      } catch (e) {
        if (e.response?.status === 401) {
          localStorage.removeItem("accessToken");
          window.location.reload();
        } else {
          // --- SWEETALERT CHANGE ---
          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text:
              "One or more gallery uploads failed: " +
              (e.response?.data?.error || e.message),
          });
        }
      } finally {
        sIU(!1);
      }
    },
    [p, oGC],
  );

  // --- SWEETALERT CHANGE (confirm) ---
  const rI = async (urlToRemove) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      const updatedPreviews = p.filter(
        (previewUrl) => previewUrl !== urlToRemove,
      );
      sP(updatedPreviews);
      oGC(updatedPreviews);
    }
  };
  const { getRootProps: gRP, getInputProps: gIP } = useDropzone({
    onDrop: uF,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    disabled: iU,
  });
  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>Photo Gallery</label>
      <div
        {...gRP()}
        style={{ ...styles.galleryDropzone, opacity: iU ? 0.6 : 1 }}
      >
        <input {...gIP()} />
        {iU ? (
          <p style={styles.loader}>Uploading...</p>
        ) : (
          <p>Drag 'n' drop images here</p>
        )}
      </div>
      {p.length > 0 && (
        <div style={styles.galleryPreviewContainer}>
          {p.map((url, i) => {
            const imageUrl = getImageUrl(url);
            return (
              <div key={i} style={styles.galleryPreviewItem}>
                <img
                  src={imageUrl || "https://via.placeholder.com/120"}
                  alt={`gallery ${i}`}
                  style={styles.galleryPreviewImage}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/120";
                  }}
                />
                <button onClick={() => rI(url)} style={styles.galleryRemoveBtn}>
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
const GoogleMapPreview = ({ eU }) => {
  const iV = eU?.startsWith("https://www.google.com/maps/embed");
  return (
    <div style={styles.mapPreviewContainer}>
      {iV ? (
        <iframe src={eU} style={styles.mapIframe} title="Map Preview"></iframe>
      ) : (
        <p>Enter a valid Embed URL.</p>
      )}
    </div>
  );
};
const AccordionItem = ({ title: t, children: c, onDelete: oD }) => {
  const [iO, sIO] = useState(!0);
  return (
    <div style={styles.accordionItem}>
      <header
        style={{
          ...styles.accordionHeader,
          backgroundColor: iO ? "#e0f2fe" : "#f8fafc",
        }}
        onClick={() => sIO(!iO)}
      >
        <h3
          style={{
            ...styles.accordionTitle,
            color: iO ? "#0284c7" : "#1e293b",
          }}
        >
          {t}
        </h3>
        <div>
          {oD && (
            <button
              style={{
                ...styles.button,
                ...styles.buttonDangerOutline,
                marginRight: "1rem",
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (oD && typeof oD === "function") oD();
              }}
            >
              Delete
            </button>
          )}
          <span
            style={{
              fontSize: "1.5rem",
              transform: iO ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
              display: "inline-block",
            }}
          >
            ▼
          </span>
        </div>
      </header>
      {iO && <div style={styles.accordionContent}>{c}</div>}
    </div>
  );
};

// --- DYNAMIC FORMS BUILDER COMPONENT ---
const DynamicFormBuilder = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || { title: "", description: "", questions: [] },
  );

  const QUESTION_TYPES = [
    { value: "TEXT", label: "Short Text" },
    { value: "PARAGRAPH", label: "Paragraph" },
    { value: "NUMBER", label: "Number" },
    { value: "EMAIL", label: "Email" },
    { value: "MCQ", label: "Multiple Choice (Radio)" },
    { value: "TRUE_FALSE", label: "True / False" },
    { value: "MULTI_SELECT", label: "Checkboxes" },
    { value: "DATE", label: "Date" },
  ];

  const handleAddQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionText: "New Question",
          type: "TEXT",
          options: [],
          isRequired: false,
        },
      ],
    }));
  };

  const handleUpdateQuestion = (index, field, value) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleDeleteQuestion = (index) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions.splice(index, 1);
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleAddOption = (qIndex) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[qIndex].options = [
        ...(updatedQuestions[qIndex].options || []),
        `Option ${(updatedQuestions[qIndex].options?.length || 0) + 1}`,
      ];
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleUpdateOption = (qIndex, optIndex, value) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      const updatedOptions = [...updatedQuestions[qIndex].options];
      updatedOptions[optIndex] = value;
      updatedQuestions[qIndex].options = updatedOptions;
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleDeleteOption = (qIndex, optIndex) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[qIndex].options.splice(optIndex, 1);
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleSave = () => {
    if (!formData.title) {
      Swal.fire("Validation Error", "Form title is required.", "warning");
      return;
    }
    if (formData.questions.length === 0) {
      Swal.fire(
        "Validation Error",
        "Form must have at least one question.",
        "warning",
      );
      return;
    }

    // Prepare for API format by moving options array to JSON string
    const preparedData = {
      ...formData,
      questions: formData.questions.map((q, idx) => ({
        id: q.id, // Will be undefined/null for new queries
        questionText: q.questionText,
        type: q.type,
        options:
          q.options && q.options.length > 0 ? JSON.stringify(q.options) : null,
        isRequired: q.isRequired,
        orderIndex: idx,
      })),
    };

    onSave(preparedData);
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.h3}>
        {initialData?.id ? "Edit Dynamic Form" : "Create New Dynamic Form"}
      </h3>
      <div style={styles.formGroup}>
        <label style={styles.label}>Form Title *</label>
        <input
          type="text"
          style={styles.input}
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Admission Form 2024"
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          style={{ ...styles.textarea, minHeight: "80px" }}
          value={formData.description || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Please fill out this form to apply..."
          rows="2"
        />
      </div>

      <h4 style={styles.subH4}>Questions ({formData.questions.length})</h4>

      {formData.questions.map((q, qIndex) => (
        <div
          key={qIndex}
          style={{
            ...styles.card,
            border: "1px solid #e2e8f0",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <strong style={{ color: "#334155" }}>Question {qIndex + 1}</strong>
            <button
              onClick={() => handleDeleteQuestion(qIndex)}
              style={{
                ...styles.button,
                ...styles.buttonDangerOutline,
                padding: "0.25rem 0.5rem",
                fontSize: "0.8rem",
              }}
            >
              Delete Question
            </button>
          </div>

          <div style={styles.formGroup}>
            <input
              type="text"
              style={styles.input}
              value={q.questionText}
              onChange={(e) =>
                handleUpdateQuestion(qIndex, "questionText", e.target.value)
              }
              placeholder="Question Text"
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "200px" }}>
              <label style={styles.label}>Type</label>
              <select
                style={{ ...styles.input, backgroundColor: "white" }}
                value={q.type}
                onChange={(e) =>
                  handleUpdateQuestion(qIndex, "type", e.target.value)
                }
              >
                {QUESTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                paddingBottom: "0.75rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                <input
                  type="checkbox"
                  checked={q.isRequired}
                  onChange={(e) =>
                    handleUpdateQuestion(qIndex, "isRequired", e.target.checked)
                  }
                />
                Required Question
              </label>
            </div>
          </div>

          {(q.type === "MCQ" || q.type === "MULTI_SELECT") && (
            <div
              style={{
                background: "#f8fafc",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <label style={styles.label}>Options</label>
              {(q.options || []).map((opt, optIndex) => (
                <div
                  key={optIndex}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>○</span>
                  <input
                    type="text"
                    style={{ ...styles.input, padding: "0.5rem", flex: 1 }}
                    value={opt}
                    onChange={(e) =>
                      handleUpdateOption(qIndex, optIndex, e.target.value)
                    }
                    placeholder={`Option ${optIndex + 1}`}
                  />
                  <button
                    onClick={() => handleDeleteOption(qIndex, optIndex)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      padding: "0 0.5rem",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddOption(qIndex)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0ea5e9",
                  cursor: "pointer",
                  fontWeight: "500",
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                + Add Option
              </button>
            </div>
          )}
        </div>
      ))}

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={handleAddQuestion}
          style={{
            ...styles.button,
            background: "#f1f5f9",
            color: "#0f172a",
            border: "1px dashed #cbd5e1",
          }}
        >
          + Add Question
        </button>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={onCancel}
            style={{
              ...styles.button,
              background: "#e2e8f0",
              color: "#475569",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{ ...styles.button, ...styles.buttonPrimary }}
          >
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
};

// --- LOGIN COMPONENT ---
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        onLogin();
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.response?.data || "Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.loginWrapper}>
      <div style={styles.loginBox}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={styles.sidebarLogoContainer}>
            <img src={logo} alt="Logo" style={styles.sidebarLogoImage} />
          </div>
          <h1
            style={{ ...styles.h1, marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            GURUKUL
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Admin Portal</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                borderRadius: "6px",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...styles.buttonPrimary,
              width: "100%",
              marginTop: "1rem",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f0f9ff",
            borderRadius: "6px",
            fontSize: "0.85rem",
            color: "#0369a1",
          }}
        >
          <strong>Default Credentials:</strong>
          <br />
          Username: <code>myuser@gmail.com</code>
          <br />
          Password: <code>Gurukul@123</code>
        </div> */}
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD & LOGIC ---
const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  const [dataExists, setDataExists] = useState(false);
  const [activeView, setActiveView] = useState("general");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [studentRegistrations, setStudentRegistrations] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // --- DYNAMIC FORMS STATE ---
  const [forms, setForms] = useState([]);
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [formResponses, setFormResponses] = useState({});
  const [viewingResponsesFor, setViewingResponsesFor] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  // Responsive screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);

      // Auto-close sidebar on mobile when resizing to mobile
      if (width < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const sidebarLinks = [
    { key: "general", label: "General Settings" },
    { key: "hero", label: "Hero Slides" },
    { key: "about", label: "About & Leadership" },
    { key: "homeResults", label: "Home Results" },
    { key: "circulars", label: "Circulars" },
    { key: "events", label: "Events" },
    { key: "gallery", label: "Gallery" },
    { key: "units", label: "Academic Units" },
    { key: "inquiries", label: "Admission Inquiries" },
    { key: "studentRegistrations", label: "Student Registrations" },
    { key: "forms", label: "Dynamic Forms" }, // ADDED DYNAMIC FORMS
    { key: "contact", label: "Contact & Social" },
  ];

  const checkAndFetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Checking if website data exists...");
      const status = await fetchApi("/api/admin/website-data/exists");
      console.log("Data existence status:", status);

      if (status.exists) {
        setDataExists(true);
        console.log("Fetching website data...");
        const fetchedData = await fetchApi("/api/admin/website-data");
        console.log("Raw fetched data:", fetchedData);
        // Ensure all required fields exist with defaults
        // Normalize data to ensure all fields exist with proper structure (matching AppDataDTO)
        const normalizedData = {
          heroSlides: Array.isArray(fetchedData.heroSlides)
            ? fetchedData.heroSlides.map((s) => ({
                id: s.id || null,
                title: s.title || "",
                subtitle: s.subtitle || "",
                image: s.image || s.imageUrl || "",
              }))
            : [],
          about: fetchedData.about
            ? {
                shortInfo: fetchedData.about.shortInfo || "",
                vision: fetchedData.about.vision || "",
                mission: fetchedData.about.mission || "",
              }
            : { shortInfo: "", vision: "", mission: "" },
          management: Array.isArray(fetchedData.management)
            ? fetchedData.management.map((m) => ({
                id: m.id || null,
                name: m.name || "",
                title: m.title || "",
                photo: m.photo || m.photoUrl || "",
              }))
            : [],
          homeResults:
            fetchedData.homeResults &&
            typeof fetchedData.homeResults === "object"
              ? fetchedData.homeResults
              : {},
          circulars: Array.isArray(fetchedData.circulars)
            ? fetchedData.circulars.map((c) => ({
                id: c.id || null,
                subject: c.subject || "",
                date: c.date || "",
                unit: c.unit || "",
              }))
            : [],
          events: Array.isArray(fetchedData.events)
            ? fetchedData.events.map((e) => ({
                id: e.id || null,
                name: e.name || "",
                image: e.image || e.imageUrl || "",
              }))
            : [],
          gallery:
            fetchedData.gallery && typeof fetchedData.gallery === "object"
              ? {
                  festivals: Array.isArray(fetchedData.gallery.festivals)
                    ? fetchedData.gallery.festivals
                    : [],
                  achievements: Array.isArray(fetchedData.gallery.achievements)
                    ? fetchedData.gallery.achievements
                    : [],
                  sports: Array.isArray(fetchedData.gallery.sports)
                    ? fetchedData.gallery.sports
                    : [],
                  activities: Array.isArray(fetchedData.gallery.activities)
                    ? fetchedData.gallery.activities
                    : [],
                }
              : { festivals: [], achievements: [], sports: [], activities: [] },
          units: Array.isArray(fetchedData.units)
            ? fetchedData.units.map((u) => ({
                id: u.id || null,
                unitId: u.unitId || u.unit_id || null,
                name: u.name || "",
                photo: u.photo || u.photoUrl || "",
                principal: u.principal
                  ? {
                      name: u.principal.name || "",
                      photo: u.principal.photo || u.principal.photoUrl || "",
                      message: u.principal.message || "",
                    }
                  : { name: "", photo: "", message: "" },
                features: Array.isArray(u.features) ? u.features : [],
                results: Array.isArray(u.results)
                  ? u.results.map((r) => {
                      // Ensure year is a number, not a string
                      let yearValue = r.year;
                      if (
                        yearValue === null ||
                        yearValue === undefined ||
                        yearValue === ""
                      ) {
                        yearValue = new Date().getFullYear(); // Default to current year
                      } else if (typeof yearValue === "string") {
                        const parsed = parseInt(yearValue, 10);
                        yearValue = isNaN(parsed)
                          ? new Date().getFullYear()
                          : parsed;
                      }
                      return {
                        year: yearValue,
                        details: r.details || "",
                      };
                    })
                  : [],
                circulars: Array.isArray(u.circulars)
                  ? u.circulars.map((c) => ({
                      id: c.id || null,
                      subject: c.subject || "",
                      date: c.date || "",
                      unit: c.unit || u.name || "",
                    }))
                  : [],
                gallery: Array.isArray(u.gallery) ? u.gallery : [],
                contact: u.contact
                  ? {
                      address: u.contact.address || "",
                      mapEmbedUrl: u.contact.mapEmbedUrl || "",
                      phones: Array.isArray(u.contact.phones)
                        ? u.contact.phones
                        : [],
                    }
                  : { address: "", phones: [], mapEmbedUrl: "" },
              }))
            : [],
          contact: fetchedData.contact
            ? {
                email: fetchedData.contact.email || "",
                whatsapp: fetchedData.contact.whatsapp || "",
              }
            : { email: "", whatsapp: "" },
          socialMedia: fetchedData.socialMedia
            ? {
                facebook: fetchedData.socialMedia.facebook || "",
                instagram: fetchedData.socialMedia.instagram || "",
                youtube: fetchedData.socialMedia.youtube || "",
              }
            : { facebook: "", instagram: "", youtube: "" },
        };
        setData(normalizedData);
        console.log("Data normalized and set successfully:", normalizedData);
      } else {
        // No existing data: show editable empty structure (no init prompt)
        setDataExists(true);
        setData(DEFAULT_WEBSITE_DATA);
        console.log("No website data found. Loaded empty editable structure.");
      }
    } catch (error) {
      console.error(
        "Error checking or fetching data:",
        error.response?.data?.message || error.message,
      );
      // Don't show alert for auth errors (401/403) - they're handled by fetchApi redirect
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        // --- SWEETALERT CHANGE ---
        Swal.fire({
          icon: "error",
          title: "Connection Error",
          text: "Could not connect to the server. Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch data if user is authenticated
    if (isAuthenticated) {
      checkAndFetchData();
    }
  }, [isAuthenticated, checkAndFetchData]);

  // Load inquiries when inquiries view is active
  useEffect(() => {
    if (activeView === "inquiries") {
      const loadInquiries = async () => {
        try {
          const response = await fetchApi("/api/admin/inquiries");
          setInquiries(response || []);
        } catch (error) {
          console.error("Error loading inquiries:", error);
          setInquiries([]);
        }
      };
      loadInquiries();
    }
  }, [activeView]);

  // Load student registrations when student registrations view is active
  useEffect(() => {
    if (activeView === "studentRegistrations") {
      const loadStudentRegistrations = async () => {
        try {
          const response = await fetchApi("/api/admin/student-registrations");
          setStudentRegistrations(response || []);
        } catch (error) {
          console.error("Error loading student registrations:", error);
          setStudentRegistrations([]);
        }
      };
      loadStudentRegistrations();
    }
  }, [activeView]);

  // --- DYNAMIC FORMS LOAD DATA ---
  useEffect(() => {
    if (activeView === "forms") {
      loadForms();
    }
  }, [activeView]);

  const loadForms = async () => {
    try {
      const response = await fetchApi("/api/admin/forms");
      const mappedForms = (response || []).map((form) => ({
        ...form,
        questions: (form.questions || []).map((q) => {
          let parsedOptions = [];
          try {
            if (q.options) parsedOptions = JSON.parse(q.options);
          } catch (e) {
            console.error("Could not parse options", e);
          }
          return {
            ...q,
            questionText: q.text,
            options: parsedOptions,
          };
        }),
      }));
      setForms(mappedForms);
    } catch (error) {
      console.error("Error loading forms:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load dynamic forms.",
      });
      setForms([]);
    }
  };

  const loadFormResponses = async (formId) => {
    try {
      const response = await fetchApi(`/api/admin/forms/${formId}/responses`);
      setFormResponses((prev) => ({ ...prev, [formId]: response || [] }));
    } catch (error) {
      console.error(`Error loading responses for form ${formId}:`, error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load form responses.",
      });
    }
  };

  const handleInitializeData = async () => {
    // --- SWEETALERT CHANGE (confirm) ---
    const result = await Swal.fire({
      title: "Initialize Data?",
      text: "This will create the initial website data structure. Proceed?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, initialize it!",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);
    try {
      await fetchApi("/api/admin/website-data", {
        method: "POST",
        body: DEFAULT_WEBSITE_DATA,
      });
      // --- SWEETALERT CHANGE ---
      Swal.fire(
        "Initialized!",
        "Website data initialized successfully!",
        "success",
      );
      checkAndFetchData();
    } catch (error) {
      // --- SWEETALERT CHANGE ---
      Swal.fire("Error!", "Failed to initialize data.", "error");
      setIsLoading(false);
    }
  };

  const handleDeleteData = async () => {
    // --- SWEETALERT CHANGE (confirm with input) ---
    const { value: confirmText } = await Swal.fire({
      title: "Are you absolutely sure?",
      html: `This action cannot be undone. This will permanently <b>delete all website data</b>.<br/><br/>Please type <strong>DELETE</strong> to confirm.`,
      icon: "warning",
      input: "text",
      inputPlaceholder: "DELETE",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ef4444",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (value !== "DELETE") {
          return "You must type DELETE to confirm!";
        }
      },
    });

    if (confirmText !== "DELETE") return;

    setIsLoading(true);
    try {
      await fetchApi("/api/admin/website-data", { method: "DELETE" });
      // --- SWEETALERT CHANGE ---
      Swal.fire("Deleted!", "Website data has been reset.", "success");
      setData(null);
      setDataExists(false);
    } catch (error) {
      // --- SWEETALERT CHANGE ---
      Swal.fire("Error!", "Failed to delete data.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const normalizeDataBeforeSave = (dataToSave) => {
    const normalized = JSON.parse(JSON.stringify(dataToSave));

    // Normalize unit results - ensure year is a number
    if (normalized.units && Array.isArray(normalized.units)) {
      normalized.units.forEach((unit) => {
        if (unit.results && Array.isArray(unit.results)) {
          unit.results.forEach((result) => {
            // Convert year string to number
            if (result.year !== null && result.year !== undefined) {
              if (typeof result.year === "string") {
                const parsed = parseInt(result.year.trim(), 10);
                result.year = isNaN(parsed) ? new Date().getFullYear() : parsed;
              } else if (typeof result.year === "number") {
                result.year = Math.floor(result.year); // Ensure it's an integer
              }
            }
          });
        }
      });
    }

    return normalized;
  };

  const handleSaveChanges = async () => {
    // --- SWEETALERT CHANGE (confirm) ---
    const result = await Swal.fire({
      title: "Save Changes?",
      text: "Save all changes to the website?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    });
    if (!result.isConfirmed) return;

    setIsSaving(true);
    try {
      const normalizedData = normalizeDataBeforeSave(data);
      const res = await fetchApi("/api/admin/website-data", {
        method: "PUT",
        body: normalizedData,
      });
      // --- SWEETALERT CHANGE ---
      Swal.fire(
        "Saved!",
        res.message || "Changes saved successfully!",
        "success",
      );
      await checkAndFetchData();
    } catch (error) {
      console.error("Save error:", error);
      const errorMsg =
        error.response?.data?.message || error.message || "Unknown error";
      // --- SWEETALERT CHANGE ---
      Swal.fire("Save Error", "Failed to save changes: " + errorMsg, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNestedChange = (path, value) =>
    setData((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      let c = n;
      path
        .split(".")
        .slice(0, -1)
        .forEach((k) => (c = c[k]));
      c[path.split(".").pop()] = value;
      return n;
    });
  const handleSubArrayChange = (path, i, val) =>
    setData((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      let a = n;
      path.split(".").forEach((k) => (a = a[k]));
      a[i] = val;
      return n;
    });
  const handleSubArrayObjectChange = (path, i, f, val) =>
    setData((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      let a = n;
      path.split(".").forEach((k) => (a = a[k]));
      a[i][f] = val;
      return n;
    });
  const handleAddItemToSubArray = (path, item) =>
    setData((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      let a = n;
      path.split(".").forEach((k) => (a = a[k]));
      a.push(item);
      return n;
    });

  // --- SWEETALERT CHANGE (confirm) ---
  const handleRemoveItemFromSubArray = async (path, i) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setData((prev) => {
        const n = JSON.parse(JSON.stringify(prev));
        let a = n;
        path.split(".").forEach((k) => (a = a[k]));
        a.splice(i, 1);
        return n;
      });
      Swal.fire("Deleted!", "The item has been deleted.", "success");
    }
  };

  const handleDownloadExcel = () => {
    if (studentRegistrations.length === 0) {
      // --- SWEETALERT CHANGE ---
      Swal.fire({
        icon: "info",
        title: "No Data",
        text: "There is no student registration data to download.",
      });
      return;
    }
    const dataToExport = studentRegistrations.map((reg) => ({
      "Registration Date": new Date(reg.createdAt).toLocaleDateString(),
      "Student Name": reg.studentName,
      "Mobile Number": reg.mobileNumber,
      "Email ID": reg.emailId,
      Branch: reg.branch,
      "School Name": reg.schoolName,
      City: reg.villageOrCity,
      "Last Exam %": reg.lastExamPercentage,
      "Interested For": reg.interestedFor,
      Address: reg.address,
      Processed: reg.isProcessed ? "Yes" : "No",
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, "Student_Registrations.xlsx");
  };

  // --- DYNAMIC FORMS HANDLERS ---
  const handlePublishForm = async (formId) => {
    try {
      const result = await Swal.fire({
        title: "Publish Form?",
        text: "Publishing this form will display it on the website popup and hide any previously published form. Proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, publish it!",
      });

      if (result.isConfirmed) {
        setIsLoading(true);
        await fetchApi(`/api/admin/forms/${formId}/publish`, {
          method: "POST",
        });
        await loadForms();
        Swal.fire(
          "Published!",
          "The form is now live on the website popup.",
          "success",
        );
      }
    } catch (error) {
      console.error("Error publishing form:", error);
      Swal.fire("Error", "Failed to publish form.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteForm = async (formId) => {
    try {
      const result = await Swal.fire({
        title: "Delete Form?",
        text: "Are you sure you want to delete this form entirely? All questions and responses will be lost permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setIsLoading(true);
        await fetchApi(`/api/admin/forms/${formId}`, { method: "DELETE" });
        await loadForms();
        Swal.fire("Deleted!", "The form has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      Swal.fire("Error", "Failed to delete form.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadFormResponsesExcel = (form) => {
    const responses = formResponses[form.id] || [];
    if (responses.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Responses",
        text: "There are no responses for this form to download.",
      });
      return;
    }

    const dataToExport = responses.map((response) => {
      let parsedAnswers = {};
      try {
        parsedAnswers = JSON.parse(response.answers);
      } catch (e) {
        console.error("Could not parse answers.", e);
      }

      return {
        "Submission Date": new Date(response.submittedAt).toLocaleString(),
        ...parsedAnswers,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Form Responses");
    XLSX.writeFile(
      workbook,
      `Responses_${form.title.replace(/\\s+/g, "_")}.xlsx`,
    );
  };

  const handleSaveForm = async (formData) => {
    setIsLoading(true);
    try {
      const isUpdating = !!formData.id;
      const endpoint = isUpdating
        ? `/api/admin/forms/${formData.id}`
        : "/api/admin/forms";
      const method = isUpdating ? "PUT" : "POST";

      const payload = {
        ...formData,
        questions: (formData.questions || []).map((q) => ({
          ...q,
          text: q.questionText,
          options: Array.isArray(q.options)
            ? JSON.stringify(q.options)
            : q.options,
        })),
      };

      await fetchApi(endpoint, {
        method: method,
        body: JSON.stringify(payload),
      });

      Swal.fire("Saved!", "The form has been saved successfully.", "success");
      setIsFormBuilderOpen(false);
      setEditingForm(null);
      await loadForms();
    } catch (error) {
      console.error("Error saving form:", error);
      Swal.fire(
        "Error",
        "Failed to save form. Check console for details.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }
  if (isLoading) {
    return (
      <div style={styles.loginWrapper}>
        <p style={styles.loader}>Loading Dashboard...</p>
      </div>
    );
  }

  const renderActiveView = () => (
    <>
      {activeView === "general" && (
        <div>
          <h2 style={styles.h2}>General Settings</h2>
          <div style={styles.card}>
            <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
              Welcome to the admin panel. Use the sidebar to navigate to
              different sections and manage your website content.
            </p>
            <div
              style={{
                padding: "1.5rem",
                background: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3 style={{ ...styles.h3, marginBottom: "1rem" }}>Quick Info</h3>
              <ul
                style={{
                  color: "#475569",
                  lineHeight: "1.8",
                  paddingLeft: "1.5rem",
                }}
              >
                <li>Manage hero slides, about section, and management team</li>
                <li>Configure home results, circulars, events, and gallery</li>
                <li>Set up academic units with all details</li>
                <li>View admission inquiries</li>
                <li>Update contact and social media information</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {activeView === "hero" && (
        <div>
          <h2 style={styles.h2}>Manage Hero Slides</h2>
          <div style={styles.card}>
            <p style={{ color: "#64748b", marginBottom: "1rem" }}>
              Hero slides appear on the homepage. Add multiple slides to create
              a carousel. Drag and drop to reorder slides.
            </p>
            {data.heroSlides?.length > 0 ? (
              data.heroSlides.map((s, i) => (
                <AccordionItem
                  key={i}
                  title={`Slide ${i + 1}: ${s.title || ""}`}
                  onDelete={() => handleRemoveItemFromSubArray("heroSlides", i)}
                >
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Title</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={s.title || ""}
                      onChange={(e) =>
                        handleSubArrayObjectChange(
                          "heroSlides",
                          i,
                          "title",
                          e.target.value,
                        )
                      }
                      placeholder="Welcome to Gurukul"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Subtitle</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={s.subtitle || ""}
                      onChange={(e) =>
                        handleSubArrayObjectChange(
                          "heroSlides",
                          i,
                          "subtitle",
                          e.target.value,
                        )
                      }
                      placeholder="Your future starts here"
                    />
                  </div>
                  <ImageUploader
                    cI={s.image || ""}
                    oIC={(img) =>
                      handleSubArrayObjectChange("heroSlides", i, "image", img)
                    }
                    l="Slide Background Image"
                  />
                </AccordionItem>
              ))
            ) : (
              <p
                style={{
                  color: "#64748b",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                No hero slides yet. Click "Add Slide" to create your first
                slide.
              </p>
            )}
            <button
              style={{ ...styles.button, ...styles.buttonAdd }}
              onClick={() =>
                handleAddItemToSubArray("heroSlides", {
                  id: null,
                  title: "New Slide",
                  subtitle: "New Subtitle",
                  image: "",
                })
              }
            >
              Add Slide
            </button>
          </div>
        </div>
      )}
      {activeView === "about" && (
        <div>
          <h2 style={styles.h2}>About & Leadership</h2>
          <div style={styles.card}>
            <h3 style={styles.h3}>About Section</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Short Info</label>
              <textarea
                style={styles.textarea}
                value={data.about?.shortInfo || ""}
                onChange={(e) =>
                  handleNestedChange("about.shortInfo", e.target.value)
                }
                placeholder="Provide a brief summary of the Gurukul institution here."
                rows="4"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Vision</label>
              <textarea
                style={styles.textarea}
                value={data.about?.vision || ""}
                onChange={(e) =>
                  handleNestedChange("about.vision", e.target.value)
                }
                placeholder="State the long-term vision."
                rows="4"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Mission</label>
              <textarea
                style={styles.textarea}
                value={data.about?.mission || ""}
                onChange={(e) =>
                  handleNestedChange("about.mission", e.target.value)
                }
                placeholder="Describe the mission and purpose."
                rows="4"
              />
            </div>
          </div>
          <div style={styles.card}>
            <h3 style={styles.h3}>Management Team</h3>
            <p style={{ color: "#64748b", marginBottom: "1rem" }}>
              Add members of the management team. Their photos and information
              will be displayed on the About page.
            </p>
            {data.management?.length > 0 ? (
              [...data.management]
                .sort((a, b) => {
                  const rank = (t) => {
                    const x = (t || "").toLowerCase();
                    if (x.includes("chairman") && !x.includes("vice")) return 1;
                    if (x.includes("vice") && x.includes("chairman")) return 2;
                    return 3;
                  };
                  return rank(a.title) - rank(b.title);
                })
                .map((p, i) => (
                  <AccordionItem
                    key={i}
                    title={`${p.name || "Unnamed"} - ${p.title || ""}`}
                    onDelete={() =>
                      handleRemoveItemFromSubArray("management", i)
                    }
                  >
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Full Name</label>
                      <input
                        type="text"
                        style={styles.input}
                        value={p.name || ""}
                        onChange={(e) =>
                          handleSubArrayObjectChange(
                            "management",
                            i,
                            "name",
                            e.target.value,
                          )
                        }
                        placeholder="Management Person Name"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Title/Position</label>
                      <input
                        type="text"
                        style={styles.input}
                        value={p.title || ""}
                        onChange={(e) =>
                          handleSubArrayObjectChange(
                            "management",
                            i,
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="Director"
                      />
                    </div>
                    <ImageUploader
                      cI={p.photo || ""}
                      oIC={(img) =>
                        handleSubArrayObjectChange(
                          "management",
                          i,
                          "photo",
                          img,
                        )
                      }
                      l="Photo"
                    />
                  </AccordionItem>
                ))
            ) : (
              <p
                style={{
                  color: "#64748b",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                No management members yet. Use quick-add to add Chairman and
                Vice Chairman.
              </p>
            )}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                style={{ ...styles.button, ...styles.buttonAdd }}
                onClick={() =>
                  handleAddItemToSubArray("management", {
                    id: null,
                    name: "",
                    title: "Chairman",
                    photo: "",
                  })
                }
              >
                Add Chairman
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonAdd }}
                onClick={() =>
                  handleAddItemToSubArray("management", {
                    id: null,
                    name: "",
                    title: "Vice Chairman",
                    photo: "",
                  })
                }
              >
                Add Vice Chairman
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonAdd }}
                onClick={() =>
                  handleAddItemToSubArray("management", {
                    id: null,
                    name: "",
                    title: "",
                    photo: "",
                  })
                }
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
      {activeView === "homeResults" && (
        <div>
          <h2 style={styles.h2}>Home Results</h2>
          <div style={styles.card}>
            <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
              Manage academic results displayed on the homepage. Each category
              (e.g., JEE, NEET, CET) can have its own description.
            </p>
            {Object.entries(data.homeResults || {}).map(
              ([category, description], i) => (
                <div
                  key={i}
                  style={{
                    ...styles.card,
                    border: "1px solid #e2e8f0",
                    marginBottom: "1rem",
                    padding: "1.5rem",
                  }}
                >
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Category Name</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={category}
                      onChange={(e) => {
                        const newResults = { ...data.homeResults };
                        delete newResults[category];
                        newResults[e.target.value] = description;
                        setData((prev) => ({
                          ...prev,
                          homeResults: newResults,
                        }));
                      }}
                      placeholder="JEE, NEET, CET, etc."
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                      style={styles.textarea}
                      value={description || ""}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          homeResults: {
                            ...prev.homeResults,
                            [category]: e.target.value,
                          },
                        }));
                      }}
                      placeholder="Result description..."
                      rows="3"
                    />
                  </div>
                  <button
                    style={{ ...styles.button, ...styles.buttonDangerOutline }}
                    onClick={() => {
                      const newResults = { ...data.homeResults };
                      delete newResults[category];
                      setData((prev) => ({ ...prev, homeResults: newResults }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ),
            )}
            <button
              style={{ ...styles.button, ...styles.buttonAdd }}
              // --- SWEETALERT CHANGE (prompt) ---
              onClick={async () => {
                const { value: newCategory } = await Swal.fire({
                  title: "Add New Category",
                  input: "text",
                  inputLabel: "Enter category name (e.g., JEE, NEET):",
                  showCancelButton: true,
                  inputValidator: (value) => {
                    if (!value) {
                      return "You need to enter a category name!";
                    }
                  },
                });

                if (newCategory) {
                  setData((prev) => ({
                    ...prev,
                    homeResults: { ...prev.homeResults, [newCategory]: "" },
                  }));
                }
              }}
            >
              Add Result Category
            </button>
          </div>
        </div>
      )}
      {activeView === "circulars" && (
        <div>
          <h2 style={styles.h2}>Circulars & Notices</h2>
          <div style={styles.card}>
            <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
              Manage circulars and notices. These appear on the homepage and can
              be associated with specific units.
            </p>
            {data.circulars?.map((c, i) => (
              <AccordionItem
                key={i}
                title={`${c.subject || " Circular"} - ${c.unit || "General"}`}
                onDelete={() => handleRemoveItemFromSubArray("circulars", i)}
              >
                <div style={styles.formGroup}>
                  <label style={styles.label}>Subject/Title</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={c.subject || ""}
                    onChange={(e) =>
                      handleSubArrayObjectChange(
                        "circulars",
                        i,
                        "subject",
                        e.target.value,
                      )
                    }
                    placeholder="Circular subject"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Date</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={c.date || ""}
                    onChange={(e) =>
                      handleSubArrayObjectChange(
                        "circulars",
                        i,
                        "date",
                        e.target.value,
                      )
                    }
                    placeholder="MMMM dd, yyyy (e.g., January 15, 2024)"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Unit (Leave empty for general/homepage circular)
                  </label>
                  <input
                    type="text"
                    style={styles.input}
                    value={c.unit || ""}
                    onChange={(e) =>
                      handleSubArrayObjectChange(
                        "circulars",
                        i,
                        "unit",
                        e.target.value,
                      )
                    }
                    placeholder="Unit name or leave blank for homepage"
                  />
                </div>
              </AccordionItem>
            ))}
            <button
              style={{ ...styles.button, ...styles.buttonAdd }}
              onClick={() =>
                handleAddItemToSubArray("circulars", {
                  id: null,
                  subject: "New Circular",
                  date: `${new Date().toLocaleString("default", {
                    month: "long",
                  })} ${new Date().getDate()}, ${new Date().getFullYear()}`,
                  unit: "",
                })
              }
            >
              Add Circular
            </button>
          </div>
        </div>
      )}
      {activeView === "events" && (
        <div>
          <h2 style={styles.h2}>Events & Activities</h2>
          <div style={styles.card}>
            <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
              Manage events and activities displayed on the website. Events can
              be shown or hidden from the homepage.
            </p>
            {data.events?.map((e, i) => (
              <AccordionItem
                key={i}
                title={`${e.name || " Event"}`}
                onDelete={() => handleRemoveItemFromSubArray("events", i)}
              >
                <div style={styles.formGroup}>
                  <label style={styles.label}>Event Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={e.name || ""}
                    onChange={(e) =>
                      handleSubArrayObjectChange(
                        "events",
                        i,
                        "name",
                        e.target.value,
                      )
                    }
                    placeholder="Event name"
                  />
                </div>
                <ImageUploader
                  cI={e.image || ""}
                  oIC={(img) =>
                    handleSubArrayObjectChange("events", i, "image", img)
                  }
                  l="Event Image"
                />
              </AccordionItem>
            ))}
            <button
              style={{ ...styles.button, ...styles.buttonAdd }}
              onClick={() =>
                handleAddItemToSubArray("events", {
                  id: null,
                  name: "New Event",
                  image: "",
                })
              }
            >
              Add Event
            </button>
          </div>
        </div>
      )}
      {activeView === "gallery" && (
        <div>
          <h2 style={styles.h2}>Gallery Management</h2>
          <div style={styles.card}>
            <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
              Organize gallery images by category. These appear on the homepage
              gallery section.
            </p>
            {["festivals", "achievements", "sports", "activities"].map(
              (category) => {
                const categoryImages = data.gallery?.[category] || [];
                return (
                  <div
                    key={category}
                    style={{
                      ...styles.card,
                      border: "1px solid #e2e8f0",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <h3 style={styles.h3}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                      Gallery
                    </h3>
                    <GalleryUploader
                      cIs={categoryImages}
                      oGC={(imgs) => {
                        setData((prev) => ({
                          ...prev,
                          gallery: { ...prev.gallery, [category]: imgs },
                        }));
                      }}
                    />
                  </div>
                );
              },
            )}
          </div>
        </div>
      )}
      {activeView === "units" && (
        <div>
          <h2 style={styles.h2}>Academic Units</h2>
          <div style={styles.card}>
            <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
              Manage academic units (e.g., Science Academy, Commerce Academy).
              Each unit has its own principal, features, results, circulars,
              gallery, and contact information.
            </p>
            {data.units?.map((u, i) => (
              <AccordionItem
                key={u.id || i}
                title={u.name || "(Unit)"}
                onDelete={() => handleRemoveItemFromSubArray("units", i)}
              >
                <div style={styles.formGroup}>
                  <label style={styles.label}>Unit Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={u.name || ""}
                    onChange={(e) =>
                      handleNestedChange(`units.${i}.name`, e.target.value)
                    }
                    placeholder="Academic Unit Name"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Unit ID (URL-friendly identifier, auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    style={styles.input}
                    value={u.unitId || ""}
                    onChange={(e) =>
                      handleNestedChange(`units.${i}.unitId`, e.target.value)
                    }
                    placeholder="science-academy (auto-generated from name)"
                  />
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "0.875rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Used in URLs. Leave empty to auto-generate from unit name.
                  </p>
                </div>
                <ImageUploader
                  cI={u.photo || ""}
                  oIC={(img) => handleNestedChange(`units.${i}.photo`, img)}
                  l="Unit Photo"
                />
                <h4 style={styles.subH4}>Principal Information</h4>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Principal Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={u.principal?.name || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        `units.${i}.principal.name`,
                        e.target.value,
                      )
                    }
                    placeholder="Principal Name"
                  />
                </div>
                <ImageUploader
                  cI={u.principal?.photo || ""}
                  oIC={(img) =>
                    handleNestedChange(`units.${i}.principal.photo`, img)
                  }
                  l="Principal Photo"
                />
                <div style={styles.formGroup}>
                  <label style={styles.label}>Principal Message</label>
                  <textarea
                    style={styles.textarea}
                    value={u.principal?.message || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        `units.${i}.principal.message`,
                        e.target.value,
                      )
                    }
                    placeholder="Message from the principal..."
                    rows="4"
                  />
                </div>
                <h4 style={styles.subH4}>Features</h4>
                {u.features?.map((f, fi) => (
                  <div key={fi} style={styles.listItem}>
                    <input
                      type="text"
                      style={{ ...styles.input, ...styles.listItemInput }}
                      value={f || ""}
                      onChange={(e) =>
                        handleSubArrayChange(
                          `units.${i}.features`,
                          fi,
                          e.target.value,
                        )
                      }
                      placeholder="Feature description"
                    />
                    <button
                      style={{
                        ...styles.button,
                        ...styles.buttonDangerOutline,
                      }}
                      onClick={() =>
                        handleRemoveItemFromSubArray(`units.${i}.features`, fi)
                      }
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  style={{ ...styles.button, ...styles.buttonAdd }}
                  onClick={() =>
                    handleAddItemToSubArray(
                      `units.${i}.features`,
                      "New Feature",
                    )
                  }
                >
                  Add Feature
                </button>
                <h4 style={styles.subH4}>Academic Results</h4>
                {u.results?.map((r, ri) => (
                  <div
                    key={ri}
                    style={{
                      ...styles.card,
                      border: "1px solid #f1f5f9",
                      marginBottom: "1rem",
                    }}
                  >
                    <div style={styles.listItem}>
                      <div style={{ flex: 1 }}>
                        <label style={styles.label}>Year</label>
                        <input
                          type="number"
                          min="2000"
                          max="2100"
                          style={styles.input}
                          value={r.year || ""}
                          onChange={(e) => {
                            const yearValue =
                              e.target.value === ""
                                ? null
                                : parseInt(e.target.value, 10);
                            handleSubArrayObjectChange(
                              `units.${i}.results`,
                              ri,
                              "year",
                              isNaN(yearValue) ? null : yearValue,
                            );
                          }}
                          placeholder="2024"
                        />
                      </div>
                      <div style={{ flex: 2 }}>
                        <label style={styles.label}>Details</label>
                        <input
                          type="text"
                          style={styles.input}
                          value={r.details || ""}
                          onChange={(e) =>
                            handleSubArrayObjectChange(
                              `units.${i}.results`,
                              ri,
                              "details",
                              e.target.value,
                            )
                          }
                          placeholder="Result details"
                        />
                      </div>
                      <button
                        style={{
                          ...styles.button,
                          ...styles.buttonDangerOutline,
                          alignSelf: "flex-end",
                          marginBottom: "1rem",
                        }}
                        onClick={() =>
                          handleRemoveItemFromSubArray(`units.${i}.results`, ri)
                        }
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  style={{ ...styles.button, ...styles.buttonAdd }}
                  onClick={() =>
                    handleAddItemToSubArray(`units.${i}.results`, {
                      year: new Date().getFullYear(),
                      details: "New Result",
                    })
                  }
                >
                  Add Result
                </button>
                <h4 style={styles.subH4}>Unit Circulars</h4>
                {u.circulars?.map((c, ci) => (
                  <div
                    key={ci}
                    style={{
                      ...styles.card,
                      border: "1px solid #f1f5f9",
                      marginBottom: "1rem",
                      padding: "1rem",
                    }}
                  >
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Subject</label>
                      <input
                        type="text"
                        style={styles.input}
                        value={c.subject || ""}
                        onChange={(e) => {
                          const newCirculars = [...u.circulars];
                          newCirculars[ci] = {
                            ...newCirculars[ci],
                            subject: e.target.value,
                          };
                          handleNestedChange(
                            `units.${i}.circulars`,
                            newCirculars,
                          );
                        }}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Date</label>
                      <input
                        type="text"
                        style={styles.input}
                        value={c.date || ""}
                        onChange={(e) => {
                          const newCirculars = [...u.circulars];
                          newCirculars[ci] = {
                            ...newCirculars[ci],
                            date: e.target.value,
                          };
                          handleNestedChange(
                            `units.${i}.circulars`,
                            newCirculars,
                          );
                        }}
                        placeholder="MMMM dd, yyyy"
                      />
                    </div>
                    <button
                      style={{
                        ...styles.button,
                        ...styles.buttonDangerOutline,
                      }}
                      onClick={() => {
                        const newCirculars = u.circulars.filter(
                          (_, idx) => idx !== ci,
                        );
                        handleNestedChange(
                          `units.${i}.circulars`,
                          newCirculars,
                        );
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  style={{ ...styles.button, ...styles.buttonAdd }}
                  onClick={() => {
                    const newCircular = {
                      id: null,
                      subject: "New Circular",
                      date: `${new Date().toLocaleString("default", {
                        month: "long",
                      })} ${new Date().getDate()}, ${new Date().getFullYear()}`,
                      unit: u.name,
                    };
                    handleNestedChange(`units.${i}.circulars`, [
                      ...(u.circulars || []),
                      newCircular,
                    ]);
                  }}
                >
                  Add Circular
                </button>
                <h4 style={styles.subH4}>Gallery</h4>
                <GalleryUploader
                  cIs={u.gallery || []}
                  oGC={(g) => handleNestedChange(`units.${i}.gallery`, g)}
                />
                <h4 style={styles.subH4}>Contact Information</h4>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Address</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={u.contact?.address || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        `units.${i}.contact.address`,
                        e.target.value,
                      )
                    }
                    placeholder="Unit address"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Google Maps Embed URL</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={u.contact?.mapEmbedUrl || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        `units.${i}.contact.mapEmbedUrl`,
                        e.target.value,
                      )
                    }
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                  <GoogleMapPreview eU={u.contact?.mapEmbedUrl} />
                </div>
                {u.contact?.phones?.map((p, pi) => (
                  <div key={pi} style={styles.listItem}>
                    <input
                      type="tel"
                      style={{ ...styles.input, ...styles.listItemInput }}
                      value={p || ""}
                      onChange={(e) =>
                        handleSubArrayChange(
                          `units.${i}.contact.phones`,
                          pi,
                          e.target.value,
                        )
                      }
                      placeholder="+91-9876543210"
                    />
                    <button
                      style={{
                        ...styles.button,
                        ...styles.buttonDangerOutline,
                      }}
                      onClick={() =>
                        handleRemoveItemFromSubArray(
                          `units.${i}.contact.phones`,
                          pi,
                        )
                      }
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  style={{ ...styles.button, ...styles.buttonAdd }}
                  onClick={() =>
                    handleAddItemToSubArray(`units.${i}.contact.phones`, "")
                  }
                >
                  Add Phone
                </button>
              </AccordionItem>
            ))}
            <button
              style={{ ...styles.button, ...styles.buttonAdd }}
              onClick={() =>
                handleAddItemToSubArray("units", {
                  id: null,
                  unitId: null,
                  name: "New Unit",
                  photo: "",
                  principal: { name: "", photo: "", message: "" },
                  features: [],
                  results: [],
                  circulars: [],
                  gallery: [],
                  contact: { address: "", phones: [], mapEmbedUrl: "" },
                })
              }
            >
              Add Unit
            </button>
          </div>
        </div>
      )}
      {activeView === "inquiries" && (
        <div>
          <h2 style={styles.h2}>Admission Inquiries</h2>
          <div style={styles.card}>
            <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
              View all admission inquiries submitted by visitors. These are
              read-only for reference.
            </p>
            {inquiries.length === 0 ? (
              <p
                style={{
                  color: "#64748b",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                No inquiries yet.
              </p>
            ) : (
              <div
                style={{
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  width: "100%",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "600px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "2px solid #e2e8f0",
                      }}
                    >
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Mobile
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Unit
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                        }}
                      >
                        Query
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq, idx) => (
                      <tr
                        key={idx}
                        style={{ borderBottom: "1px solid #e2e8f0" }}
                      >
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            fontWeight: "500",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {inq.name}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <a
                            href={`tel:${inq.mobile}`}
                            style={{ color: "#0ea5e9", textDecoration: "none" }}
                          >
                            {inq.mobile}
                          </a>
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {inq.unitName || "General"}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            maxWidth: "300px",
                            wordWrap: "break-word",
                          }}
                        >
                          {inq.query}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      {activeView === "studentRegistrations" && (
        <div>
          <h2 style={styles.h2}>Student Registrations</h2>
          <div style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <p style={{ color: "#64748b", margin: 0, flex: "1 1 300px" }}>
                View all student registrations submitted through the website.
                These are read-only for reference.
              </p>
              <button
                onClick={handleDownloadExcel}
                style={{ ...styles.button, ...styles.buttonPrimary }}
                disabled={studentRegistrations.length === 0}
              >
                Download Excel
              </button>
            </div>
            {studentRegistrations.length === 0 ? (
              <p
                style={{
                  color: "#64748b",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                No student registrations yet.
              </p>
            ) : (
              <div
                style={{
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  width: "100%",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "1200px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "2px solid #e2e8f0",
                      }}
                    >
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Student Name
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Mobile
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Email
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Branch
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        School
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        City
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Last Exam %
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Interested For
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                        }}
                      >
                        Address
                      </th>
                      {/* <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Processed
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {studentRegistrations.map((reg, idx) => (
                      <tr
                        key={reg.id || idx}
                        style={{ borderBottom: "1px solid #e2e8f0" }}
                      >
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {new Date(reg.createdAt).toLocaleDateString()}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            fontWeight: "500",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reg.studentName || "-"}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <a
                            href={`tel:${reg.mobileNumber}`}
                            style={{ color: "#0ea5e9", textDecoration: "none" }}
                          >
                            {reg.mobileNumber || "-"}
                          </a>
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reg.emailId ? (
                            <a
                              href={`mailto:${reg.emailId}`}
                              style={{
                                color: "#0ea5e9",
                                textDecoration: "none",
                              }}
                            >
                              {reg.emailId}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reg.branch || "-"}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reg.schoolName || "-"}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reg.villageOrCity || "-"}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reg.lastExamPercentage != null
                            ? reg.lastExamPercentage
                            : "-"}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reg.interestedFor || "-"}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            maxWidth: "300px",
                            wordWrap: "break-word",
                          }}
                        >
                          {reg.address || "-"}
                        </td>
                        {/* <td
                          style={{
                            padding: "1rem",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reg.isProcessed ? "Yes" : "No"}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      {activeView === "contact" && (
        <div>
          <h2 style={styles.h2}>Contact & Social Media</h2>
          <div style={styles.card}>
            <h3 style={styles.h3}>Contact Information</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                style={styles.input}
                value={data.contact?.email || ""}
                onChange={(e) =>
                  handleNestedChange("contact.email", e.target.value)
                }
                placeholder="contact@gurukul.com"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>WhatsApp Number</label>
              <input
                type="tel"
                style={styles.input}
                value={data.contact?.whatsapp || ""}
                onChange={(e) =>
                  handleNestedChange("contact.whatsapp", e.target.value)
                }
                placeholder="+91-9876543210"
              />
            </div>
          </div>
          <div style={styles.card}>
            <h3 style={styles.h3}>Social Media Links</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Facebook URL</label>
              <input
                type="url"
                style={styles.input}
                value={data.socialMedia?.facebook || ""}
                onChange={(e) =>
                  handleNestedChange("socialMedia.facebook", e.target.value)
                }
                placeholder="https://facebook.com/gurukul"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Instagram URL</label>
              <input
                type="url"
                style={styles.input}
                value={data.socialMedia?.instagram || ""}
                onChange={(e) =>
                  handleNestedChange("socialMedia.instagram", e.target.value)
                }
                placeholder="https://instagram.com/gurukul"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>YouTube URL</label>
              <input
                type="url"
                style={styles.input}
                value={data.socialMedia?.youtube || ""}
                onChange={(e) =>
                  handleNestedChange("socialMedia.youtube", e.target.value)
                }
                placeholder="https://youtube.com/@gurukul"
              />
            </div>
          </div>
          <div style={styles.card}>
            <h3 style={styles.h3}>Danger Zone</h3>
            <p style={{ color: "#64748b", marginBottom: "1rem" }}>
              Reset all website data to the default template. This action cannot
              be undone.
            </p>
            <button
              onClick={handleDeleteData}
              style={{ ...styles.button, ...styles.buttonDanger }}
            >
              Reset All Website Data
            </button>
          </div>
        </div>
      )}

      {/* DYNAMIC FORMS SECTION */}
      {activeView === "forms" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h2 style={{ ...styles.h2, margin: 0 }}>
              Dynamic Forms Management
            </h2>
            {!isFormBuilderOpen && !viewingResponsesFor && (
              <button
                style={{ ...styles.button, ...styles.buttonPrimary }}
                onClick={() => {
                  setEditingForm(null);
                  setIsFormBuilderOpen(true);
                }}
              >
                + Create New Form
              </button>
            )}
          </div>

          {isFormBuilderOpen ? (
            <DynamicFormBuilder
              initialData={editingForm}
              onSave={handleSaveForm}
              onCancel={() => {
                setIsFormBuilderOpen(false);
                setEditingForm(null);
              }}
            />
          ) : viewingResponsesFor ? (
            <div style={styles.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <h3 style={styles.h3}>
                  Responses: {viewingResponsesFor.title}
                </h3>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    style={{ ...styles.button, ...styles.buttonPrimary }}
                    onClick={() =>
                      handleDownloadFormResponsesExcel(viewingResponsesFor)
                    }
                  >
                    Download Excel
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.buttonDangerOutline }}
                    onClick={() => setViewingResponsesFor(null)}
                  >
                    Back to Forms
                  </button>
                </div>
              </div>

              {!formResponses[viewingResponsesFor.id] ||
              formResponses[viewingResponsesFor.id].length === 0 ? (
                <p
                  style={{
                    color: "#64748b",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  No responses found for this form yet.
                </p>
              ) : (
                <div style={{ overflowX: "auto", width: "100%" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      minWidth: "800px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#f8fafc",
                          borderBottom: "2px solid #e2e8f0",
                        }}
                      >
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            fontWeight: "600",
                          }}
                        >
                          Date
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            textAlign: "left",
                            fontWeight: "600",
                          }}
                        >
                          Answers Data (JSON View)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formResponses[viewingResponsesFor.id].map((resp, i) => (
                        <tr
                          key={i}
                          style={{ borderBottom: "1px solid #e2e8f0" }}
                        >
                          <td style={{ padding: "1rem", whiteSpace: "nowrap" }}>
                            {new Date(resp.submittedAt).toLocaleString()}
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <pre
                              style={{
                                margin: 0,
                                whiteSpace: "pre-wrap",
                                fontSize: "0.85rem",
                                background: "#f1f5f9",
                                padding: "0.5rem",
                                borderRadius: "4px",
                              }}
                            >
                              {resp.answers}
                            </pre>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div style={styles.card}>
              <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
                Manage custom admission and inquiry forms. You can publish one
                form at a time to be displayed on the website popup.
              </p>

              {forms.length === 0 ? (
                <p
                  style={{
                    color: "#64748b",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  No published or draft forms found. Create one to get started.
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {forms.map((form) => (
                    <div
                      key={form.id}
                      style={{
                        ...styles.card,
                        border: `1px solid ${form.isPublished ? "#10b981" : "#e2e8f0"}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              color: "#1e293b",
                            }}
                          >
                            {form.title}
                          </h4>
                          {form.isPublished ? (
                            <span
                              style={{
                                background: "#10b981",
                                color: "white",
                                padding: "0.15rem 0.6rem",
                                borderRadius: "99px",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                              }}
                            >
                              LIVE
                            </span>
                          ) : (
                            <span
                              style={{
                                background: "#e2e8f0",
                                color: "#475569",
                                padding: "0.15rem 0.6rem",
                                borderRadius: "99px",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                              }}
                            >
                              DRAFT
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            color: "#64748b",
                            margin: 0,
                            fontSize: "0.9rem",
                          }}
                        >
                          {form.questions?.length || 0} Questions • Created{" "}
                          {new Date(form.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          style={{
                            ...styles.button,
                            background: "#f1f5f9",
                            color: "#0f172a",
                          }}
                          onClick={() => {
                            setViewingResponsesFor(form);
                            loadFormResponses(form.id);
                          }}
                        >
                          View Responses
                        </button>
                        <button
                          style={{
                            ...styles.button,
                            background: "#e0f2fe",
                            color: "#0284c7",
                          }}
                          onClick={() => {
                            setEditingForm(form);
                            setIsFormBuilderOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        {!form.isPublished && (
                          <button
                            style={{
                              ...styles.button,
                              background: "#ecfdf5",
                              color: "#059669",
                            }}
                            onClick={() => handlePublishForm(form.id)}
                          >
                            Publish
                          </button>
                        )}
                        <button
                          style={{
                            ...styles.button,
                            ...styles.buttonDangerOutline,
                          }}
                          onClick={() => handleDeleteForm(form.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );

  const showHamburger = !isAuthenticated ? false : isMobile || isTablet;
  const sidebarLeft =
    !isMobile && !isTablet ? "0" : isSidebarOpen ? "0" : "-260px";
  const mainMarginLeft = !isMobile && !isTablet ? "260px" : "0";
  const mainPadding = isMobile ? "1rem" : isTablet ? "1.5rem" : "2rem 3rem";

  return (
    <div style={styles.dashboardWrapper}>
      <style>{`
                .sidebar-link-hover:hover { background-color: #334155; } 
                .image-preview-parent:hover .image-preview-overlay-child { opacity: 1; } 
                .admin-content { margin-left: ${mainMarginLeft}!important; padding: ${
                  typeof mainPadding === "string"
                    ? mainPadding
                    : `${mainPadding}px`
                }!important; transition: margin-left 0.3s ease, padding 0.3s ease; }
                .hamburger-btn { display: ${
                  showHamburger ? "flex" : "none"
                }!important; }
                @media (max-width: 1024px) {
                    .admin-content { margin-left: 0!important; padding: 1rem!important; }
                    .content-header { flex-direction: column; gap: 1rem; align-items: flex-start!important; }
                    .content-header h1 { font-size: 1.25rem; }
                    .content-header > div { width: 100%; display: flex; flex-direction: row; gap: 0.5rem; flex-wrap: wrap; }
                    .card { padding: 1.5rem!important; }
                    input, textarea { width: 100%!important; box-sizing: border-box!important; }
                    .form-group input, .form-group textarea { width: 100%!important; box-sizing: border-box!important; }
                    .hamburger-btn { display: flex!important; }
                }
                @media (max-width: 768px) {
                    .card { padding: 1rem!important; }
                    .h2 { font-size: 1.5rem!important; margin-top: 1.5rem!important; margin-bottom: 1.5rem!important; }
                    .h3 { font-size: 1.1rem!important; }
                    .button { padding: 0.5rem 1rem!important; font-size: 0.9rem!important; }
                    .content-header { flex-direction: column; gap: 0.75rem; }
                    .content-header > div { flex-direction: column; width: 100%; }
                    .content-header button { width: 100%; }
                    .image-preview-container { width: 120px!important; height: 120px!important; margin-bottom: 0.5rem!important; }
                    .gallery-preview-item { width: 100px!important; height: 100px!important; }
                    .list-item { flex-direction: column!important; align-items: stretch!important; }
                    .list-item-input { width: 100%!important; }
                    .dropzone { padding: 15px!important; min-width: 0!important; }
                    .gallery-dropzone { padding: 1.5rem!important; }
                    .image-uploader-wrapper { flex-direction: column!important; }
                }
                @media (max-width: 480px) {
                    .login-box { padding: 2rem 1.5rem!important; margin: 1rem; max-width: calc(100% - 2rem)!important; }
                    .card { padding: 0.75rem!important; }
                    .h2 { font-size: 1.25rem!important; margin-top: 1.5rem!important; margin-bottom: 1rem!important; }
                    .h3 { font-size: 1rem!important; margin-bottom: 1rem!important; }
                    .form-group { margin-bottom: 1rem!important; }
                    .button { font-size: 0.85rem!important; padding: 0.5rem 0.75rem!important; }
                    .accordion-header { padding: 0.75rem 1rem!important; }
                    .accordion-content { padding: 1rem!important; }
                    .sidebar-link { padding: 0.75rem 1rem!important; margin: 0.25rem 0.5rem!important; font-size: 0.9rem!important; }
                    .hamburger-btn { width: 45px!important; height: 45px!important; font-size: 1.2rem!important; top: 0.5rem!important; left: 0.5rem!important; }
                    .image-preview-container { width: 100px!important; height: 100px!important; margin-right: 0!important; margin-bottom: 1rem!important; }
                    .gallery-preview-item { width: 80px!important; height: 80px!important; }
                    table { font-size: 0.85rem!important; }
                    table th, table td { padding: 0.5rem!important; }
                    .sidebar { width: 240px!important; }
                    input, textarea { font-size: 0.9rem!important; padding: 0.6rem!important; }
                    .image-uploader-wrapper { flex-direction: column!important; align-items: stretch!important; }
                    .dropzone { width: 100%!important; }
                }
                @media (max-width: 360px) {
                    .hamburger-btn { width: 40px!important; height: 40px!important; font-size: 1rem!important; }
                    .sidebar { width: 220px!important; }
                    .card { padding: 0.5rem!important; }
                    .button { padding: 0.4rem 0.6rem!important; font-size: 0.8rem!important; }
                }
                ${styles.responsiveStyles}
            `}</style>
      {isAuthenticated && (
        <>
          <div
            style={{
              ...styles.mobileOverlay,
              ...(isSidebarOpen &&
                (isMobile || isTablet) &&
                styles.mobileOverlayOpen),
            }}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <button
            style={{
              ...styles.hamburgerBtn,
              display: showHamburger ? "flex" : "none",
            }}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </>
      )}
      {isAuthenticated && (
        <aside
          style={{
            ...styles.sidebar,
            left: sidebarLeft,
            transition: "left 0.3s ease-in-out",
          }}
        >
          <div style={styles.sidebarHeader}>
            <div style={styles.sidebarLogoContainer}>
              <img src={logo} alt="Logo" style={styles.sidebarLogoImage} />
            </div>
            <h1 style={styles.sidebarTitle}>GURUKUL</h1>
            <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
              Admin Panel
            </span>
          </div>
          <nav style={styles.sidebarNav}>
            {sidebarLinks.map((l) => (
              <a
                key={l.key}
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView(l.key);
                  if (isMobile || isTablet) {
                    setSidebarOpen(false);
                  }
                }}
                style={{
                  ...styles.sidebarLink,
                  ...(activeView === l.key && styles.sidebarLinkActive),
                }}
                className="sidebar-link-hover"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </aside>
      )}
      <main
        style={{
          ...styles.content,
          marginLeft: mainMarginLeft,
          padding: mainPadding,
          transition: "margin-left 0.3s ease, padding 0.3s ease",
        }}
        className="admin-content"
      >
        {isAuthenticated && (
          <div style={styles.contentHeader} className="content-header">
            <h1 style={styles.h1}>
              {sidebarLinks.find((l) => l.key === activeView)?.label}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleSaveChanges}
                style={{ ...styles.button, ...styles.buttonSuccess }}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save All"}
              </button>
              <button
                onClick={handleLogout}
                style={{ ...styles.button, ...styles.buttonDangerOutline }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <>
            {!data ? (
              <div style={styles.card}>
                <p
                  style={{
                    color: "#64748b",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  Loading data... Please wait.
                </p>
              </div>
            ) : (
              renderActiveView()
            )}
          </>
        )}
      </main>
    </div>
  );
};

// --- APP ENTRY POINT ---
const AdminPage = () => (
  <div style={styles.container}>
    <Dashboard />
  </div>
);

export default AdminPage;
