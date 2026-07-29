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
    <div className={`flex gap-6 ${className}`} {...props}>
      {/* Scout Registration Card */}
      <GlassCard className="flex flex-col justify-between p-5 w-full max-w-sm" hoverEffect>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs text-neutral-400 font-semibold block mb-1">
              Registrations
            </span>
            <strong className="text-3xl font-black text-foreground">
              {scoutsRegisteredCount}
            </strong>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg text-primary" aria-hidden="true">
            <Users size={18} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

MetricsGrid.displayName = "MetricsGrid";
