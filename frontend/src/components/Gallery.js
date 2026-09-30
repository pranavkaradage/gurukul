import React, { useState } from "react";
import { getImageUrl } from '../utils/imageUtils';
import { useTheme } from '../context/ThemeContext';
import Lightbox from './common/Lightbox';

const Gallery = ({ gallery, setLightboxImage: externalSetLightboxImage }) => {
    const { colors } = useTheme();
    const [selectedGalleryCategory, setSelectedGalleryCategory] = useState("all");
    const [lightboxImage, setLightboxImage] = useState(null);
    
    // Use external setLightboxImage if provided, otherwise use internal state
    const handleImageClick = (imageUrl) => {
        if (externalSetLightboxImage) {
            externalSetLightboxImage(imageUrl);
        } else {
            setLightboxImage(imageUrl);
        }
    };

    return (
        <>
        <section
            style={{
                padding: "5rem 0",
                background: colors.backgroundGradient,
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 2rem",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "700",
                            color: colors.text,
                            marginBottom: "1rem",
                        }}
                    >
                        Photo <span className="gradient-text">Gallery</span>
                    </h2>
                </div>

                {/* Gallery Filter */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        marginBottom: "2rem",
                        flexWrap: "wrap",
                    }}
                >
                    {["all", "festivals", "achievements", "sports", "activities"].map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedGalleryCategory(category)}
                            style={{
                                background:
                                    selectedGalleryCategory === category
                                        ? colors.buttonPrimary
                                        : colors.card,
                                color: selectedGalleryCategory === category ? colors.buttonText : colors.textSecondary,
                                border: `1px solid ${colors.border}`,
                                padding: "0.75rem 1.5rem",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                fontWeight: "500",
                                textTransform: "capitalize",
                                transition: "all 0.3s ease",
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "1rem",
                    }}
                >
                    {Object.entries(gallery).map(
                        ([category, images]) =>
                            (selectedGalleryCategory === "all" || selectedGalleryCategory === category) &&
                            images.map((image, index) => {
                                const imageUrl = getImageUrl(image);
                                if (!imageUrl) return null;
                                return (
                                    <div
                                        key={`${category}-${index}`}
                                        className="hover-scale"
                                        style={{
                                            borderRadius: "1rem",
                                            overflow: "hidden",
                                            cursor: "pointer",
                                            boxShadow: colors.cardShadow,
                                        }}
                                        onClick={() => handleImageClick(imageUrl)}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`${category} ${index + 1}`}
                                            style={{
                                                width: "100%",
                                                height: "200px",
                                                objectFit: "cover",
                                                transition: "transform 0.3s ease",
                                            }}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                );
                            })
                    )}
                </div>
            </div>
        </section>
        {!externalSetLightboxImage && lightboxImage && <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />}
        </>
    );
};

export default Gallery;