"use client";

import * as React from "react";
import { REWARD_MILESTONES, RewardMilestone } from "@/data/rewards";
import { MilestoneNode } from "./MilestoneNode";
import { RewardPath } from "./RewardPath";
import { RewardPreview } from "./RewardPreview";
import { RewardUnlock } from "./RewardUnlock";
import { calculateJourneyProgress, getMilestoneStatus, getNextMilestone } from "@/utils/progression";
import { Trophy, Award, Users } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { AmbassadorDashboardData } from "@/data/ambassador";

export interface RewardJourneyProps extends React.HTMLAttributes<HTMLDivElement> {
  ambassadorData: AmbassadorDashboardData;
}

export const RewardJourney: React.FC<RewardJourneyProps> = ({
  className,
  ambassadorData,
  ...props
}) => {
  const currentRegistrations = ambassadorData.metrics.scoutsRegisteredCount;

  // Find initial next milestone
  const nextTargetMilestone = getNextMilestone(currentRegistrations, REWARD_MILESTONES);
  
  // Set local state for active selected milestone details preview
  const [selectedMilestone, setSelectedMilestone] = React.useState<RewardMilestone>(
    nextTargetMilestone || REWARD_MILESTONES[REWARD_MILESTONES.length - 1]
  );

  // States for handling celebratory milestone unlocking experiences
  const [isUnlockOpen, setIsUnlockOpen] = React.useState(false);
  const [unlockMilestone, setUnlockMilestone] = React.useState<RewardMilestone | null>(null);

  // Lifecycle check to automatically trigger celebrate window for newly unlocked milestones
  React.useEffect(() => {
    // Check if there are completed milestones (unlocked status)
    const completedMilestones = REWARD_MILESTONES.filter(
      (m) => getMilestoneStatus(m.id, currentRegistrations, REWARD_MILESTONES) === "unlocked"
    );
    
    // Auto-trigger celebration overlay for the highest unlocked level to simulate newly unlocked state on load
    if (completedMilestones.length > 0) {
      const highestUnlocked = completedMilestones[completedMilestones.length - 1];
      const timer = setTimeout(() => {
        setUnlockMilestone(highestUnlocked);
        setIsUnlockOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentRegistrations]);

  // Compute total horizontal progression percentages
  const progressPercentage = calculateJourneyProgress(currentRegistrations, REWARD_MILESTONES);

  // Compute registrations remaining for next reward
  const registrationsRemaining = nextTargetMilestone 
    ? Math.max(nextTargetMilestone.registrationsRequired - currentRegistrations, 0)
    : 0;

  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-start w-full ${className}`} {...props}>
      
      {/* LEFT: Gamified Horizontal Ladder Map */}
      <GlassCard className="flex-grow w-full lg:w-2/3 p-6 flex flex-col gap-6" hoverEffect={false}>
        
        {/* Header Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Trophy size={18} className="text-primary" /> Rewards Ladder
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Select any level below to review requirements and perks
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="glass" className="font-mono text-xs border-neutral-800 py-1 px-3">
              Total Scouts Active: <strong className="text-primary ml-1">{currentRegistrations}</strong>
            </Badge>
          </div>
        </div>

        {/* Milestone Horizontal Track (overflow scrollable on mobile) */}
        <div className="w-full overflow-x-auto py-8 px-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          <div className="relative min-w-[700px] flex justify-between items-center py-4">
            
            {/* Horizontal Line connector path */}
            <RewardPath progressPercentage={progressPercentage} />

            {/* Render each milestone node dynamically */}
            {REWARD_MILESTONES.map((milestone) => {
              const status = getMilestoneStatus(
                milestone.id,
                currentRegistrations,
                REWARD_MILESTONES
              );

              return (
                <MilestoneNode
                  key={milestone.id}
                  name={milestone.name}
                  registrationsRequired={milestone.registrationsRequired}
                  status={status}
                  isSelected={selectedMilestone.id === milestone.id}
                  onNodeClick={() => {
                    setSelectedMilestone(milestone);
                    if (status === "unlocked") {
                      setUnlockMilestone(milestone);
                      setIsUnlockOpen(true);
                    }
                  }}
                  className="w-24 flex-shrink-0"
                />
              );
            })}

          </div>
        </div>

        {/* Dynamic Road guide subtext details */}
        <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400 select-none">
          <span className="flex items-center gap-2">
            <Award size={14} className="text-primary" />
            <span>Click any chest node to view levels and details.</span>
          </span>
          {nextTargetMilestone ? (
            <span className="flex items-center gap-1.5 text-xs text-slate-300">
              <Users size={12} className="text-accent" />
              <span>
                Need <strong className="text-accent font-mono">{registrationsRemaining}</strong> more signups to unlock <strong className="text-primary">{nextTargetMilestone.name}</strong>.
              </span>
            </span>
          ) : (
            <span className="text-emerald-400 font-semibold">
              🎉 Maximum level achieved! All milestones unlocked.
            </span>
          )}
        </div>

      </GlassCard>

      {/* RIGHT: Detail Preview Sidebar (Responsive Sidebar/Bottom card stack) */}
      <div className="w-full lg:w-1/3 flex-shrink-0">
        <RewardPreview
          name={selectedMilestone.name}
          registrationsRequired={selectedMilestone.registrationsRequired}
          mascotPath={selectedMilestone.mascotPath}
          rewardText={selectedMilestone.rewardText}
          description={selectedMilestone.description}
          perks={selectedMilestone.perks}
          status={getMilestoneStatus(
            selectedMilestone.id,
            currentRegistrations,
            REWARD_MILESTONES
          )}
          currentRegistrations={currentRegistrations}
        />
      </div>

      {/* Reward celebrate overlay */}
      {unlockMilestone && (
        <RewardUnlock
          isOpen={isUnlockOpen}
          onClose={() => {
            setIsUnlockOpen(false);
            setUnlockMilestone(null);
          }}
          name={unlockMilestone.name}
          mascotPath={unlockMilestone.mascotPath}
          perks={unlockMilestone.perks}
          rewardText={unlockMilestone.rewardText}
          description={unlockMilestone.description}
        />
      )}

    </div>
  );
};

RewardJourney.displayName = "RewardJourney";
