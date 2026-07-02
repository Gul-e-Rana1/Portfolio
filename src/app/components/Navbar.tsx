import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = ["Projects", "Experience", "Skills", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-3xl bg-slate-950/10 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
            scrolled ? "glass" : "bg-transparent"
          }`}>
            <button
              onClick={() => scrollTo("Home")}
              className="flex items-center"
              aria-label="Go to home"
            >
              <img src="/logo.png" alt="Gul-e-Rana logo" className="h-14 w-14 object-contain" />
            </button>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="px-4 py-2 text-sm font-medium text-text-muted hover:text-white transition-colors rounded-full hover:bg-surface"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 glass rounded-xl text-white transition-colors hover:bg-surface-hover"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-dark/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <div className="mb-16">
              <img src="/logo.png" alt="Gul-e-Rana logo" className="h-20 w-20 object-contain" />
            </div>
            <nav className="flex flex-col items-center gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => scrollTo(item)}
                  className="px-8 py-3 text-2xl font-heading font-medium text-white/60 hover:text-white transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
