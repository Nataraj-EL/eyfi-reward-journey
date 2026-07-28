"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  showValue?: boolean;
  color?: "primary" | "secondary" | "accent";
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      showValue = false,
      color = "primary",
      ...props
    },
    ref
  ) => {
    // Normalize percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const colors = {
      primary: "bg-gradient-to-r from-primary to-primary/80 glow-primary/20",
      secondary: "bg-gradient-to-r from-secondary to-secondary/80",
      accent: "bg-gradient-to-r from-accent to-accent/80 glow-accent/20",
    };

    return (
      <div
        ref={ref}
        className={cn("w-full flex flex-col gap-2", className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <div className="flex justify-between items-center text-xs font-semibold select-none">
          {showValue && (
            <span className="text-neutral-500">Progress</span>
          )}
          {showValue && (
            <span className="text-foreground font-mono">{Math.round(percentage)}%</span>
          )}
        </div>
        
        <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-850 rounded-full overflow-hidden border border-border/10">
          <motion.div
            className={cn("h-full rounded-full", colors[color])}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";
