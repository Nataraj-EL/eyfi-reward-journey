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
        "absolute top-[78px] left-[5%] right-[5%] h-1 bg-neutral-900 rounded-full overflow-hidden border border-neutral-950 z-0",
        className
      )}
      {...props}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-primary-foreground shadow-[0_0_10px_rgba(163,230,53,0.5)] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};

RewardPath.displayName = "RewardPath";
