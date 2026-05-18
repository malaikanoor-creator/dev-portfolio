import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Download, Mail } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import heroImg from "../assets/hero.png";
import hi from "../assets/hi.png";
import CV from "../assets/Malaika CV.pdf";

// ── Typewriter Hook ────────────────────────────────────────────────────────────
const useTypewriter = (words, speed = 100, pause = 1800) => {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, display.length + 1));
        if (display.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setDisplay(current.slice(0, display.length - 1));
        if (display.length - 1 === 0) {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words, speed, pause]);

  return display;
};

// ── Floating Particles ─────────────────────────────────────────────────────────
const Particles = ({ darkMode }) => {
  const count = 28;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 12 + 8;
        const delay = Math.random() * 6;
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: i % 3 === 0
                ? "rgba(249,115,22,0.7)"
                : i % 3 === 1
                ? "rgba(251,191,36,0.5)"
                : darkMode
                ? "rgba(255,255,255,0.25)"
                : "rgba(0,0,0,0.12)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// ── Tilt Card ─────────────────────────────────────────────────────────────────
const TiltCard = ({ children }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale3d(1.04,1.04,1.04)`;
  };

  const handleLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.15s ease", willChange: "transform" }}
    >
      {children}
    </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = ({ darkModeFirst }) => {
  const roles = [
    "Creative Web Developer",
    "UI/UX Enthusiast",
    "Graphic Designer",
    "React Developer",
  ];
  const typed = useTypewriter(roles, 90, 2000);

const socialIcons = [
    { icon: FaInstagram, alt: "Instagram", link: "https://www.instagram.com/code_xdesign?igsh=MXF4dHdtdWttMGgzbg==" },
    { icon: FaYoutube,   alt: "Youtube",   link: "https://www.youtube.com/" },
    { icon: FaLinkedin,  alt: "Linkedin",  link: "https://www.linkedin.com/in/malaika-noor-634795407" },
    { icon: FaGithub,    alt: "Github",    link: "https://github.com/malaikanoor-creator" },
];

  const dark = darkModeFirst;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Floating particles */}
      <Particles darkMode={dark} />

      {/* Radial glow blobs */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
          top: "-80px",
          right: "-80px",
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)",
          bottom: "60px",
          left: "-60px",
        }}
      />

      <div className="container mx-auto flex px-4 sm:px-8 lg:px-14 py-12 lg:py-24 flex-col lg:flex-row items-center justify-between mt-10 z-10 relative">

        {/* ── LEFT ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left mb-12"
        >
          {/* Social icons */}
          <div className="flex gap-5 mb-6">
            {socialIcons.map((s, i) => (
              <motion.a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.25, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
              >
                <s.icon size={32} color={dark ? "white" : "#374151"} />
              </motion.a>
            ))}
          </div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`italic text-sm mt-2 mb-4 ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            "Design is not just what it looks like — it's how it feels."
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 ${dark ? "text-white" : "text-gray-900"}`}
          >
            Hi, I'm{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Malaika
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl font-semibold mb-5 h-8"
            style={{ color: "#f97316" }}
          >
            {typed}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.1em",
                background: "#f97316",
                marginLeft: "3px",
                verticalAlign: "middle",
                animation: "blink 0.8s step-end infinite",
              }}
            />
            <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className={`mb-6 max-w-md leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}
          >
            Creative Web Developer & Graphic Designer crafting modern,
            responsive, and visually engaging digital experiences.
          </motion.p>

          {/* Buttons row 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 mb-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.07, boxShadow: "0 0 28px rgba(249,115,22,0.55)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-white rounded-full font-semibold"
              style={{ background: "linear-gradient(to right, #f97316, #f59e0b)" }}
            >
              Hire Me
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.07, backgroundColor: "#f97316", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 border-2 border-orange-500 rounded-full font-semibold transition-colors duration-300 ${dark ? "text-white" : "text-gray-900"}`}
            >
              View Work
            </motion.a>
          </motion.div>

          {/* Buttons row 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href={CV}
              download
              whileHover={{ scale: 1.06, boxShadow: "0 0 32px rgba(249,115,22,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center text-white py-3 px-6 rounded-full text-base font-semibold"
              style={{ background: "linear-gradient(to right, #f97316, #f59e0b)" }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06, backgroundColor: "#f97316", color: "#fff", boxShadow: "0 0 32px rgba(249,115,22,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center justify-center border-2 border-orange-500 bg-transparent py-3 px-6 rounded-full text-base font-semibold transition-all duration-300 ${dark ? "text-white" : "text-gray-900"}`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT (Image + Tilt) ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="lg:w-1/2 w-full max-w-md lg:max-w-lg flex justify-center"
        >
          <TiltCard>
            <div className="relative w-4/5 sm:w-3/4 lg:w-full mx-auto">
              {/* Glow ring behind image */}
              <div
                style={{
                  position: "absolute",
                  inset: "-12px",
                  borderRadius: "1rem",
                  background: "conic-gradient(from 0deg, #f97316, #f59e0b, #f97316)",
                  opacity: 0.25,
                  filter: "blur(18px)",
                  zIndex: 0,
                  animation: "spin 8s linear infinite",
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

              <div className="relative overflow-hidden rounded-2xl shadow-2xl z-10">
                <img
                  src={heroImg}
                  alt="Hero"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
                {/* Shimmer overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Hi badge */}
              <motion.img
                src={hi}
                alt="Hi"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-90 z-20"
              />

              {/* Floating badge — experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
                style={{
                  position: "absolute",
                  bottom: "-16px",
                  left: "-16px",
                  background: dark
                    ? "linear-gradient(135deg, #1f2937, #111827)"
                    : "white",
                  border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                  zIndex: 20,
                  backdropFilter: "blur(8px)",
                }}
              >
                <p style={{ color: "#f97316", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>1+</p>
                <p style={{ color: dark ? "#d1d5db" : "#6b7280", fontSize: "0.75rem", margin: 0 }}>
                  Years Experience
                </p>
              </motion.div>

              {/* Floating badge — projects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, type: "spring" }}
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "-20px",
                  background: dark
                    ? "linear-gradient(135deg, #1f2937, #111827)"
                    : "white",
                  border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                  zIndex: 20,
                  backdropFilter: "blur(8px)",
                }}
              >
                <p style={{ color: "#f97316", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>10+</p>
                <p style={{ color: dark ? "#d1d5db" : "#6b7280", fontSize: "0.75rem", margin: 0 }}>
                  Projects Done
                </p>
              </motion.div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;