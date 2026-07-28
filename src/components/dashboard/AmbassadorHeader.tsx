"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Trophy, School, Award } from "lucide-react";

export interface AmbassadorHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  university: string;
  rank: number;
  totalPoints: number;
  avatarPlaceholderText?: string;
}

export const AmbassadorHeader: React.FC<AmbassadorHeaderProps> = ({
  className,
  name,
  university,
  rank,
  totalPoints,
  avatarPlaceholderText = "AS",
  ...props
}) => {
  return (
    <GlassCard
      className={className}
      borderGlow
      glowColor="primary"
      {...props}
    >
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
        
        {/* Profile Meta info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Stylized Glassmorphic Avatar Circle */}
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white text-xl shadow-lg border border-white/20 select-none">
            {avatarPlaceholderText}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h3 className="text-xl font-bold tracking-tight text-foreground">{name}</h3>
              <Badge variant="primary" glow className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5">
                Active Contributor
              </Badge>
            </div>
            <p className="text-xs text-neutral-400 flex items-center gap-1.5 justify-center sm:justify-start mt-1">
              <School size={13} className="text-neutral-500" aria-hidden="true" />
              {university}
            </p>
          </div>
        </div>

        {/* Level Stats Summary */}
        <div className="flex gap-4 items-center w-full sm:w-auto border-t border-neutral-900 pt-4 sm:pt-0 sm:border-0 justify-around">
          
          <div className="flex flex-col items-center sm:items-end">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
              <Trophy size={11} className="text-accent" aria-hidden="true" /> Campus Rank
            </span>
            <strong className="text-2xl font-black text-foreground">#{rank}</strong>
          </div>
          
          <div className="h-8 w-px bg-neutral-850 hidden sm:block" />

          <div className="flex flex-col items-center sm:items-end">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
              <Award size={11} className="text-primary" aria-hidden="true" /> Accumulated Points
            </span>
            <strong className="text-2xl font-black text-primary font-mono">{totalPoints.toLocaleString()}</strong>
          </div>

        </div>

      </div>
    </GlassCard>
  );
};

AmbassadorHeader.displayName = "AmbassadorHeader";
