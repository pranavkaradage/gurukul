import React, { useState } from "react";
import { getImageUrl } from "../../utils/imageUtils";
import { useTheme } from "../../context/ThemeContext";
import Lightbox from "../common/Lightbox";

const HomeGallery = ({ gallery }) => {
  const { colors } = useTheme();
  const [lightboxImage, setLightboxImage] = useState(null);

  // Guard Clause: If gallery is not a valid object, render nothing.
  if (!gallery || typeof gallery !== "object") {
    return null;
  }

  // This line is now safe because of the check above.
  const allImages = Object.values(gallery).flat().slice(0, 8);

  return (
    <>
      <section
        style={{ padding: "4rem 2rem", background: colors.backgroundAlt }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "2rem",
            }}
          >
            Glimpses of <span className="gradient-text">Gurukul Life</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {allImages.map((image, index) => {
              const imageUrl = getImageUrl(image);
              if (!imageUrl) return null;
              return (
                <div
                  key={index}
                  onClick={() => setLightboxImage(imageUrl)}
                  style={{
                    borderRadius: "1rem",
                    overflow: "hidden",
                    boxShadow: colors.cardShadow,
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = colors.cardShadow;
                  }}
                >
                  {/* This container reserves space for the image before it loads. */}
                  <div
                    style={{ height: "200px", backgroundColor: colors.hover }}
                  >
                    <img
                      src={imageUrl}
                      alt={`Gallery snapshot ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {lightboxImage && (
        <Lightbox
          imageUrl={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
};

export default HomeGallery;
