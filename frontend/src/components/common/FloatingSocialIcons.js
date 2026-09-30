import React, { useEffect, useMemo, useState } from "react";

const FloatingSocialIcons = ({ socialMedia }) => {
  const [isFooterInView, setIsFooterInView] = useState(false);

  const links = useMemo(() => {
    return {
      facebook: socialMedia?.facebook || "",
      instagram: socialMedia?.instagram || "",
      youtube: socialMedia?.youtube || "",
    };
  }, [socialMedia]);

  useEffect(() => {
    const footerEl = document.getElementById("site-footer");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsFooterInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.05 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const hasAny =
    Boolean(links.facebook) || Boolean(links.instagram) || Boolean(links.youtube);
  if (!hasAny) return null;

  return (
    <>
      <style>{`
        .floating-social {
          position: fixed;
          right: 30px;
          bottom: 110px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 9998;
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: auto;
        }

        .floating-social.hidden {
          opacity: 0;
          transform: translateY(8px);
          pointer-events: none;
        }

        .floating-social a {
          text-decoration: none;
        }

        .floating-social .icon {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
          transform: translateZ(0);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
          user-select: none;
        }

        .floating-social .icon:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.26);
          filter: brightness(1.05);
        }

        @media (max-width: 768px) {
          .floating-social {
            right: 20px;
            bottom: 100px;
          }
          .floating-social .icon {
            width: 42px;
            height: 42px;
          }
        }
      `}</style>

      <div className={`floating-social ${isFooterInView ? "hidden" : ""}`}>
        {links.facebook && (
          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >
            <div className="icon" style={{ background: "#1877F2" }}>
              <span
                style={{
                  color: "white",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  fontFamily: "system-ui",
                  lineHeight: 1,
                }}
              >
                f
              </span>
            </div>
          </a>
        )}

        {links.instagram && (
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <div
              className="icon"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #feda77, #f58529, #dd2a7b, #8134af, #515bd4)",
              }}
            >
              <span style={{ color: "white", fontSize: "1.4rem", fontWeight: 700 }}>
                ◎
              </span>
            </div>
          </a>
        )}

        {links.youtube && (
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
          >
            <div className="icon" style={{ background: "#FF0000" }}>
              <span style={{ color: "white", fontSize: "1.2rem", fontWeight: 700 }}>
                ▶
              </span>
            </div>
          </a>
        )}
      </div>
    </>
  );
};

export default FloatingSocialIcons;


