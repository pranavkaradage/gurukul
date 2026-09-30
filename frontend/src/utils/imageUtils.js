// Utility function to convert relative image URLs to absolute URLs
const API_URL =
  process.env.REACT_APP_API_URL || "https://gurukulschools.org/api";

export const getImageUrl = (url) => {
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
