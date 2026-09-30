import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "https://gurukulschools.org/api/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/admin";
    }
    return Promise.reject(error);
  },
);

// Public API calls
export const publicApi = {
  getAllData: () => api.get("/public/data"),
  getUnit: (unitId) => api.get(`/public/unit/${unitId}`),
  submitAdmissionInquiry: (data) => api.post("/public/admission-inquiry", data),

  // Forms
  getPublishedForm: () => api.get("/public/forms/published"),
  submitFormResponse: (id, data) =>
    api.post(`/public/forms/${id}/submit`, data),
};

// Auth API calls
export const authApi = {
  login: (username, password) =>
    api.post("/auth/login", { username, password }),
};

// Admin API calls
export const adminApi = {
  getAllData: () => api.get("/admin/data"),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/admin/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveAbout: (data) => api.post("/admin/about", data),
  saveContact: (data) => api.post("/admin/contact", data),
  saveSocialMedia: (data) => api.post("/admin/social-media", data),
  getInquiries: () => api.get("/admin/inquiries"),

  // Hero Slides
  getHeroSlides: () => api.get("/admin/hero-slides"),
  createHeroSlide: (data) => api.post("/admin/hero-slides", data),
  updateHeroSlide: (id, data) => api.put(`/admin/hero-slides/${id}`, data),
  deleteHeroSlide: (id) => api.delete(`/admin/hero-slides/${id}`),

  // Management
  getManagement: () => api.get("/admin/management"),
  createManagement: (data) => api.post("/admin/management", data),
  updateManagement: (id, data) => api.put(`/admin/management/${id}`, data),
  deleteManagement: (id) => api.delete(`/admin/management/${id}`),

  // Units
  getUnits: () => api.get("/admin/units"),
  createUnit: (data) => api.post("/admin/units", data),
  updateUnit: (id, data) => api.put(`/admin/units/${id}`, data),
  deleteUnit: (id) => api.delete(`/admin/units/${id}`),

  // Home Results
  getHomeResults: () => api.get("/admin/home-results"),
  saveHomeResult: (data) => api.post("/admin/home-results", data),
  updateHomeResult: (id, data) => api.put(`/admin/home-results/${id}`, data),
  deleteHomeResult: (id) => api.delete(`/admin/home-results/${id}`),

  // Circulars
  getCirculars: () => api.get("/admin/circulars"),
  createCircular: (data) => api.post("/admin/circulars", data),
  updateCircular: (id, data) => api.put(`/admin/circulars/${id}`, data),
  deleteCircular: (id) => api.delete(`/admin/circulars/${id}`),

  // Events
  getEvents: () => api.get("/admin/events"),
  createEvent: (data) => api.post("/admin/events", data),
  updateEvent: (id, data) => api.put(`/admin/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),

  // Forms
  getForms: () => api.get("/admin/forms"),
  getFormById: (id) => api.get(`/admin/forms/${id}`),
  createForm: (data) => api.post("/admin/forms", data),
  updateForm: (id, data) => api.put(`/admin/forms/${id}`, data),
  deleteForm: (id) => api.delete(`/admin/forms/${id}`),
  publishForm: (id) => api.post(`/admin/forms/${id}/publish`),
  getFormResponses: (id) => api.get(`/admin/forms/${id}/responses`),
};

export default api;
