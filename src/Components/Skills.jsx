import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import html        from "../assets/html.png";
import CSS         from "../assets/CSS.png";
import javascript  from "../assets/javascript.png";
import reactImg    from "../assets/react.png";
import bootstrap   from "../assets/bootstrap.png";
import wordpress   from "../assets/wordpress.png";
import tailwind    from "../assets/tailwind.png";
import canva       from "../assets/canva.png";
import express from "../assets/express-js.png";
import node from "../assets/nodejs.png";
import mongodb from "../assets/mongodb.png";

// ── 3D Skill Card ─────────────────────────────────────────────────────────────
const SkillCard = ({ skill, dark, index }) => {
  const cardRef = useRef(null);
  const barRef  = useRef(null);
  const inView  = useInView(barRef, { once: true });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale3d(1.05,1.05,1.05)`;
  };

  const handleLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="p-4 lg:w-1/4 md:w-1/2 w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          transition: "transform 0.15s ease, box-shadow 0.3s ease",
          willChange: "transform",
          borderRadius: 20,
          padding: 24,
          background: dark
            ? "linear-gradient(135deg, #1f2937, #111827)"
            : "linear-gradient(135deg, #ffffff, #f9fafb)",
          border: hovered
            ? "1px solid rgba(249,115,22,0.5)"
            : dark
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid rgba(0,0,0,0.07)",
          boxShadow: hovered
            ? "0 20px 60px rgba(249,115,22,0.2), 0 0 0 1px rgba(249,115,22,0.15)"
            : dark
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 4px 16px rgba(0,0,0,0.07)",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {/* Shimmer glow on hover */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, transparent 60%)",
              pointerEvents: "none",
              borderRadius: 20,
            }}
          />
        )}

        {/* Icon + Name */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: dark ? "rgba(255,255,255,0.07)" : "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              style={{
                width:
                  skill.name === "CSS" || skill.name === "JavaScript"
                    ? 52
                    : 44,
                height:
                  skill.name === "CSS" || skill.name === "JavaScript"
                    ? 52
                    : 44,
                objectFit: "contain",
              }}
            />
          </motion.div>
          <h3
            style={{
              marginLeft: 14,
              fontSize: "1.05rem",
              fontWeight: 700,
              color: dark ? "white" : "#111827",
            }}
          >
            {skill.name}
          </h3>
        </div>

        {/* Label row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span style={{ color: dark ? "#9ca3af" : "#6b7280", fontSize: "0.85rem" }}>
            Proficiency
          </span>
          <span
            style={{
              fontWeight: 700,
              background: "linear-gradient(to right, #f97316, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "0.9rem",
            }}
          >
            {skill.level}%
          </span>
        </div>

        {/* Animated progress bar */}
        <div
          ref={barRef}
          style={{
            width: "100%",
            height: 8,
            borderRadius: 999,
            background: dark ? "#374151" : "#e5e7eb",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.08 }}
            style={{
              height: "100%",
              borderRadius: 999,
              background: `linear-gradient(to right, ${skill.gradFrom}, ${skill.gradTo})`,
              boxShadow: `0 0 10px ${skill.gradFrom}55`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// ── Skills ────────────────────────────────────────────────────────────────────
const Skills = ({ darkModeFirst }) => {
  const dark = darkModeFirst;

  const skills = [
    { name: "HTML",        icon: html,       level: 85, gradFrom: "#f97316", gradTo: "#f59e0b" },
    { name: "CSS",         icon: CSS,        level: 75, gradFrom: "#3b82f6", gradTo: "#06b6d4" },
    { name: "JavaScript",  icon: javascript, level: 60, gradFrom: "#eab308", gradTo: "#f97316" },
    { name: "React",       icon: reactImg,   level: 65, gradFrom: "#06b6d4", gradTo: "#3b82f6" },
    { name: "Bootstrap",   icon: bootstrap,  level: 70, gradFrom: "#a855f7", gradTo: "#6366f1" },
    { name: "Tailwind CSS",icon: tailwind,   level: 60, gradFrom: "#06b6d4", gradTo: "#14b8a6" },
    { name: "WordPress",   icon: wordpress,  level: 75, gradFrom: "#3b82f6", gradTo: "#6b7280" },
    { name: "Canva",       icon: canva,      level: 92, gradFrom: "#ec4899", gradTo: "#a855f7" },
    { name: "Node.js",    icon: node,       level: 60, gradFrom: "#f97316", gradTo: "#f59e0b" },
    { name: "Express.js", icon: express,    level: 75, gradFrom: "#06b6d4", gradTo: "#3b82f6" },
    { name: "MongoDB",    icon: mongodb,    level: 70,  gradFrom: "#a855f7", gradTo: "#6366f1"},
];

  return (
    <section
      id="skills"
      style={{
        background: dark
          ? "linear-gradient(to bottom right, #0f172a, #020617)"
          : "#f8fafc",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      <div className="container px-5 mx-auto" style={{ position: "relative" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              marginBottom: 12,
              color: dark ? "white" : "#111827",
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
              Skills
            </span>
          </h1>
          <p style={{ color: dark ? "#9ca3af" : "#6b7280", maxWidth: 500, margin: "0 auto" }}>
            A combination of technical expertise and creative skills that enable
            me to design and develop modern, high-quality digital solutions.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap -m-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} dark={dark} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;