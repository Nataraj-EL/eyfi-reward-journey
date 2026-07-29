"use client";

import * as React from "react";
import { RewardChest } from "./RewardChest";
import { MilestoneStatus } from "@/utils/progression";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

export interface MilestoneNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  registrationsRequired: number;
  status: MilestoneStatus;
  isSelected?: boolean;
  onNodeClick?: () => void;
}

export const MilestoneNode: React.FC<MilestoneNodeProps> = ({
  className,
  name,
  registrationsRequired,
  status,
  isSelected = false,
  onNodeClick,
  ...props
}) => {
  const isLocked = status === "locked";
  const isActive = status === "active";
  const isUnlocked = status === "unlocked";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 relative z-10 select-none transition-all duration-300 w-24 h-[148px] flex-shrink-0",
        isSelected && "scale-105",
        className
      )}
      {...props}
    >
      {/* Registrations Badge */}
      <div className="h-5 flex items-center justify-center flex-shrink-0">
        <Badge
          variant={isUnlocked ? "success" : isActive ? "primary" : "outline"}
          glow={isActive || isUnlocked}
          className={cn(
            "font-mono text-[10px] tracking-tight",
            isLocked && "text-neutral-500 border-neutral-800"
          )}
        >
          {registrationsRequired} Scouts
        </Badge>
      </div>

      {/* Interactive Reward Chest */}
      <button
        onClick={onNodeClick}
        aria-label={`Milestone: ${name}. Required registrations: ${registrationsRequired}. Status: ${status}`}
        className={cn(
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl flex-shrink-0 h-16 w-16",
          isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-black"
        )}
      >
        <RewardChest status={status} size="md" />
      </button>

      {/* Milestone Title */}
      <div className="text-center h-10 flex items-start justify-center overflow-hidden flex-shrink-0">
        <p
          className={cn(
            "text-xs font-bold leading-tight",
            isUnlocked && "text-emerald-400",
            isActive && "text-primary",
            isLocked && "text-neutral-500"
          )}
        >
          {name}
        </p>
      </div>
    </div>
  );
};

MilestoneNode.displayName = "MilestoneNode";
