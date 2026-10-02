import { motion } from "motion/react";
import { Fragment, type ReactNode } from "react";
import type { SectionCopy } from "../data/types";

/** Renders "title + gradient highlight"; a newline in the title becomes a line break. */
export function GradientTitle({ title, highlight }: { title: string; highlight: string }) {
  const lines = title.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
      {highlight && (
        <>
          {lines[lines.length - 1] ? " " : ""}
          <span className="text-gradient">{highlight}</span>
        </>
      )}
    </>
  );
}

type Props = {
  copy: SectionCopy;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({ copy, align = "left", children }: Props) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 md:mb-20 ${centered ? "text-center mx-auto" : ""} max-w-2xl`}
    >
      <span className="eyebrow mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(122,162,255,0.9)]" />
        {copy.eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.02em] mt-6">
        <GradientTitle title={copy.title} highlight={copy.highlight} />
      </h2>
      {copy.description && (
        <p className={`text-text-muted text-lg leading-relaxed mt-6 ${centered ? "mx-auto" : ""} max-w-xl`}>
          {copy.description}
        </p>
      )}
      {children}
    </motion.div>
  );
}
