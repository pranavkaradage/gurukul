import React from "react";
import { getImageUrl } from "../../utils/imageUtils";
import { motion } from "framer-motion";
import { Reveal, staggerContainer, revealUp, zoomIn } from "../common/Reveal";
import { useTheme } from "../../context/ThemeContext";

const HomeEvents = ({ events }) => {
  const { colors } = useTheme();
  // Guard Clause: If events is not a valid array, render nothing instead of crashing.
  if (!events || !Array.isArray(events)) {
    return null;
  }

  return (
    <section
      style={{ padding: "4rem 2rem", background: colors.backgroundGradient }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
      >
        <Reveal
          as={motion.h2}
          variants={revealUp}
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: colors.text,
            marginBottom: "2rem",
          }}
        >
          Campus <span className="gradient-text">Events</span>
        </Reveal>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* This line is now safe because of the check above */}
          {events.map((event, index) => {
            const imageUrl = getImageUrl(event.image);
            return (
              <Reveal
                as={motion.div}
                variants={zoomIn}
                key={index}
                style={{
                  background: colors.card,
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: colors.cardShadow,
                }}
              >
                {/* This container reserves space for the image before it loads. */}
                <div
                  style={{
                    height: "180px",
                    backgroundColor: colors.backgroundAlt,
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={event.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: colors.textSecondary,
                      }}
                    >
                      {event.name}
                    </div>
                  )}
                </div>
                <div style={{ padding: "1rem" }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: colors.text,
                    }}
                  >
                    {event.name}
                  </h3>
                </div>
              </Reveal>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeEvents;
