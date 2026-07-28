"use client";

import * as React from "react";
import { MascotDisplay } from "@/components/ui/MascotDisplay";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, Lock, Gift, Star } from "lucide-react";
import { cn } from "@/utils/cn";
import { MilestoneStatus } from "@/utils/progression";

export interface RewardPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  registrationsRequired: number;
  mascotPath: string;
  rewardText: string;
  description: string;
  perks: string[];
  status: MilestoneStatus;
  currentRegistrations: number;
}

export const RewardPreview: React.FC<RewardPreviewProps> = ({
  className,
  name,
  registrationsRequired,
  mascotPath,
  rewardText,
  description,
  perks,
  status,
  currentRegistrations,
  ...props
}) => {
  const isLocked = status === "locked";
  const isActive = status === "active";
  const isUnlocked = status === "unlocked";

  const registrationsRemaining = Math.max(registrationsRequired - currentRegistrations, 0);

  return (
    <div
      className={cn(
        "glass-panel rounded-2xl p-6 border border-neutral-900 bg-neutral-950/40 backdrop-blur-md flex flex-col gap-5 w-full transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Header Banner info */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
            Milestone Details
          </span>
          <h3 className="text-xl font-extrabold text-foreground tracking-tight mt-0.5">
            {name}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {isLocked && (
            <Badge variant="outline" className="text-neutral-500 border-neutral-800 gap-1 select-none">
              <Lock size={11} aria-hidden="true" /> Locked
            </Badge>
          )}
          {isActive && (
            <Badge variant="primary" glow className="gap-1 animate-pulse-slow select-none">
              <Star size={11} aria-hidden="true" /> Next Up
            </Badge>
          )}
          {isUnlocked && (
            <Badge variant="success" glow className="gap-1 select-none">
              <Check size={11} aria-hidden="true" /> Unlocked
            </Badge>
          )}
        </div>
      </div>

      {/* Mascot visual preview */}
      <div className="flex items-center justify-center py-6 bg-neutral-900/50 rounded-xl border border-neutral-900/80 relative overflow-hidden group">
        {isLocked && (
          <div className="absolute top-2 right-2 p-1.5 bg-black/80 rounded-lg border border-neutral-900 text-neutral-500 z-20" aria-hidden="true">
            <Lock size={12} />
          </div>
        )}
        <div className={cn("absolute inset-0 z-10", isLocked && "bg-black/30 backdrop-blur-[1px]")} />
        
        <MascotDisplay
          src={mascotPath}
          alt={`${name} Mascot Illustration`}
          size="md"
          float={!isLocked}
          glowColor={isActive ? "primary" : isUnlocked ? "accent" : "none"}
          className={cn("transition-all duration-300 z-10", isLocked && "opacity-40")}
        />
      </div>

      {/* Description & Requirements */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider select-none">
          Milestone Overview
        </h4>
        <p className="text-xs text-neutral-300 leading-relaxed">
          {description}
        </p>

        {/* Action guidelines */}
        {isLocked && (
          <div className="p-3 bg-neutral-900/50 rounded-lg border border-neutral-850 text-xs text-neutral-400 mt-2 select-none">
            🚀 Activate <strong className="text-accent font-mono">{registrationsRemaining}</strong> more scouts on campus to unlock.
          </div>
        )}
        {isActive && (
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-xs text-primary mt-2 select-none">
            ⭐ You are currently working toward this level!
          </div>
        )}
        {isUnlocked && (
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-xs text-emerald-400 mt-2 select-none">
            ✅ Completed. All benefits are successfully unlocked!
          </div>
        )}
      </div>

      {/* Perks List */}
      <div className="flex-grow space-y-2.5">
        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider select-none flex items-center gap-1.5">
          <Gift size={12} className="text-primary" /> Unlocks & Perks
        </h4>
        <ul className="space-y-2" aria-label={`Perks for ${name}`}>
          {perks.map((perk, idx) => (
            <li key={idx} className="text-xs flex items-start gap-2.5 text-foreground/90 leading-normal">
              <span className={cn(
                "h-1.5 w-1.5 rounded-full flex-shrink-0 mt-1.5",
                isUnlocked ? "bg-emerald-400" : isActive ? "bg-primary" : "bg-neutral-600"
              )} aria-hidden="true" />
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Action Button */}
      <div className="pt-2">
        {isUnlocked ? (
          <Button variant="glass" className="w-full border-emerald-500/25 text-emerald-400" disabled>
            <Check size={14} className="mr-1.5" /> Level Unlocked
          </Button>
        ) : isActive ? (
          <Button variant="primary" className="w-full font-bold shadow-[0_0_20px_rgba(163,230,53,0.2)]">
            Track Progress
          </Button>
        ) : (
          <Button variant="outline" className="w-full text-neutral-500 border-neutral-900" disabled>
            <Lock size={14} className="mr-1.5" /> Locked
          </Button>
        )}
      </div>

    </div>
  );
};

RewardPreview.displayName = "RewardPreview";
