import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useContent } from "../content/ContentContext";

const navItems = [
  { label: "Work", id: "work" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mailto = `mailto:${useContent().settings.contact.email}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pt-4"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div
            className={`flex items-center justify-between rounded-2xl pl-3 pr-2 py-2 transition-all duration-500 ${
              scrolled ? "glass" : "border border-transparent"
            }`}
          >
            <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5" aria-label="Go to home">
              <img src="/logo.png" alt="Gul-e-Rana logo" className="h-9 w-9 object-contain" />
              <span className="hidden sm:block font-heading font-semibold tracking-tight">Gul-e-Rana</span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="px-4 py-2 text-sm text-text-muted hover:text-fg transition-colors duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={mailto}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-dark bg-gradient-to-b from-white to-[#d6deec] shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_8px_24px_-10px_rgba(122,162,255,0.6)] hover:-translate-y-0.5 transition-all duration-500"
              >
                Let's Talk
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 glass rounded-xl text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onClick={() => scrollTo(item.id)}
                  className="px-8 py-3 text-3xl font-heading font-medium text-fg/60 hover:text-fg transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <a href={mailto} className="btn-primary mt-12">
              Let's Talk <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
