import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MainDashboard } from "@/components/MainDashboard";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    const header = document.querySelector("header");
    const headerHeight = header?.offsetHeight || 64;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setCurrentSection(section);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && ["home", "dashboard", "about"].includes(hash)) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["home", "dashboard", "about"].includes(newHash)) {
        scrollToSection(newHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Header scrollToSection={scrollToSection} currentSection={currentSection} />

      <section id="home" className="min-h-screen scroll-mt-16 md:scroll-mt-20">
        <HeroSection onLaunchDashboard={() => scrollToSection("dashboard")} />
      </section>

      <section id="dashboard" className="min-h-screen scroll-mt-16 md:scroll-mt-20">
        <MainDashboard />
      </section>

      <section id="about" className="min-h-screen scroll-mt-16 md:scroll-mt-20">
        <AboutSection />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
