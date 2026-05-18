import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Education from "./Components/Education";
import Contact from "./Components/Contact";
import DesignWork from "./Components/DesignWork";
const App = () => {
  const [darkModeFirst, setdarkMode] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,       
      offset: 120,
      easing: "ease-in-out",
    });
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setdarkMode((prev) => {
      const newMode = !prev;

      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newMode;
    });
  };

  return (
    <div
      className={
        darkModeFirst
          ? "bg-linear-to-br from-gray-900 via-[#0d182e] to-gray-900 min-h-screen"
          : "bg-linear-to-br from-gray-50 to-blue-50 min-h-screen"
      }
    >
      <Navbar darkModeFirst={darkModeFirst} toggleDarkMode={toggleDarkMode} />

      <Hero darkModeFirst={darkModeFirst} />
      <About darkModeFirst={darkModeFirst} />
      <Skills darkModeFirst={darkModeFirst} />
      <Projects darkModeFirst={darkModeFirst} />
      <DesignWork darkModeFirst={darkModeFirst} />
      <Education darkModeFirst={darkModeFirst} />
      <Contact darkModeFirst={darkModeFirst} />
    </div>
  );
};

export default App;