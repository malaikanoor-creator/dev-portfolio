import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = ({ darkModeFirst, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home",      link: "#home"      },
    { name: "About",     link: "#about"     },
    { name: "Skills",    link: "#skills"    },
    { name: "Projects",  link: "#projects"  },
    { name: "Designs",   link: "#designs"   },
    { name: "Education", link: "#education" },
    { name: "Contact",   link: "#contact"   },
  ];

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    navItems.forEach(({ link }) => {
      const el = document.querySelector(link);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const dark = darkModeFirst;

  const navBg = dark
    ? scrolled
      ? "rgba(13,24,46,0.92)"
      : "rgba(17,24,39,0.75)"
    : scrolled
    ? "rgba(255,255,255,0.92)"
    : "rgba(255,241,230,0.80)";

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-center z-50">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: navBg,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: dark
            ? "1px solid rgba(249,115,22,0.15)"
            : "1px solid rgba(249,115,22,0.25)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(249,115,22,0.1)"
            : "0 4px 20px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          padding: scrolled ? "8px 24px" : "10px 24px",
        }}
        className="flex items-center justify-between rounded-2xl w-[90%]"
      >
        {/* LOGO */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="text-xl font-bold"
            style={{ color: dark ? "white" : "#111827" }}
          >
            Portfolio
            <motion.span
              style={{ color: "#f97316" }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              .
            </motion.span>
          </span>
        </motion.a>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.name.toLowerCase();
            return (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setActiveSection(item.name.toLowerCase())}
                className="relative py-1"
              >
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  style={{
                    color: isActive
                      ? "#f97316"
                      : dark
                      ? "#d1d5db"
                      : "#374151",
                    fontWeight: isActive ? 600 : 400,
                    transition: "color 0.2s",
                  }}
                >
                  {item.name}
                </motion.span>

                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "linear-gradient(to right, #f97316, #f59e0b)",
                      borderRadius: 2,
                      boxShadow: "0 0 8px rgba(249,115,22,0.6)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-3">
          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.12, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            style={{
              padding: "8px",
              borderRadius: "50%",
              background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {dark ? (
              <Sun className="w-5 h-5" style={{ color: "#fbbf24" }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: "#374151" }} />
            )}
          </motion.button>

          {/* Hire Me */}
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.07,
              boxShadow: "0 0 22px rgba(249,115,22,0.55)",
            }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block px-5 py-2 rounded-full text-white font-semibold text-sm"
            style={{
              background: "linear-gradient(to right, #f97316, #f59e0b)",
            }}
          >
            Hire Me
          </motion.a>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: dark ? "white" : "#111827",
              }}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "absolute",
              top: "72px",
              width: "90%",
              background: dark ? "rgba(13,24,46,0.96)" : "rgba(255,255,255,0.96)",
              backdropFilter: "blur(20px)",
              borderRadius: "16px",
              border: dark
                ? "1px solid rgba(249,115,22,0.15)"
                : "1px solid rgba(249,115,22,0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}
          >
            <div className="p-4 space-y-1">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.name.toLowerCase();
                return (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setActiveSection(item.name.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      color: isActive ? "#f97316" : dark ? "#d1d5db" : "#374151",
                      background: isActive
                        ? dark
                          ? "rgba(249,115,22,0.1)"
                          : "rgba(249,115,22,0.07)"
                        : "transparent",
                      fontWeight: isActive ? 600 : 400,
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {item.name}
                  </motion.a>
                );
              })}

              <motion.a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                whileTap={{ scale: 0.97 }}
                className="block mt-2 p-3 text-center rounded-xl text-white font-semibold"
                style={{
                  background: "linear-gradient(to right, #f97316, #f59e0b)",
                }}
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;