import { useEffect } from "react";
import { analytics } from "../lib/firebase";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Contact from "../components/Contact";

export default function App() {
  useEffect(() => {
    // Firebase Analytics is automatically initialized when imported
    // You can add custom analytics events here if needed
    if (analytics) {
      console.log("Firebase Analytics initialized successfully");
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </div>
  );
}