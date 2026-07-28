export interface RewardMilestone {
  id: number;
  level: number;
  name: string;
  registrationsRequired: number;
  mascotPath: string;
  rewardText: string;
  description: string;
  perks: string[];
}

export const MASCOT_PATHS = {
  scout: "/assets/mascots/mascot-1.png",
  ambassador: "/assets/mascots/mascot-2.png",
  builder: "/assets/mascots/mascot-3.png",
  mentor: "/assets/mascots/mascot-5.png",
  intern: "/assets/mascots/mascot-10.png",
  founder: "/assets/mascots/mascot-12.png",
} as const;

export const REWARD_MILESTONES: RewardMilestone[] = [
  {
    id: 1,
    level: 1,
    name: "Scout",
    registrationsRequired: 0,
    mascotPath: MASCOT_PATHS.scout,
    rewardText: "Scout Badge & Discord Role",
    description: "Welcome to the EYFI Network. Kickstart your journey by getting verified.",
    perks: ["Custom Discord role badge", "Early-access program dashboard", "Wave 1 entry confirmation"],
  },
  {
    id: 2,
    level: 2,
    name: "Campus Ambassador",
    registrationsRequired: 25,
    mascotPath: MASCOT_PATHS.ambassador,
    rewardText: "EYFI Ambassador Box & 1.2x Multiplier",
    description: "Successfully activate Wave 1 campus scouts and lead your college community.",
    perks: ["Ambassador physical merch box", "1.2x points multiplier bonus", "Access to regional leader boards"],
  },
  {
    id: 3,
    level: 3,
    name: "Community Builder",
    registrationsRequired: 50,
    mascotPath: MASCOT_PATHS.builder,
    rewardText: "$EYFI Allowlist Spot",
    description: "Host campus challenges, workshops, and build solid communities.",
    perks: ["Guaranteed Allowlist status", "Exclusive builder community calls", "1.5x points multiplier"],
  },
  {
    id: 4,
    level: 4,
    name: "Mentor",
    registrationsRequired: 75,
    mascotPath: MASCOT_PATHS.mentor,
    rewardText: "Core Team Mentorship & Certificate",
    description: "Act as regional guide, onboarding other campuses to the challenge.",
    perks: ["Direct mentorship sessions", "Official ambassador certificate", "VIP governance group entry"],
  },
  {
    id: 5,
    level: 5,
    name: "Internship Opportunity",
    registrationsRequired: 100,
    mascotPath: MASCOT_PATHS.intern,
    rewardText: "Paid Summer Internship Interview",
    description: "Fast-track your career with direct placement interviews with the core team.",
    perks: ["Guaranteed internship review", "Paid stipend eligibility", "Letter of Recommendation"],
  },
  {
    id: 6,
    level: 6,
    name: "Founding Team",
    registrationsRequired: 200,
    mascotPath: MASCOT_PATHS.founder,
    rewardText: "Founding Member Token Allocation",
    description: "Ecosystem co-developer status representing the peak of ambassador success.",
    perks: ["Share in founding token allocations", "Exclusive annual summit invites", "Profile highlighted on site"],
  },
];
