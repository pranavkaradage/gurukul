import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Lightbox = ({ imageUrl, onClose }) => {
    const { colors } = useTheme();

    useEffect(() => {
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    useEffect(() => {
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!imageUrl) return null;

    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 3000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    animation: 'fadeIn 0.3s ease',
                    cursor: 'pointer',
                }}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'relative',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        animation: 'zoomIn 0.3s ease',
                    }}
                >
                    <img
                        src={imageUrl}
                        alt="Gallery image"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '90vh',
                            objectFit: 'contain',
                            borderRadius: '0.5rem',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                        }}
                    />
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '-2.5rem',
                            right: 0,
                            background: colors.card,
                            color: colors.text,
                            border: `1px solid ${colors.border}`,
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            boxShadow: colors.cardShadow,
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = colors.hover;
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = colors.card;
                            e.target.style.transform = 'scale(1)';
                        }}
                        aria-label="Close lightbox"
                    >
                        ×
                    </button>
                </div>
            </div>
        </>
    );
};

export default Lightbox;

