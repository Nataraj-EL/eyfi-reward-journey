export interface AmbassadorProfile {
  name: string;
  university: string;
  avatarUrl?: string;
  rank: number;
  totalPoints: number;
}

export interface RegistrationMetrics {
  scoutsRegisteredCount: number;
  targetScouts: number;
  verificationRate: number; // e.g. percentage of successful scout actions
  waveActive: number;
}

export interface AmbassadorTierInfo {
  id: number;
  name: string;
  mascotPath: string;
  description: string;
  unlockedBenefits: string[];
}

export interface NextMilestoneInfo {
  name: string;
  pointsRequired: number;
  mascotPath: string;
  pendingBenefits: string[];
}

export interface AmbassadorDashboardData {
  profile: AmbassadorProfile;
  metrics: RegistrationMetrics;
  currentTier: AmbassadorTierInfo;
  nextMilestone: NextMilestoneInfo;
}

export const MOCK_AMBASSADOR_DATA: AmbassadorDashboardData = {
  profile: {
    name: "Aarav Sharma",
    university: "IIT Bombay",
    rank: 14,
    totalPoints: 1250,
  },
  metrics: {
    scoutsRegisteredCount: 18,
    targetScouts: 30,
    verificationRate: 92,
    waveActive: 1,
  },
  currentTier: {
    id: 2,
    name: "Novice Knight",
    mascotPath: "/assets/mascots/mascot-2.png",
    description: "You've successfully activated Wave 1 scouts on your campus. Keep sharing challenges!",
    unlockedBenefits: [
      "Access to private campus ambassador Discord channel",
      "Early notifications of local ecosystem drops",
      "Wave 1 point multiplier bonus (1.2x)"
    ],
  },
  nextMilestone: {
    name: "Ecosystem Guardian",
    pointsRequired: 2500,
    mascotPath: "/assets/mascots/mascot-5.png",
    pendingBenefits: [
      "Guaranteed allowlists for mainnet token launches",
      "Direct weekly team chancellery access",
      "Custom branded physical hoodie box"
    ],
  },
};
