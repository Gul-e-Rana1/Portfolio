import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Trailing ring eases behind the dot for a soft, premium feel
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  return (
    <div className="hidden md:block">
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent-silver pointer-events-none z-[9999] shadow-[0_0_10px_rgba(201,211,227,0.9)]"
        style={{ x, y }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? "rgba(122,162,255,0.7)" : "rgba(201,211,227,0.3)",
          backgroundColor: isHovering ? "rgba(122,162,255,0.1)" : "rgba(122,162,255,0)",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
