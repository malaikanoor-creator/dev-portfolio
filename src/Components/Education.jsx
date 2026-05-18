import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import eduImg from "../assets/education.png";

// ── Timeline Card ─────────────────────────────────────────────────────────────
const TimelineCard = ({ item, dark, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.6 }}
      style={{ marginBottom: 40, marginLeft: 32, position: "relative" }}
    >
      {/* Pulsing dot */}
      <motion.span
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
        style={{
          position: "absolute",
          left: -44,
          top: 20,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f97316, #f59e0b)",
          boxShadow: "0 0 14px rgba(249,115,22,0.6)",
          border: "3px solid",
          borderColor: dark ? "#0f172a" : "#f8fafc",
        }}
      />

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: 24,
          borderRadius: 16,
          background: dark
            ? "linear-gradient(135deg, #1f2937, #111827)"
            : "linear-gradient(135deg, #ffffff, #f9fafb)",
          border: "1px solid",
          borderColor: hovered
            ? "rgba(249,115,22,0.4)"
            : dark
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.06)",
          boxShadow: hovered
            ? "0 16px 48px rgba(249,115,22,0.18)"
            : dark
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 4px 16px rgba(0,0,0,0.06)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
          <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: dark ? "white" : "#111827" }}>
            {item.degree}
          </h3>
        </div>

        <p style={{ color: "#f97316", fontWeight: 600, marginBottom: 4, fontSize: "0.9rem" }}>
          {item.institute}
        </p>

        <span
          style={{
            display: "inline-block",
            fontSize: "0.8rem",
            marginBottom: 10,
            padding: "3px 12px",
            borderRadius: 999,
            background: dark ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.08)",
            color: "#f97316",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
        >
          {item.year}
        </span>

        <p style={{ fontSize: "0.85rem", marginBottom: 10, color: dark ? "#d1d5db" : "#374151", fontWeight: 600 }}>
          {item.cgpa && `🏆 CGPA: ${item.cgpa}`}
          {item.marks && `📊 Marks: ${item.marks}`}
        </p>

        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {item.achievements.map((ach, i) => (
            <li
              key={i}
              style={{
                fontSize: "0.82rem",
                color: dark ? "#9ca3af" : "#6b7280",
                paddingLeft: 16,
                position: "relative",
                marginBottom: 4,
                lineHeight: 1.5,
              }}
            >
              <span style={{ position: "absolute", left: 0, color: "#f97316", fontWeight: 700 }}>›</span>
              {ach}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// ── Education ─────────────────────────────────────────────────────────────────
const Education = ({ darkModeFirst }) => {
  const dark = darkModeFirst;

  const education = [
    {
      id: 1,
      degree: "BS Islamic Studies",
      institute: "University of the Punjab, Lahore",
      year: "2021 - 2025",
      cgpa: "3.96",
      icon: "🎓",
      achievements: ["Research work on Islamic studies", "Academic writing & analysis"],
    },
    {
      id: 2,
      degree: "FSc Pre-Medical",
      institute: "Aspire Group Of College",
      year: "2019 - 2021",
      marks: "1014/1100",
      icon: "📚",
      achievements: ["Strong performance in Biology", "Conceptual learning in science"],
    },
    {
      id: 3,
      degree: "Matriculation (Science)",
      institute: "The Educators",
      year: "2017 - 2019",
      marks: "1045/1100",
      icon: "🏫",
      achievements: ["Strong academic foundation", "High marks in science subjects"],
    },
  ];

  return (
    <section
      id="education"
      style={{
        background: dark
          ? "linear-gradient(to bottom right, #0f172a, #020617)"
          : "#f8fafc",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "10%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-5" style={{ position: "relative" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: dark ? "white" : "#111827",
              marginBottom: 10,
            }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Education
            </span>
          </h2>
          <p style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            My academic journey and qualifications
          </p>
        </motion.div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>

          {/* ── Timeline ── */}
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ position: "relative", borderLeft: "2px solid rgba(249,115,22,0.4)", marginLeft: 16 }}>
              {education.map((item, index) => (
                <TimelineCard key={item.id} item={item} dark={dark} index={index} />
              ))}
            </div>
          </div>

          {/* ── Floating Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              flex: "1 1 280px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 40,
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: "-20px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)",
                  animation: "glowPulse 3s ease-in-out infinite",
                }}
              />
              <motion.img
                src={eduImg}
                alt="Education"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "clamp(200px, 30vw, 340px)",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(249,115,22,0.25))",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
};

export default Education;