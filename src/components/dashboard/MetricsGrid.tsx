"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Users, ShieldCheck, Activity } from "lucide-react";

export interface MetricsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  scoutsRegisteredCount: number;
  targetScouts: number;
  verificationRate: number;
  waveActive: number;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  className,
  scoutsRegisteredCount,
  targetScouts,
  verificationRate,
  waveActive,
  ...props
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 ${className}`} {...props}>
      {/* Scout Registration Card */}
      <GlassCard className="flex flex-col justify-between p-5" hoverEffect>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs text-neutral-400 font-semibold block mb-1">
              Registered Scouts
            </span>
            <strong className="text-3xl font-black text-foreground">
              {scoutsRegisteredCount} <span className="text-sm font-normal text-neutral-500">/ {targetScouts}</span>
            </strong>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg text-primary" aria-hidden="true">
            <Users size={18} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-neutral-500">Milestone Progress</span>
          <span className="font-semibold text-primary">
            {Math.round((scoutsRegisteredCount / targetScouts) * 100)}% Complete
          </span>
        </div>
      </GlassCard>

      {/* Verification Rate Card */}
      <GlassCard className="flex flex-col justify-between p-5" hoverEffect>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs text-neutral-400 font-semibold block mb-1">
              Verification Rate
            </span>
            <strong className="text-3xl font-black text-emerald-500 font-mono">
              {verificationRate}%
            </strong>
          </div>
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500" aria-hidden="true">
            <ShieldCheck size={18} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-neutral-500">Scout Validity status</span>
          <Badge variant="success" className="px-1.5 py-0">High trust</Badge>
        </div>
      </GlassCard>

      {/* Active Wave Card */}
      <GlassCard className="flex flex-col justify-between p-5" hoverEffect>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs text-neutral-400 font-semibold block mb-1">
              Active Campaign Wave
            </span>
            <strong className="text-3xl font-black text-foreground">
              Wave 0{waveActive}
            </strong>
          </div>
          <div className="p-2 bg-accent/10 rounded-lg text-accent" aria-hidden="true">
            <Activity size={18} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-neutral-500">Status</span>
          <span className="font-semibold text-accent animate-pulse">Running live</span>
        </div>
      </GlassCard>
    </div>
  );
};

MetricsGrid.displayName = "MetricsGrid";
