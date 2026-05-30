import React, { useState } from "react";
import { motion } from "framer-motion";
import contactImg from "../assets/contacts.png";

const Contact = ({ darkModeFirst }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const encoded = new URLSearchParams({
      "form-name": "contact",
      ...formData,
    }).toString();

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded,
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: darkModeFirst ? "#111827" : "#fff",
    color: darkModeFirst ? "white" : "#111827",
    border: "1px solid rgba(249,115,22,0.2)",
  };

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

      {/*
        Hidden HTML form required for Netlify to detect the form at build time.
        This is necessary because the real form is rendered by React (JS),
        so Netlify's bot can't find it in the raw HTML without this.
      */}
      <form name="contact" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message" />
      </form>

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
            style={{ color: darkModeFirst ? "white" : "#1f2937" }}
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
            Got an idea, a project, or just want to say hi? Let's create
            something amazing together.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE */}
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
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div
                  style={{
                    fontSize: 48,
                    marginBottom: 16,
                  }}
                >
                  🎉
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: darkModeFirst ? "white" : "#1f2937" }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: darkModeFirst ? "#cbd5e1" : "#6b7280" }}>
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-6 py-2 rounded-lg font-medium text-white"
                  style={{
                    background: "linear-gradient(to right, #f97316, #f59e0b)",
                  }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg outline-none"
                  style={inputStyle}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg outline-none"
                  style={inputStyle}
                />

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg outline-none"
                  style={inputStyle}
                />

                {status === "error" && (
                  <p style={{ color: "#ef4444", fontSize: 14 }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 rounded-lg font-semibold text-white"
                  style={{
                    background: "linear-gradient(to right, #f97316, #f59e0b)",
                    boxShadow: "0 10px 25px rgba(249,115,22,0.25)",
                    opacity: status === "sending" ? 0.7 : 1,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </motion.button>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;