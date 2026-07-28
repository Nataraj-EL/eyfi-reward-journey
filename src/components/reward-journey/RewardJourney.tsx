"use client";

import * as React from "react";
import { REWARD_MILESTONES, RewardMilestone } from "@/data/rewards";
import { MilestoneNode } from "./MilestoneNode";
import { RewardPath } from "./RewardPath";
import { RewardPreview } from "./RewardPreview";
import { calculateJourneyProgress, getMilestoneStatus, getNextMilestone, MilestoneStatus } from "@/utils/progression";
import { Trophy, HelpCircle, ChevronRight, Award } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

export interface RewardJourneyProps extends React.HTMLAttributes<HTMLDivElement> {
  currentRegistrations: number;
}

export const RewardJourney: React.FC<RewardJourneyProps> = ({
  className,
  currentRegistrations,
  ...props
}) => {
  // Find initial next milestone
  const nextTargetMilestone = getNextMilestone(currentRegistrations, REWARD_MILESTONES);
  
  // Set local state for active selected milestone details preview
  const [selectedMilestone, setSelectedMilestone] = React.useState<RewardMilestone>(
    nextTargetMilestone || REWARD_MILESTONES[REWARD_MILESTONES.length - 1]
  );

  // Compute total horizontal progression percentages
  const progressPercentage = calculateJourneyProgress(currentRegistrations, REWARD_MILESTONES);

  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-start w-full ${className}`} {...props}>
      
      {/* LEFT: Gamified Horizontal Ladder Map */}
      <GlassCard className="flex-grow w-full lg:w-2/3 p-6 flex flex-col gap-6" hoverEffect={false}>
        
        {/* Header Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Trophy size={18} className="text-primary" /> Gamified Rewards Ladder
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
            {REWARD_MILESTONES.map((milestone, idx) => {
              // Retrieve registrations required for next milestone to compute status accurately
              const nextRegistrations = 
                idx < REWARD_MILESTONES.length - 1 
                  ? REWARD_MILESTONES[idx + 1].registrationsRequired 
                  : null;

              const status = getMilestoneStatus(
                milestone.registrationsRequired,
                currentRegistrations,
                nextRegistrations
              );

              return (
                <MilestoneNode
                  key={milestone.id}
                  name={milestone.name}
                  registrationsRequired={milestone.registrationsRequired}
                  status={status}
                  isSelected={selectedMilestone.id === milestone.id}
                  onNodeClick={() => setSelectedMilestone(milestone)}
                  className="w-24 flex-shrink-0"
                />
              );
            })}

          </div>
        </div>

        {/* Dynamic Road guide subtext details */}
        <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-850 flex items-center justify-between text-xs text-neutral-400 select-none">
          <span className="flex items-center gap-2">
            <Award size={14} className="text-primary" />
            <span>Click any chest node to view levels and details.</span>
          </span>
          {nextTargetMilestone && (
            <span className="hidden sm:inline-flex items-center gap-1">
              Next Goal: <strong className="text-primary">{nextTargetMilestone.name}</strong> ({nextTargetMilestone.registrationsRequired} Scouts)
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
            selectedMilestone.registrationsRequired,
            currentRegistrations,
            // get next registration threshold for selection status
            selectedMilestone.id < REWARD_MILESTONES.length 
              ? REWARD_MILESTONES[selectedMilestone.id].registrationsRequired 
              : null
          )}
          currentRegistrations={currentRegistrations}
        />
      </div>

    </div>
  );
};

RewardJourney.displayName = "RewardJourney";
