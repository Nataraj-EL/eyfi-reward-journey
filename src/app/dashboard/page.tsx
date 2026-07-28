"use client";

import Link from "next/link";
import { AmbassadorHeader } from "@/components/dashboard/AmbassadorHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { LevelCard } from "@/components/dashboard/LevelCard";
import { NextMilestoneCard } from "@/components/dashboard/NextMilestoneCard";
import { MOCK_AMBASSADOR_DATA } from "@/data/ambassador";
import { ArrowLeft, LayoutDashboard, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Dashboard() {
  const { profile, metrics, currentTier, nextMilestone } = MOCK_AMBASSADOR_DATA;

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col font-sans relative overflow-hidden dot-grid">
      
      {/* Background radial overlays */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-neutral-900 bg-[#050505]/80 backdrop-blur-md py-4 px-6 sm:px-8 flex justify-between items-center">
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

        <div>
          <span className="text-[10px] bg-neutral-900 text-neutral-400 border border-neutral-850 px-3 py-1 rounded-full font-mono font-semibold uppercase tracking-wider select-none">
            Wave 01 Live
          </span>
        </div>
      </header>

      {/* Main Grid Wrapper */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full relative z-10 flex flex-col gap-8">
        
        {/* Profile Card greeting */}
        <section aria-label="Ambassador Profile Welcome">
          <AmbassadorHeader
            name={profile.name}
            university={profile.university}
            rank={profile.rank}
            totalPoints={profile.totalPoints}
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
            scoutsRegisteredCount={metrics.scoutsRegisteredCount}
            targetScouts={metrics.targetScouts}
            verificationRate={metrics.verificationRate}
            waveActive={metrics.waveActive}
          />
        </section>

        {/* Level Progression Grid */}
        <section aria-label="Ambassador Tiers Overview" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Unlocked Tier Details */}
          <div className="flex flex-col gap-3">
            <LevelCard
              levelName={currentTier.name}
              mascotPath={currentTier.mascotPath}
              description={currentTier.description}
              unlockedBenefits={currentTier.unlockedBenefits}
              className="h-full"
            />
          </div>

          {/* Locked Next Milestone Details */}
          <div className="flex flex-col gap-3">
            <NextMilestoneCard
              nextLevelName={nextMilestone.name}
              nextLevelMascotPath={nextMilestone.mascotPath}
              pointsRequired={nextMilestone.pointsRequired}
              currentPoints={profile.totalPoints}
              pendingBenefits={nextMilestone.pendingBenefits}
              className="h-full"
            />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-950 py-6 text-center text-xs text-neutral-600 mt-auto bg-[#030303]/90 relative z-20">
        &copy; {new Date().getFullYear()} EYFI Ambassador Program. All widgets are strictly presentation-driven.
      </footer>
    </div>
  );
}
