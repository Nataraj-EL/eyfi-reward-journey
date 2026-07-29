"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface RewardPathProps extends React.HTMLAttributes<HTMLDivElement> {
  progressPercentage: number; // 0 to 100
}

export const RewardPath: React.FC<RewardPathProps> = ({
  className,
  progressPercentage,
  ...props
}) => {
  return (
    <div
      className={cn(
        "absolute top-[80px] left-[48px] right-[48px] h-3 z-0 pointer-events-none",
        className
      )}
      {...props}
    >
      <svg className="w-full h-full overflow-visible" fill="none">
        {/* Glow Filter definition */}
        <defs>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Background/Upcoming Line (Muted Gray) */}
        <line
          x1="0"
          y1="6"
          x2="100%"
          y2="6"
          stroke="#1f1f1f"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 2. Completed + Active Progress Line (Glowing EYFI Green) */}
        <motion.line
          x1="0"
          y1="6"
          x2={`${progressPercentage}%`}
          y2="6"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#neon-glow)"
          initial={{ x2: "0%" }}
          animate={{ x2: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* 3. Animated head glow/fill marker */}
        {progressPercentage > 0 && progressPercentage < 100 && (
          <motion.circle
            cx={`${progressPercentage}%`}
            cy="6"
            r="6"
            fill="#FFFFFF"
            filter="drop-shadow(0 0 8px var(--primary))"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </svg>
    </div>
  );
};

RewardPath.displayName = "RewardPath";
