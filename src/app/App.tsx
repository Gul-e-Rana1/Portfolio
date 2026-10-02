import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhyWorkWithMe } from "./components/WhyWorkWithMe";
import { Metrics } from "./components/Metrics";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { EducationAchievements } from "./components/EducationAchievements";
import { Process } from "./components/Process";
import { Contact, Footer } from "./components/ContactFooter";
import { CustomCursor } from "./components/CustomCursor";
import { useContentReady } from "./content/ContentContext";
import { startTracking } from "./lib/analytics";

export default function App() {
  const ready = useContentReady();

  useEffect(() => {
    startTracking();
  }, []);

  return (
    <div className="bg-dark min-h-screen overflow-x-clip text-fg font-sans md:cursor-none">
      <div className="atmosphere" />
      <div className="grain" />
      <CustomCursor />
      <Analytics />
      {ready && (

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <WhyWorkWithMe />
          <Metrics />
          <Projects />
          <Skills />
          <Experience />
          <EducationAchievements />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
      )}
    </div>
  );
}
