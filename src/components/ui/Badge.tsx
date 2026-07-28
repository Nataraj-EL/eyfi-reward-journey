import * as React from "react";
import { cn } from "@/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "outline" | "glass";
  glow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  glow = false,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 select-none";

  const variants = {
    primary: "bg-primary/10 border-primary/20 text-primary",
    secondary: "bg-secondary/10 border-secondary/20 text-secondary",
    accent: "bg-accent/15 border-accent/30 text-accent-foreground dark:text-accent",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
    outline: "border-border bg-transparent text-foreground",
    glass: "glass-panel-light dark:glass-panel text-foreground border-white/10",
  };

  const glows = {
    primary: "shadow-[0_0_10px_rgba(99,102,241,0.25)]",
    secondary: "shadow-[0_0_10px_rgba(244,63,94,0.25)]",
    accent: "shadow-[0_0_10px_rgba(245,158,11,0.3)]",
    success: "shadow-[0_0_10px_rgba(16,185,129,0.25)]",
    outline: "",
    glass: "",
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        glow && glows[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
