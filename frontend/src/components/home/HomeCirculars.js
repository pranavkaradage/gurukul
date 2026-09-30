import React from "react";
import { useTheme } from "../../context/ThemeContext";

const HomeCirculars = ({ circulars }) => {
  const { colors } = useTheme();

  // Guard Clause: If circulars is not a valid array, render nothing instead of crashing.
  if (!circulars || !Array.isArray(circulars)) {
    return null;
  }

  return (
    <section
      style={{
        padding: "4rem 2rem",
        background: colors.backgroundGradient,
        minHeight: "50vh", // <-- FIX APPLIED HERE
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: colors.text,
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Latest <span className="gradient-text">Circulars</span>
        </h2>
        <div
          style={{
            background: colors.card,
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: colors.cardShadow,
            border: `1px solid ${colors.border}`,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: colors.hover }}>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: colors.text,
                    fontWeight: "600",
                  }}
                >
                  Unit
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: colors.text,
                    fontWeight: "600",
                  }}
                >
                  Subject
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: colors.text,
                    fontWeight: "600",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* This line is now safe because of the check above */}
              {circulars.slice(0, 4).map((circular) => (
                <tr
                  key={circular.id}
                  style={{ borderBottom: `1px solid ${colors.border}` }}
                >
                  <td
                    style={{
                      padding: "1rem",
                      color: colors.textSecondary,
                      fontWeight: "500",
                    }}
                  >
                    {circular.unit}
                  </td>
                  <td style={{ padding: "1rem", color: colors.text }}>
                    {circular.subject}
                  </td>
                  <td style={{ padding: "1rem", color: colors.textSecondary }}>
                    {circular.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default HomeCirculars;
