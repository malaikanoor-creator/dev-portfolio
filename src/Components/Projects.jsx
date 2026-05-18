import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import portfolio  from "../assets/portfolio.png";
import Weather    from "../assets/weather.png";
import signup     from "../assets/signup.png";
import game       from "../assets/game.png";
import Netflix    from "../assets/netflix.png";
import ecommerce  from "../assets/ecommerce.png";
import otp        from "../assets/otp.png";

const ProjectCard = ({ project, dark, index }) => {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale3d(1.03,1.03,1.03)`;
    setSpotlight({ x: e.clientX - left, y: e.clientY - top, visible: true });
  };

  const handleLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)";
    setSpotlight((s) => ({ ...s, visible: false }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transition: "transform 0.18s ease, box-shadow 0.3s ease",
          willChange: "transform",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid",
          borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
          background: dark
            ? "linear-gradient(135deg, #1f2937, #111827)"
            : "linear-gradient(135deg, #ffffff, #f9fafb)",
          position: "relative",
          cursor: "default",
        }}
      >
        {spotlight.visible && (
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
              left: spotlight.x - 100,
              top: spotlight.y - 100,
              pointerEvents: "none",
              zIndex: 1,
              transition: "opacity 0.1s",
            }}
          />
        )}

        <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
            }}
          />
        </div>

        <div style={{ padding: 20, position: "relative", zIndex: 2 }}>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 6, color: dark ? "white" : "#111827" }}>
            {project.title}
          </h3>

          <p style={{ fontSize: "0.85rem", marginBottom: 14, color: dark ? "#9ca3af" : "#6b7280", lineHeight: 1.5 }}>
            {project.desc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 10px",
                  borderRadius: 999,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  background: dark ? "rgba(249,115,22,0.1)" : "rgba(249,115,22,0.07)",
                  color: "#f97316",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
{/* Buttons */}
<div style={{ display: "flex", gap: 8 }}>
  
  <a
    href={project.github}
    target="_blank"
    rel="noreferrer"
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "8px 0",
      borderRadius: 10,
      fontSize: "0.82rem",
      fontWeight: 600,
      textDecoration: "none",
      background: dark ? "rgba(255,255,255,0.07)" : "#f3f4f6",
      color: dark ? "white" : "#374151",
      border: "1px solid",
      borderColor: dark ? "rgba(255,255,255,0.08)" : "transparent",
      transition: "background 0.2s",
    }}
  >
    <FaGithub size={13} /> Code
  </a>

  <a
    href={project.demo}
    target="_blank"
    rel="noreferrer"
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "8px 0",
      borderRadius: 10,
      fontSize: "0.82rem",
      fontWeight: 600,
      textDecoration: "none",
      background: "linear-gradient(to right, #f97316, #f59e0b)",
      color: "white",
    }}
  >
    <FaExternalLinkAlt size={11} /> Demo
  </a>

</div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ darkModeFirst }) => {
  const dark = darkModeFirst;

  const projects = [
    { id: 1, title: "Animated Portfolio", desc: "Modern animated portfolio using React & Tailwind.", image: portfolio, tags: ["React","Tailwind","Framer Motion"], github: "#", demo: "#" },
    { id: 2, title: "Weather App", desc: "Weather app using API integration.", image: Weather, tags: ["HTML","CSS","JavaScript"], github: "https://github.com/malaikanoor-creator/Weather-App", demo: "https://storied-bublanina-a47e78.netlify.app/" },
    { id: 3, title: "Netflix Clone",      desc: "Responsive Netflix UI clone.",                     image: Netflix,   tags: ["React","Tailwind"],                  github: "#", demo: "#" },
    { id: 4, title: "Tic Tac Toe",        desc: "Simple JS game.",                                  image: game,      tags: ["HTML","CSS","JS"],                   github: "https://github.com/malaikanoor-creator/Tic-Tac-Toe-", demo: "https://game-projec.netlify.app/" },
    { id: 5, title: "OTP Generator", desc: "Random OTP generator.", image: otp, tags: ["HTML","CSS","JS"], github: "https://github.com/malaikanoor-creator/OTP-Generator", demo: "https://stalwart-rabanadas-053cdc.netlify.app/" },
    { id: 6, title: "Signup Form",        desc: "Responsive form UI.",                              image: signup,    tags: ["HTML","CSS","Bootstrap"],            github: "#", demo: "#" },
    { id: 7, title: "E-commerce",         desc: "WordPress store.",                                 image: ecommerce, tags: ["WordPress"],                         github: "#", demo: "#" },
  ];

  return (
    <section
      id="projects"
      style={{
        background: dark ? "linear-gradient(to bottom right, #0f172a, #020617)" : "#f8fafc",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -100,
          top: "20%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              marginBottom: 12,
              color: dark ? "white" : "#111827",
            }}
          >
            My{" "}
            <span style={{ background: "linear-gradient(to right, #f97316, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Projects
            </span>
          </h2>
          <p style={{ color: dark ? "#9ca3af" : "#6b7280", maxWidth: 520, margin: "0 auto" }}>
            A collection of my recent projects demonstrating my skills in web development, UI design, and problem-solving.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} dark={dark} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;