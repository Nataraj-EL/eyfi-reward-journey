"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Progress } from "@/components/ui/Progress";
import { MascotDisplay } from "@/components/ui/MascotDisplay";
import { Lock, Award } from "lucide-react";

export interface NextMilestoneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  nextLevelName: string;
  nextLevelMascotPath: string;
  pointsRequired: number;
  currentPoints: number;
  pendingBenefits: string[];
}

export const NextMilestoneCard: React.FC<NextMilestoneCardProps> = ({
  className,
  nextLevelName,
  nextLevelMascotPath,
  pointsRequired,
  currentPoints,
  pendingBenefits,
  ...props
}) => {
  const pointsRemaining = Math.max(pointsRequired - currentPoints, 0);

  return (
    <GlassCard className={`flex flex-col md:flex-row gap-6 p-6 ${className}`} hoverEffect={false} {...props}>
      {/* Level details & locked benefits list */}
      <div className="flex flex-col gap-5 flex-grow md:w-2/3 order-2 md:order-1">
        <div>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
            Up Next Milestone
          </span>
          <h4 className="text-2xl font-extrabold text-foreground tracking-tight mt-0.5">
            {nextLevelName}
          </h4>
        </div>

        {/* Milestone Progress Bar */}
        <div className="space-y-2">
          <Progress value={currentPoints} max={pointsRequired} showValue color="accent" />
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1 select-none">
            <Award size={13} className="text-accent" aria-hidden="true" />
            <span>
              Collect <strong className="text-accent font-mono">{pointsRemaining.toLocaleString()}</strong> more points to level up
            </span>
          </div>
        </div>

        {/* Pending Benefits checklist */}
        <div className="border-t border-neutral-900 pt-4">
          <h5 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 select-none flex items-center gap-1.5">
            <Lock size={12} className="text-neutral-500" aria-hidden="true" /> Upcoming Unlockable Rewards
          </h5>
          <ul className="space-y-2" aria-label="Upcoming Rewards">
            {pendingBenefits.map((benefit, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2.5 text-neutral-400">
                <span className="p-0.5 bg-neutral-900 text-neutral-500 rounded flex-shrink-0 mt-0.5 border border-neutral-850" aria-hidden="true">
                  <Lock size={10} />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mascot visual container */}
      <div className="flex items-center justify-center p-4 bg-neutral-900/40 border border-neutral-800 rounded-2xl md:w-1/3 w-full order-1 md:order-2 relative group overflow-hidden">
        {/* Visual Lock Overlay */}
        <div className="absolute top-3 right-3 z-20 p-1.5 bg-black/80 rounded-lg border border-neutral-800 text-neutral-500" aria-hidden="true">
          <Lock size={14} />
        </div>
        <div className="absolute inset-0 bg-black/40 z-10 backdrop-blur-[2px] transition-all duration-300 group-hover:backdrop-blur-none group-hover:bg-black/20" />
        
        <MascotDisplay
          src={nextLevelMascotPath}
          alt={`${nextLevelName} Locked Mascot`}
          size="md"
          float={false}
          glowColor="none"
          className="opacity-45 group-hover:opacity-60 transition-opacity duration-300"
        />
      </div>
    </GlassCard>
  );
};

NextMilestoneCard.displayName = "NextMilestoneCard";
