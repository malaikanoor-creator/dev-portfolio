import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import cps from "../assets/cps.png";
import freelance from "../assets/freelance.png";


const Lightbox = ({ item, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1f2937",
          borderRadius: 20,
          overflow: "hidden",
          maxWidth: 720,
          width: "100%",
          border: "1px solid rgba(249,115,22,0.25)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "100%",
              display: "block",
              maxHeight: "72vh",
              objectFit: "contain",
              background: "#111827",
            }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(0,0,0,0.6)",
              border: "none",
              borderRadius: "50%",
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: "18px 22px" }}>
          <h3
            style={{
              color: "white",
              fontWeight: 700,
              marginBottom: 6,
              fontSize: "1.05rem",
            }}
          >
            {item.title}
          </h3>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "0.88rem",
              lineHeight: 1.6,
            }}
          >
            {item.desc}
          </p>

          <span
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "5px 14px",
              borderRadius: 999,
              background: "rgba(249,115,22,0.15)",
              color: "#f97316",
              fontSize: "0.75rem",
              fontWeight: 600,
              border: "1px solid rgba(249,115,22,0.25)",
            }}
          >
            {item.type}
          </span>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);


const DesignCard = ({ item, dark, index, onOpen }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    el.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${
      -y * 12
    }deg) scale3d(1.03,1.03,1.03)`;
  };

  const handleLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(700px) rotateY(0) rotateX(0) scale3d(1,1,1)";
    }
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.55 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
       onClick={() => window.open(item.behance, "_blank")}
        style={{
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid",
          borderColor: hovered
            ? "rgba(249,115,22,0.4)"
            : dark
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.07)",
          background: dark ? "#1f2937" : "white",
          boxShadow: hovered
            ? "0 24px 60px rgba(249,115,22,0.16)"
            : dark
            ? "0 6px 22px rgba(0,0,0,0.28)"
            : "0 4px 16px rgba(0,0,0,0.06)",
          transition:
            "transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s",
          willChange: "transform",
          cursor: "pointer",
          position: "relative",
        }}
      >
       
        <div
          style={{
            height: 220,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.45s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: hovered
                ? "rgba(0,0,0,0.35)"
                : "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s ease",
            }}
          >
            {hovered && (
              <motion.div
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 380 }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(249,115,22,0.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
               <span
  style={{
    color: "white",
    fontWeight: 600,
    fontSize: "0.9rem",
  }}
>
  View Project ↗
</span>
              </motion.div>
            )}
          </div>
        </div>

      
        <div style={{ padding: 18 }}>
          <h3
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              marginBottom: 7,
              color: dark ? "white" : "#111827",
            }}
          >
            {item.title}
          </h3>

          <p
            style={{
              fontSize: "0.84rem",
              color: dark ? "#9ca3af" : "#6b7280",
              marginBottom: 14,
              lineHeight: 1.6,
            }}
          >
            {item.desc}
          </p>

          <span
            style={{
              display: "inline-block",
              padding: "5px 14px",
              borderRadius: 999,
              background: "rgba(249,115,22,0.14)",
              color: "#f97316",
              fontSize: "0.74rem",
              fontWeight: 700,
              border: "1px solid rgba(249,115,22,0.22)",
            }}
          >
            {item.type}
          </span>
        </div>
      </div>
    </motion.div>
  );
};


const DesignWork = ({ darkModeFirst }) => {
  const dark = darkModeFirst;
  const [lightboxItem, setLightboxItem] = useState(null);

  const designs = [
  {
    id: 1,
    title: "CPS Social Media Posts",
    desc: "Social media creatives for brand consistency, promotions, and audience engagement.",
    image: cps,
    type: "Social Media",
    behance:
      "https://www.behance.net/gallery/250006191/CPS-SOCIAL-MEDIA-BRANDING",
  },
  {
    id: 2,
    title: "Freelance Client Posts",
    desc: "Promotional graphics and digital creatives designed for marketing and visual communication.",
    image: freelance,
   type: "Promotional Design",
    behance:
      "https://www.behance.net/gallery/250006945/Promotional-Creative-Collection",
  },
];

  return (
    <section
      id="designs"
      style={{
        background: dark
          ? "linear-gradient(to bottom right, #0f172a, #020617)"
          : "#f8fafc",
        padding: "90px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >

      <div
        style={{
          position: "absolute",
          left: -80,
          bottom: "18%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container mx-auto px-4 md:px-6"
        style={{ position: "relative" }}
      >
      
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              fontWeight: 800,
              color: dark ? "white" : "#111827",
              marginBottom: 10,
            }}
          >
            Graphic <span style={{ color: "#f97316" }}>Design Work</span>
          </h2>

          <p
            style={{
              color: dark ? "#9ca3af" : "#6b7280",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
         Selected branding and social media projects created for businesses, promotional campaigns, and digital content.
          </p>

          <p
            style={{
              marginTop: 8,
              fontSize: "0.8rem",
              color: dark ? "#6b7280" : "#9ca3af",
            }}
          >
            Click any card to preview ✨
          </p>
        </motion.div>

    
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 340px))",
            justifyContent: "center",
            gap: 28,
            maxWidth: 820,
            margin: "0 auto",
          }}
        >
          {designs.map((item, i) => (
            <DesignCard
              key={item.id}
              item={item}
              dark={dark}
              index={i}
              onOpen={setLightboxItem}
            />
          ))}
        </div>
      </div>

      
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </section>
  );
};

export default DesignWork;