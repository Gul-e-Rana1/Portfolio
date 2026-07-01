import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const t = currentStep / steps;
      // Ease-in-out: slow start, fast middle, slow end
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setProgress(Math.min(eased * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute w-[700px] h-[700px] bg-accent-purple/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, type: "spring", stiffness: 220, damping: 18 }}
          className="text-5xl font-heading font-bold tracking-tighter"
        >
          G<span className="text-accent-purple">R</span>.
        </motion.div>

        {/* Percentage counter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-7xl md:text-8xl font-heading font-bold text-white tabular-nums leading-none"
        >
          {Math.round(progress)}
          <span className="text-accent-purple text-5xl ml-1">%</span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-48 h-px bg-white/10 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 0.5 }}
          className="text-xs tracking-[0.35em] uppercase font-medium text-white"
        >
          Loading Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
}
