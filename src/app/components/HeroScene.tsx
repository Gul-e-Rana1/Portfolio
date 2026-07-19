import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

function RotatingTorusKnot({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.22;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export default function HeroScene() {
  const { theme } = useTheme();
  const [active, setActive] = useState(!document.hidden);
  const color = theme === "dark" ? "#8b5cf6" : "#6d28d9";

  useEffect(() => {
    const onVisibilityChange = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 4], fov: 45 }}
      frameloop={active ? "always" : "demand"}
      style={{ pointerEvents: "none" }}
    >
      <RotatingTorusKnot color={color} />
    </Canvas>
  );
}
