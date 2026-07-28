"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MascotDisplay } from "@/components/ui/MascotDisplay";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle, Award, Sparkles, RefreshCw } from "lucide-react";
import { cn } from "@/utils/cn";

export interface RewardCardStackProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  mascotPath: string;
  perks: string[];
  rewardText: string;
  description: string;
}

export const RewardCardStack: React.FC<RewardCardStackProps> = ({
  className,
  name,
  mascotPath,
  perks,
  rewardText,
  description,
  ...props
}) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div
      className={cn(
        "w-[300px] h-[400px] [perspective:1000px] cursor-pointer select-none",
        className
      )}
      onClick={() => setIsFlipped((prev) => !prev)}
      {...props}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        
        {/* CARD FRONT: Mascot Art & Level Title */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full glass-panel border-2 border-primary/30 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-[0_10px_30px_rgba(163,230,53,0.15)] overflow-hidden transition-all duration-300",
            isFlipped ? "opacity-0 pointer-events-none invisible" : "opacity-100 visible"
          )}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Accent Glow backdrop */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

          <div className="w-full flex justify-between items-center z-10">
            <Badge variant="primary" glow className="text-[10px]">
              <Award size={10} className="mr-1" /> COLLECTIBLE CARD
            </Badge>
            <span className="text-[10px] text-neutral-500 font-mono">EYFI AMBASSADOR</span>
          </div>

          {/* Center Mascot display */}
          <div className="my-auto z-10">
            <MascotDisplay
              src={mascotPath}
              alt={`${name} Card Mascot`}
              size="md"
              float
              glowColor="primary"
              className="border-0 bg-transparent p-0 w-32 h-32"
            />
          </div>

          {/* Level Info */}
          <div className="z-10 w-full pb-2">
            <h4 className="text-xl font-black text-foreground tracking-tight">{name}</h4>
            <p className="text-xs text-primary font-bold mt-1 font-mono">{rewardText}</p>
            
            {/* Flip hint */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 mt-4 select-none font-semibold uppercase tracking-wider">
              <RefreshCw size={10} className="animate-spin-slow" />
              <span>Click to reveal perks</span>
            </div>
          </div>
        </div>

        {/* CARD BACK: Unlocked Perks list */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full glass-panel border-2 border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(16,185,129,0.15)] overflow-hidden transition-all duration-300",
            isFlipped ? "opacity-100 visible [transform:rotateY(180deg)]" : "opacity-0 pointer-events-none invisible [transform:rotateY(180deg)]"
          )}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Success gradient backdrop */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="flex justify-between items-center z-10">
            <Badge variant="success" glow className="text-[10px]">
              <Sparkles size={10} className="mr-1" /> LEVEL PERKS
            </Badge>
            <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
              <CheckCircle size={10} /> Active
            </span>
          </div>

          {/* Details list */}
          <div className="z-10 my-auto space-y-4">
            <div>
              <h5 className="text-base font-extrabold text-foreground">{name} Rewards</h5>
              <p className="text-[11px] text-neutral-400 leading-normal mt-1">
                {description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                Active Benefits
              </span>
              <ul className="space-y-1.5" aria-label="Milestone Perks">
                {perks.map((perk, idx) => (
                  <li key={idx} className="text-xs text-slate-355 flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" aria-hidden="true" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Flip back hint */}
          <div className="z-10 text-center flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 select-none font-semibold uppercase tracking-wider border-t border-neutral-900 pt-3">
            <RefreshCw size={10} />
            <span>Click to flip back</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

RewardCardStack.displayName = "RewardCardStack";
