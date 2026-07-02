import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { EducationAchievements } from "./components/EducationAchievements";
import { Process } from "./components/Process";
import { Contact, Footer } from "./components/ContactFooter";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-dark min-h-screen overflow-x-clip text-white font-sans selection:bg-accent-purple/30 selection:text-white cursor-none">
      <CustomCursor />
      <Analytics />
      
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <EducationAchievements />
            <Process />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
