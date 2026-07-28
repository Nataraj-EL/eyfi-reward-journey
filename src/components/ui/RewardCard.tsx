"use client";

import * as React from "react";
import { GlassCard } from "./GlassCard";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { MascotDisplay } from "./MascotDisplay";
import { Check, Lock } from "lucide-react";
import { cn } from "@/utils/cn";

export interface RewardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  pointsRequired: number;
  mascotPath: string;
  description: string;
  rewards: string[];
  status?: "locked" | "available" | "claimed";
  onClaim?: () => void;
  claimLoading?: boolean;
}

export const RewardCard: React.FC<RewardCardProps> = ({
  className,
  name,
  pointsRequired,
  mascotPath,
  description,
  rewards,
  status = "locked",
  onClaim,
  claimLoading = false,
  ...props
}) => {
  const isLocked = status === "locked";
  const isClaimed = status === "claimed";
  const isAvailable = status === "available";

  return (
    <GlassCard
      className={cn(
        "flex flex-col gap-5 p-6 border transition-all duration-300",
        isClaimed && "border-emerald-500/20 bg-emerald-500/5",
        isAvailable && "border-primary/20 glow-primary/5",
        className
      )}
      hoverEffect={isAvailable}
      {...props}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 className="text-lg font-bold text-foreground tracking-tight">{name}</h4>
          <span className="text-xs text-neutral-500 font-mono">
            {pointsRequired.toLocaleString()} Points
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {isLocked && (
            <Badge variant="outline" className="text-neutral-500 border-neutral-700/30 gap-1">
              <Lock size={12} aria-hidden="true" />
              Locked
            </Badge>
          )}
          {isAvailable && (
            <Badge variant="primary" glow className="gap-1 animate-pulse-slow">
              Ready to Claim
            </Badge>
          )}
          {isClaimed && (
            <Badge variant="success" glow className="gap-1">
              <Check size={12} aria-hidden="true" />
              Claimed
            </Badge>
          )}
        </div>
      </div>

      {/* Mascot Preview Container */}
      <div className="flex items-center justify-center py-4 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-xl border border-border/5">
        <MascotDisplay
          src={mascotPath}
          alt={`${name} Mascot`}
          size="sm"
          float={!isLocked}
          glowColor={isAvailable ? "primary" : isClaimed ? "accent" : "none"}
        />
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed min-h-[40px]">
        {description}
      </p>

      {/* Rewards List */}
      <div className="flex-grow">
        <h5 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 select-none">
          Included Rewards
        </h5>
        <ul className="space-y-1.5" aria-label="Tier Rewards">
          {rewards.map((reward, idx) => (
            <li
              key={idx}
              className="text-xs flex items-center gap-2 text-foreground/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
              {reward}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        {isLocked && (
          <Button variant="outline" size="sm" className="w-full" disabled>
            <Lock size={14} className="mr-1.5" aria-hidden="true" />
            Locked
          </Button>
        )}
        {isAvailable && (
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={onClaim}
            isLoading={claimLoading}
          >
            Claim Tier Rewards
          </Button>
        )}
        {isClaimed && (
          <Button variant="glass" size="sm" className="w-full border-emerald-500/25 text-emerald-500" disabled>
            <Check size={14} className="mr-1.5" aria-hidden="true" />
            Rewards Claimed
          </Button>
        )}
      </div>
    </GlassCard>
  );
};

RewardCard.displayName = "RewardCard";
