export interface AmbassadorProfile {
  id: string;
  name: string;
  university: string;
  rank: number;
  scoutsRegisteredCount: number;
  targetScouts: number;
  verificationRate: number;
  waveActive: number;
  avatarPlaceholderText: string;
}

export interface AmbassadorDashboardData {
  profile: {
    name: string;
    university: string;
    rank: number;
    totalPoints: number;
    avatarPlaceholderText: string;
  };
  metrics: {
    scoutsRegisteredCount: number;
    targetScouts: number;
    verificationRate: number;
    waveActive: number;
  };
  currentTier: {
    id: number;
    name: string;
    mascotPath: string;
    description: string;
    unlockedBenefits: string[];
  };
  nextMilestone: {
    name: string;
    pointsRequired: number;
    mascotPath: string;
    pendingBenefits: string[];
  };
}

export const MOCK_PROFILES: AmbassadorProfile[] = [
  {
    id: "aarav",
    name: "Aarav Sharma",
    university: "IIT Bombay",
    rank: 14,
    scoutsRegisteredCount: 18,
    targetScouts: 30,
    verificationRate: 92,
    waveActive: 1,
    avatarPlaceholderText: "AS",
  },
  {
    id: "priya",
    name: "Priya Patel",
    university: "BITS Pilani",
    rank: 5,
    scoutsRegisteredCount: 45,
    targetScouts: 50,
    verificationRate: 96,
    waveActive: 1,
    avatarPlaceholderText: "PP",
  },
  {
    id: "rohan",
    name: "Rohan Das",
    university: "Delhi University",
    rank: 1,
    scoutsRegisteredCount: 110,
    targetScouts: 150,
    verificationRate: 89,
    waveActive: 2,
    avatarPlaceholderText: "RD",
  },
];
