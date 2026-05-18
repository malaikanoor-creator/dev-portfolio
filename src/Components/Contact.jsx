import React from "react";
import { motion } from "framer-motion";
import contactImg from "../assets/contacts.png";

const Contact = ({ darkModeFirst }) => {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        background: darkModeFirst
          ? "linear-gradient(135deg, #0f172a, #020617)"
          : "#f8fafc",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.15), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-5 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{
              color: darkModeFirst ? "white" : "#1f2937",
            }}
          >
            Get In{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Touch
            </span>
          </h2>

          <p
            className="mt-3"
            style={{
              color: darkModeFirst ? "#cbd5e1" : "#6b7280",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Got an idea, a project, or just want to say hi? Let’s create
            something amazing together.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE (3D + ANIMATION) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div style={{ perspective: "1000px" }}>
              <img
                src={contactImg}
                alt="contact"
                className="w-72 md:w-[420px]"
                style={{
                  transform: "rotateY(-8deg) rotateX(5deg)",
                  transition: "0.5s ease",
                  filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.25))",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform =
                    "rotateY(0deg) rotateX(0deg) scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform =
                    "rotateY(-8deg) rotateX(5deg)")
                }
              />
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border"
            style={{
              background: darkModeFirst
                ? "rgba(17,24,39,0.7)"
                : "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: darkModeFirst
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
            }}
          >
            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg outline-none"
                style={{
                  background: darkModeFirst ? "#111827" : "#fff",
                  color: darkModeFirst ? "white" : "#111827",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg outline-none"
                style={{
                  background: darkModeFirst ? "#111827" : "#fff",
                  color: darkModeFirst ? "white" : "#111827",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-lg outline-none"
                style={{
                  background: darkModeFirst ? "#111827" : "#fff",
                  color: darkModeFirst ? "white" : "#111827",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white"
                style={{
                  background: "linear-gradient(to right, #f97316, #f59e0b)",
                  boxShadow: "0 10px 25px rgba(249,115,22,0.25)",
                }}
              >
                Send Message
              </motion.button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;