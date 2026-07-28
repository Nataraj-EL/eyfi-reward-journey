"use client";

import * as React from "react";
import Link from "next/link";
import { AmbassadorHeader } from "@/components/dashboard/AmbassadorHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { LevelCard } from "@/components/dashboard/LevelCard";
import { NextMilestoneCard } from "@/components/dashboard/NextMilestoneCard";
import { RewardJourney } from "@/components/reward-journey/RewardJourney";
import { MOCK_PROFILES, AmbassadorProfile } from "@/data/ambassador";
import { REWARD_MILESTONES, MASCOT_PATHS } from "@/data/rewards";
import { loadPersistentProfiles, savePersistentProfiles, loadClaimedRewards, saveClaimedRewards } from "@/utils/persistence";
import { ArrowLeft, LayoutDashboard, Compass, Sparkles, Plus, Minus, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import Image from "next/image";

export default function Dashboard() {
  // SSR-safe state hydration
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [profiles, setProfiles] = React.useState<AmbassadorProfile[]>(MOCK_PROFILES);
  const [activeProfileId, setActiveProfileId] = React.useState<string>("aarav");
  const [claimedIds, setClaimedIds] = React.useState<number[]>([]);

  // Load persistent configurations on mount
  React.useEffect(() => {
    const loadedProfiles = loadPersistentProfiles(MOCK_PROFILES);
    setTimeout(() => {
      setProfiles(loadedProfiles);
      setIsHydrated(true);
    }, 0);
  }, []);

  // Retrieve current active profile object
  const currentProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];
  const currentRegistrations = currentProfile.scoutsRegisteredCount;

  // Load claims history whenever profile changes
  React.useEffect(() => {
    if (isHydrated) {
      const claims = loadClaimedRewards(currentProfile.id);
      setTimeout(() => {
        setClaimedIds(claims);
      }, 0);
    }
  }, [activeProfileId, isHydrated, currentProfile.id]);

  // Derived Points Calculation (100 points per scout registration)
  const totalPoints = currentRegistrations * 100;

  // Derive Current Tier from completed milestones
  const completedMilestones = REWARD_MILESTONES.filter(
    (m) => currentRegistrations >= m.registrationsRequired
  );
  const currentTier = completedMilestones[completedMilestones.length - 1] || REWARD_MILESTONES[0];

  // Derive Next Milestone from locked milestones
  const nextMilestone = REWARD_MILESTONES.find(
    (m) => currentRegistrations < m.registrationsRequired
  ) || null;

  // Sync profile edits to localStorage helper
  const updateProfileRegistrations = (newCount: number) => {
    const updatedCount = Math.max(0, Math.min(newCount, 300)); // Cap between 0 and 300
    const updatedProfiles = profiles.map((p) =>
      p.id === currentProfile.id ? { ...p, scoutsRegisteredCount: updatedCount } : p
    );
    setProfiles(updatedProfiles);
    savePersistentProfiles(updatedProfiles);
  };

  // Claim simulation transaction handler
  const handleClaimReward = (id: number) => {
    if (claimedIds.includes(id)) return;
    const updatedClaims = [...claimedIds, id];
    setClaimedIds(updatedClaims);
    saveClaimedRewards(currentProfile.id, updatedClaims);
  };

  // Reset simulator state
  const handleResetSimulator = () => {
    setProfiles(MOCK_PROFILES);
    savePersistentProfiles(MOCK_PROFILES);
    MOCK_PROFILES.forEach(p => {
      saveClaimedRewards(p.id, []);
    });
    setClaimedIds([]);
  };

  // Package centralized ambassadorData structure to satisfy component props
  const ambassadorData = {
    profile: {
      name: currentProfile.name,
      university: currentProfile.university,
      rank: currentProfile.rank,
      totalPoints: totalPoints,
      avatarPlaceholderText: currentProfile.avatarPlaceholderText,
    },
    metrics: {
      scoutsRegisteredCount: currentRegistrations,
      targetScouts: currentProfile.targetScouts,
      verificationRate: currentProfile.verificationRate,
      waveActive: currentProfile.waveActive,
    },
    currentTier: {
      id: currentTier.id,
      name: currentTier.name,
      mascotPath: currentTier.mascotPath,
      description: currentTier.description,
      unlockedBenefits: currentTier.perks,
    },
    nextMilestone: {
      name: nextMilestone?.name || "Founding Team",
      pointsRequired: (nextMilestone?.registrationsRequired || 200) * 100,
      mascotPath: nextMilestone?.mascotPath || MASCOT_PATHS.founder,
      pendingBenefits: nextMilestone?.perks || [],
    },
  };

  // Prevent flash during load hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin text-primary" size={32} />
          <p className="text-sm text-neutral-500 font-mono">LOADING DYNAMIC ENGINE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col font-sans relative overflow-hidden dot-grid">
      
      {/* Background radial overlays */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-neutral-900 bg-[#050505]/85 backdrop-blur-md py-4 px-6 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-xs font-semibold select-none mr-2">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Landing Page</span>
          </Link>
          <div className="h-6 w-px bg-neutral-900 hidden sm:block" />
          <div className="flex items-center gap-2">
            <LayoutDashboard size={18} className="text-primary" />
            <h1 className="text-sm font-bold tracking-tight select-none">
              EYFI Ambassador Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleResetSimulator} className="h-8 border-neutral-800 text-xs px-3 hover:bg-neutral-900 select-none">
            <RefreshCw size={12} className="mr-1.5" /> Reset State
          </Button>
          <span className="text-[10px] bg-neutral-900 text-neutral-400 border border-neutral-850 px-3 py-1 rounded-full font-mono font-semibold uppercase tracking-wider select-none hidden sm:block">
            Wave 01 Live
          </span>
        </div>
      </header>

      {/* Main Grid Wrapper */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full relative z-10 flex flex-col gap-8">
        
        {/* SIMULATOR & CONTROL SECTION */}
        <section aria-label="Dynamic Simulator Controls">
          <GlassCard className="border border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-6" hoverEffect={false}>
            {/* Profile Switcher */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider select-none">
                Select Ambassador Profile
              </span>
              <div className="flex flex-wrap gap-2">
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProfileId(p.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                      activeProfileId === p.id
                        ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(163,230,53,0.3)]"
                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                    }`}
                  >
                    {p.name} ({p.scoutsRegisteredCount} Scouts)
                  </button>
                ))}
              </div>
            </div>

            {/* Registration Changer controls */}
            <div className="flex flex-col gap-2 w-full sm:w-auto sm:items-end">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider select-none">
                Simulate Scout Registrations
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateProfileRegistrations(currentRegistrations - 5)}
                  className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Decrease scouts count by 5"
                >
                  <Minus size={14} />
                </button>
                <div className="px-6 py-2 rounded-xl border border-neutral-900 bg-black font-mono font-black text-center min-w-[90px] text-primary">
                  {currentRegistrations}
                </div>
                <button
                  onClick={() => updateProfileRegistrations(currentRegistrations + 5)}
                  className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Increase scouts count by 5"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Profile Welcome greeting */}
        <section aria-label="Ambassador Profile Welcome">
          <AmbassadorHeader
            name={currentProfile.name}
            university={currentProfile.university}
            rank={currentProfile.rank}
            totalPoints={totalPoints}
            avatarPlaceholderText={currentProfile.avatarPlaceholderText}
          />
        </section>

        {/* Action Title */}
        <div className="border-b border-neutral-900 pb-3 flex items-center gap-2 select-none">
          <Compass size={18} className="text-accent" />
          <h2 className="text-lg font-extrabold tracking-tight">Active Performance metrics</h2>
        </div>

        {/* Metrics Grid */}
        <section aria-label="Ambassador Campaign metrics">
          <MetricsGrid
            scoutsRegisteredCount={currentRegistrations}
            targetScouts={currentProfile.targetScouts}
            verificationRate={currentProfile.verificationRate}
            waveActive={currentProfile.waveActive}
          />
        </section>

        {/* Interactive Milestone Journey */}
        <section aria-label="Ambassador Reward Milestone Ladder">
          <RewardJourney ambassadorData={ambassadorData} />
        </section>

        {/* Level Progression Grid */}
        <section aria-label="Ambassador Tiers Overview" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Unlocked Tier Details */}
          <div className="flex flex-col gap-3">
            <LevelCard
              levelName={currentTier.name}
              mascotPath={currentTier.mascotPath}
              description={currentTier.description}
              unlockedBenefits={currentTier.perks}
              className="h-full"
            />
          </div>

          {/* Locked Next Milestone Details */}
          <div className="flex flex-col gap-3">
            <NextMilestoneCard
              nextLevelName={nextMilestone?.name || "Founding Team"}
              nextLevelMascotPath={nextMilestone?.mascotPath || MASCOT_PATHS.founder}
              pointsRequired={(nextMilestone?.registrationsRequired || 200) * 100}
              currentPoints={totalPoints}
              pendingBenefits={nextMilestone?.perks || []}
              className="h-full"
            />
          </div>
        </section>

        {/* ACHIEVEMENT HISTORY SECTION */}
        <section aria-label="Ambassador Achievement History Logs" className="space-y-6">
          <div className="border-b border-neutral-900 pb-3 flex items-center gap-2 select-none">
            <Sparkles size={18} className="text-emerald-500" />
            <h2 className="text-lg font-extrabold tracking-tight">Unlocked Achievement History</h2>
          </div>

          {completedMilestones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedMilestones.map((milestone) => {
                const isClaimed = claimedIds.includes(milestone.id);

                return (
                  <GlassCard key={milestone.id} className="flex gap-4 p-5 items-center border border-neutral-900 bg-neutral-950/40 relative overflow-hidden" hoverEffect>
                    {/* Tiny Mascot visual icon */}
                    <div className="relative w-16 h-16 rounded-xl bg-neutral-900 flex items-center justify-center p-1 border border-neutral-850 flex-shrink-0">
                      <Image
                        src={`${milestone.mascotPath}?v=2`}
                        alt={`${milestone.name} Mini Mascot`}
                        fill
                        sizes="60px"
                        className="object-contain p-1.5"
                      />
                    </div>

                    <div className="flex-grow flex flex-col justify-between h-full py-0.5">
                      <div>
                        <h4 className="text-sm font-bold text-foreground truncate">
                          {milestone.name}
                        </h4>
                        <span className="text-[10px] text-neutral-500 font-mono block mt-0.5 select-none">
                          Unlocked at {milestone.registrationsRequired} Scouts
                        </span>
                      </div>

                      {/* Claim reward status button */}
                      <div className="mt-3">
                        {isClaimed ? (
                          <div className="text-emerald-500 font-semibold text-xs flex items-center gap-1.5 select-none">
                            <CheckCircle size={14} /> Unlocks Claimed
                          </div>
                        ) : (
                          <button
                            onClick={() => handleClaimReward(milestone.id)}
                            className="bg-primary hover:bg-primary-foreground text-black text-[11px] font-extrabold px-3 py-1.5 rounded-lg border border-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-[0_0_10px_rgba(163,230,53,0.15)]"
                          >
                            Claim Reward
                          </button>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 rounded-2xl border border-neutral-900 text-neutral-500">
              No milestones unlocked yet. Build registrations to get started!
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-950 py-6 text-center text-xs text-neutral-600 mt-auto bg-[#030303]/90 relative z-20">
        &copy; {new Date().getFullYear()} EYFI Ambassador Program. Centralized Persistent Simulator.
      </footer>
    </div>
  );
}
