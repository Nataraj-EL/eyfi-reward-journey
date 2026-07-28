"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface MascotDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  glowColor?: "primary" | "accent" | "secondary" | "none";
  float?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export const MascotDisplay: React.FC<MascotDisplayProps> = ({
  className,
  src,
  alt,
  glowColor = "none",
  float = true,
  size = "md",
  ...props
}) => {
  const sizes = {
    sm: "w-20 h-20",
    md: "w-36 h-36",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };

  const glows = {
    primary: "shadow-[0_0_40px_rgba(99,102,241,0.25)] bg-primary/5 border-primary/20",
    secondary: "shadow-[0_0_40px_rgba(244,63,94,0.2)] bg-secondary/5 border-secondary/20",
    accent: "shadow-[0_0_40px_rgba(245,158,11,0.25)] bg-accent/5 border-accent/20",
    none: "border-transparent",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border flex items-center justify-center p-4 transition-all duration-300",
        glows[glowColor],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Background radial glow */}
      {glowColor !== "none" && (
        <div
          className={cn(
            "absolute inset-4 rounded-full blur-xl opacity-30 pointer-events-none z-0",
            glowColor === "primary" && "bg-primary",
            glowColor === "secondary" && "bg-secondary",
            glowColor === "accent" && "bg-accent"
          )}
        />
      )}

      {/* Floating Animated Mascot Wrapper */}
      <motion.div
        className={cn("relative w-full h-full z-10", float && "animate-float")}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Image
          src={`${src}?v=2`}
          alt={alt}
          fill
          sizes="(max-width: 768px) 150px, 300px"
          priority
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};

MascotDisplay.displayName = "MascotDisplay";
