import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import about from "../assets/about.png";

// ── Animated Counter ──────────────────────────────────────────────────────────
const Counter = ({ target, suffix = "", dark }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 1800;
    const step = Math.ceil(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-3xl sm:text-4xl font-bold"
        style={{
          background: "linear-gradient(to right, #f97316, #f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}{suffix}
      </div>
      <div style={{ color: dark ? "#9ca3af" : "#6b7280", fontSize: "0.9rem" }}>
        {target === "10" ? "Projects" : "Years Exp."}
      </div>
    </div>
  );
};

// ── 3D Flip Card ─────────────────────────────────────────────────────────────
const FlipCard = ({ dark }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{ perspective: "1000px", width: "100%", maxWidth: 380, margin: "0 auto", cursor: "pointer" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative", height: 380 }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* Star shape bg */}
          <div
            style={{
              position: "absolute",
              inset: "-40px",
              background: "linear-gradient(135deg, #f97316, #fb923c, #f97316)",
              transform: "rotate(12deg)",
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              zIndex: 0,
              opacity: 0.9,
            }}
          />
          <img
            src={about}
            alt="About"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
              borderRadius: 20,
            }}
          />
          {/* Hint */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              color: "white",
              fontSize: "0.72rem",
              padding: "5px 14px",
              borderRadius: 999,
              zIndex: 2,
              whiteSpace: "nowrap",
            }}
          >
            Click to flip ✨
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 20,
            background: dark
              ? "linear-gradient(135deg, #1f2937, #0f172a)"
              : "linear-gradient(135deg, #fff7ed, #ffffff)",
            border: "1px solid rgba(249,115,22,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              background: "linear-gradient(to right, #f97316, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Malaika
          </div>
          <div style={{ color: dark ? "#d1d5db" : "#4b5563", textAlign: "center", lineHeight: 1.7 }}>
            Web Developer & Graphic Designer passionate about creating modern digital experiences.
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {["React", "Tailwind", "Canva", "WordPress"].map((t) => (
              <span
                key={t}
                style={{
                  padding: "4px 14px",
                  borderRadius: 999,
                  background: "rgba(249,115,22,0.15)",
                  color: "#f97316",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  border: "1px solid rgba(249,115,22,0.3)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              color: dark ? "#6b7280" : "#9ca3af",
            }}
          >
            Click to flip back
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ── About ─────────────────────────────────────────────────────────────────────
const About = ({ darkModeFirst }) => {
  const dark = darkModeFirst;
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: dark
          ? "linear-gradient(to bottom right, #0f172a, #020617)"
          : "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 16px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
          top: "10%",
          left: "-100px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          width: "100%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* ── Image / Flip Card ── */}
        <motion.div
          initial={{ opacity: 0, x: -60, rotateY: -15 }}
          animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <FlipCard dark={dark} />
        </motion.div>

        {/* ── Content ── */}
        <motion.article
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              marginBottom: 20,
              background: "linear-gradient(to right, #f97316, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About Me
          </motion.h1>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            style={{
              color: dark ? "#d1d5db" : "#374151",
              lineHeight: 1.8,
              marginBottom: 32,
              fontSize: "1rem",
              padding: "20px 24px",
              borderRadius: 16,
              background: dark
                ? "rgba(249,115,22,0.05)"
                : "rgba(249,115,22,0.04)",
              border: "1px solid rgba(249,115,22,0.12)",
            }}
          >
            I am a Web Developer and Graphic Designer with a strong focus on
            creating modern, responsive, and user-friendly digital products. My
            work combines clean design principles with efficient development
            practices, delivering solutions that are both visually appealing and
            technically reliable. I am continuously learning and improving to
            stay aligned with modern standards.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            style={{ display: "flex", gap: 40, marginBottom: 32 }}
          >
            <Counter target="10" suffix="+" dark={dark} />
            <Counter target="1"  suffix="+" dark={dark} />
          </motion.div>

          {/* Skills tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}
          >
            {["React", "Tailwind CSS", "JavaScript", "WordPress", "Canva", "Figma"].map(
              (tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.55 + i * 0.07 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 999,
                    background: dark
                      ? "rgba(249,115,22,0.12)"
                      : "rgba(249,115,22,0.08)",
                    color: "#f97316",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    border: "1px solid rgba(249,115,22,0.25)",
                    cursor: "default",
                  }}
                >
                  {tag}
                </motion.span>
              )
            )}
          </motion.div>

          {/* Button */}
          <motion.a
            href="#skills"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 28px rgba(249,115,22,0.5)",
            }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 999,
              border: "2px solid #f97316",
              background: dark ? "rgba(249,115,22,0.1)" : "transparent",
              color: dark ? "white" : "#111827",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            View My Skills →
          </motion.a>
        </motion.article>
      </div>
    </section>
  );
};

export default About;