"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Lock, Check, Gift } from "lucide-react";
import { cn } from "@/utils/cn";
import { MilestoneStatus } from "@/utils/progression";

export interface RewardChestProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  status: MilestoneStatus;
  size?: "sm" | "md" | "lg";
}

export const RewardChest: React.FC<RewardChestProps> = ({
  className,
  status,
  size = "md",
  ...props
}) => {
  const isLocked = status === "locked";
  const isActive = status === "active";
  const isUnlocked = status === "unlocked";

  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  const containerStyles = cn(
    "relative flex items-center justify-center rounded-xl border transition-all duration-300 select-none",
    isLocked && "bg-neutral-900 border-neutral-800 text-neutral-600 opacity-60",
    isActive && "bg-primary/10 border-primary shadow-[0_0_20px_rgba(163,230,53,0.2)] text-primary cursor-pointer",
    isUnlocked && "bg-emerald-500/10 border-emerald-500 text-emerald-500 cursor-pointer",
    sizeClasses[size],
    className
  );

  return (
    <motion.div
      className={containerStyles}
      whileHover={!isLocked ? { scale: 1.1, rotate: [0, -3, 3, -3, 0] } : undefined}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Icon Content */}
      <div className="z-10 relative">
        {isLocked && <Lock size={18} aria-hidden="true" />}
        {isActive && <Gift size={24} className="animate-bounce" aria-hidden="true" />}
        {isUnlocked && <Check size={22} className="stroke-[3]" aria-hidden="true" />}
      </div>

      {/* Decorative background glow for active next milestone */}
      {isActive && (
        <span className="absolute inset-0 rounded-xl bg-primary/10 animate-ping opacity-75" aria-hidden="true" />
      )}
    </motion.div>
  );
};

RewardChest.displayName = "RewardChest";
