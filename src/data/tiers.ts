export interface RewardTier {
  id: number;
  name: string;
  pointsRequired: number;
  mascotPath: string;
  description: string;
  rewards: string[];
}

export const REWARD_TIERS: RewardTier[] = [
  {
    id: 1,
    name: "Initiate Explorer",
    pointsRequired: 0,
    mascotPath: "/assets/mascots/mascot-1.png",
    description: "Start your adventure inside the EYFI Ecosystem.",
    rewards: ["Ambassador Discord Role", "Early access newsletters"],
  },
  {
    id: 2,
    name: "Novice Knight",
    pointsRequired: 500,
    mascotPath: "/assets/mascots/mascot-2.png",
    description: "Contribute to discussions and verify basic ecosystem facts.",
    rewards: ["Knight Discord badge", "Exclusive governance chats"],
  },
  {
    id: 3,
    name: "Ecosystem Guardian",
    pointsRequired: 1500,
    mascotPath: "/assets/mascots/mascot-5.png",
    description: "Help guide new ambassadors and write quality articles.",
    rewards: ["Guaranteed Allowlist spots", "$EYFI token bonus multiplier"],
  },
  {
    id: 4,
    name: "Grand Chancellor",
    pointsRequired: 5000,
    mascotPath: "/assets/mascots/mascot-10.png",
    description: "Pioneer strategic growth and lead community events.",
    rewards: ["Direct core team communications", "Custom ambassador physical merch"],
  },
];
