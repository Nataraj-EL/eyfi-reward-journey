import { RewardMilestone } from "@/data/rewards";

export type MilestoneStatus = "unlocked" | "active" | "locked";

/**
 * Evaluates the visual/logical status of a milestone purely inside utilities.
 */
export function getMilestoneStatus(
  milestoneId: number,
  currentRegistrations: number,
  milestones: RewardMilestone[]
): MilestoneStatus {
  const milestoneIndex = milestones.findIndex((m) => m.id === milestoneId);
  if (milestoneIndex === -1) return "locked";
  
  const milestone = milestones[milestoneIndex];
  if (currentRegistrations >= milestone.registrationsRequired) {
    return "unlocked";
  }
  
  // The first milestone that the user has NOT completed yet is the "active" next unlock milestone
  const firstLockedMilestone = milestones.find((m) => currentRegistrations < m.registrationsRequired);
  if (firstLockedMilestone && firstLockedMilestone.id === milestoneId) {
    return "active";
  }

  return "locked";
}

/**
 * Evaluates the next target milestone for the ambassador.
 */
export function getNextMilestone(
  currentRegistrations: number,
  milestones: RewardMilestone[]
): RewardMilestone | null {
  return milestones.find((m) => currentRegistrations < m.registrationsRequired) || null;
}

/**
 * Calculates the overall visual progress along the horizontal timeline.
 * Returns a value between 0 and 100 representing the progress bar fill.
 */
export function calculateJourneyProgress(
  currentRegistrations: number,
  milestones: RewardMilestone[]
): number {
  if (milestones.length === 0) return 0;
  
  const maxRegistrations = milestones[milestones.length - 1].registrationsRequired;
  if (currentRegistrations >= maxRegistrations) return 100;
  
  // Find which segment the progress is currently in
  let activeSegmentIndex = 0;
  for (let i = 0; i < milestones.length - 1; i++) {
    if (
      currentRegistrations >= milestones[i].registrationsRequired &&
      currentRegistrations < milestones[i + 1].registrationsRequired
    ) {
      activeSegmentIndex = i;
      break;
    }
  }
  
  const currentMilestone = milestones[activeSegmentIndex];
  const nextMilestone = milestones[activeSegmentIndex + 1];
  
  const segmentRange = nextMilestone.registrationsRequired - currentMilestone.registrationsRequired;
  const segmentProgress = currentRegistrations - currentMilestone.registrationsRequired;
  
  // Calculate relative progress in this segment (0 to 1)
  const segmentRatio = segmentRange > 0 ? segmentProgress / segmentRange : 0;
  
  // Each segment takes equal visual space on the horizontal timeline
  const totalSegments = milestones.length - 1;
  const progressPercent = ((activeSegmentIndex + segmentRatio) / totalSegments) * 100;
  
  return Math.min(Math.max(progressPercent, 0), 100);
}
