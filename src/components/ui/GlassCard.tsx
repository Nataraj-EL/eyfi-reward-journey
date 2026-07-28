"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";
import { hoverScale } from "@/animations/variants";

export interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  hoverEffect?: boolean;
  glowColor?: "primary" | "accent" | "secondary" | "none";
  borderGlow?: boolean;
  children?: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      hoverEffect = false,
      glowColor = "none",
      borderGlow = false,
      children,
      ...props
    },
    ref
  ) => {
    const glowClasses = {
      primary: "glow-primary border-primary/20",
      secondary: "border-secondary/20 shadow-[0_0_20px_rgba(244,63,94,0.15)]",
      accent: "glow-accent border-accent/20",
      none: "border-white/10 dark:border-white/5",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-panel-light dark:glass-panel rounded-2xl p-6 transition-colors duration-300 relative overflow-hidden",
          borderGlow && "border-2",
          glowClasses[glowColor],
          className
        )}
        variants={hoverEffect ? hoverScale : undefined}
        initial={hoverEffect ? "rest" : undefined}
        whileHover={hoverEffect ? "hover" : undefined}
        whileTap={hoverEffect ? "tap" : undefined}
        {...props}
      >
        {/* Subtle inner card light overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
