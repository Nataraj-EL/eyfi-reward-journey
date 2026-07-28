"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MascotDisplay } from "@/components/ui/MascotDisplay";
import { Check } from "lucide-react";

export interface LevelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  levelName: string;
  mascotPath: string;
  description: string;
  unlockedBenefits: string[];
}

export const LevelCard: React.FC<LevelCardProps> = ({
  className,
  levelName,
  mascotPath,
  description,
  unlockedBenefits,
  ...props
}) => {
  return (
    <GlassCard className={`flex flex-col md:flex-row gap-6 p-6 ${className}`} hoverEffect={false} {...props}>
      {/* Mascot visual container */}
      <div className="flex items-center justify-center p-4 bg-neutral-900/40 border border-neutral-800 rounded-2xl md:w-1/3 w-full">
        <MascotDisplay
          src={mascotPath}
          alt={`${levelName} Mascot`}
          size="md"
          float
          glowColor="primary"
        />
      </div>

      {/* Level details & Unlocked benefits list */}
      <div className="flex flex-col gap-4 flex-grow md:w-2/3">
        <div>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
            Current Tier Profile
          </span>
          <h4 className="text-2xl font-extrabold text-foreground tracking-tight mt-0.5">
            {levelName}
          </h4>
          <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Benefits checklist */}
        <div className="border-t border-neutral-900 pt-4">
          <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 select-none">
            Unlocked Active Benefits
          </h5>
          <ul className="space-y-2" aria-label="Unlocked Benefits">
            {unlockedBenefits.map((benefit, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2.5 text-foreground/90">
                <span className="p-0.5 bg-emerald-500/10 text-emerald-500 rounded flex-shrink-0 mt-0.5" aria-hidden="true">
                  <Check size={12} />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassCard>
  );
};

LevelCard.displayName = "LevelCard";
