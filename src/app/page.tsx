"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Progress } from "@/components/ui/Progress";
import { MascotDisplay } from "@/components/ui/MascotDisplay";
import { RewardCard } from "@/components/ui/RewardCard";
import { REWARD_TIERS } from "@/data/tiers";
import { Sparkles, Trophy, ShieldAlert, Cpu, Eye, ArrowRight } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"showcase" | "docs">("showcase");
  const [claimLoading, setClaimLoading] = useState<Record<number, boolean>>({});
  const [claimStatus, setClaimStatus] = useState<Record<number, "locked" | "available" | "claimed">>({
    1: "claimed",
    2: "available",
    3: "locked",
    4: "locked",
  });

  const handleClaim = (id: number) => {
    setClaimLoading((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setClaimLoading((prev) => ({ ...prev, [id]: false }));
      setClaimStatus((prev) => ({ ...prev, [id]: "claimed" }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/80 backdrop-blur-md bg-background/80 py-4 px-6 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg glow-primary">
            EY
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">EYFI Design System</h1>
            <p className="text-[10px] text-neutral-500 font-mono">SPRINT 1 COMPONENT LIBRARY</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border border-border p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900/50">
          <button
            onClick={() => setActiveTab("showcase")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "showcase"
                ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm"
                : "text-neutral-500 hover:text-foreground"
            }`}
          >
            Showcase Portal
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "docs"
                ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm"
                : "text-neutral-500 hover:text-foreground"
            }`}
          >
            Design Tokens
          </button>
        </div>
      </header>

      {/* Content Body */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative z-10">
        {activeTab === "showcase" ? (
          <div className="space-y-12">
            {/* Intro Section */}
            <div className="flex flex-col gap-3">
              <Badge variant="primary" glow className="w-fit">
                <Sparkles size={12} className="mr-1" /> Sprint 1 Complete
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Reusable Component Library
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-450 max-w-2xl leading-relaxed">
                Review the refined branding variables and high-performance UI components constructed for the ambassador experience. All widgets support native focus controls, strict TypeScript types, and fluid animations.
              </p>
            </div>

            {/* 1. BUTTONS & BADGES SHOWCASE */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard className="flex flex-col gap-6" hoverEffect={false}>
                <div className="border-b border-border/20 pb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Cpu size={18} className="text-primary" /> Core Buttons
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">Variants, sizes, and states</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary Solid</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="glass">Glass Button</Button>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-border/20 pt-4">
                  <Button variant="primary" size="sm">Small Size</Button>
                  <Button variant="primary" size="md">Medium Size</Button>
                  <Button variant="primary" size="lg">Large Size</Button>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-border/20 pt-4">
                  <Button variant="primary" isLoading>Processing</Button>
                  <Button variant="glass" leftIcon={<Trophy size={16} />}>Awards</Button>
                  <Button variant="outline" rightIcon={<ArrowRight size={16} />}>Proceed</Button>
                </div>
              </GlassCard>

              <GlassCard className="flex flex-col gap-6" hoverEffect={false}>
                <div className="border-b border-border/20 pb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles size={18} className="text-accent" /> Status Badges
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">Status markers and notification tags</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-500 mb-2">Standard Styles</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="accent">Accent</Badge>
                      <Badge variant="success">Success Tag</Badge>
                      <Badge variant="outline">Outline Tag</Badge>
                      <Badge variant="glass">Glass Tag</Badge>
                    </div>
                  </div>

                  <div className="border-t border-border/20 pt-4">
                    <h4 className="text-xs font-semibold text-neutral-500 mb-2">Glowing Styles</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary" glow>Glowing Primary</Badge>
                      <Badge variant="secondary" glow>Glowing Secondary</Badge>
                      <Badge variant="accent" glow>Glowing Accent</Badge>
                      <Badge variant="success" glow>Glowing Success</Badge>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* 2. GLASS PANELS & PROGRESS BARS */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard className="flex flex-col gap-6" hoverEffect={false}>
                <div className="border-b border-border/20 pb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Eye size={18} className="text-emerald-500" /> Glass Panels & Cards
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">Card options with backdrop filter glows</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <GlassCard hoverEffect borderGlow glowColor="primary" className="p-4 flex flex-col justify-between min-h-[140px]">
                    <span className="text-xs font-semibold text-primary">Primary Glow Card</span>
                    <p className="text-xs text-neutral-400 mt-2">Scale hover trigger with cyan glow.</p>
                  </GlassCard>

                  <GlassCard hoverEffect borderGlow glowColor="accent" className="p-4 flex flex-col justify-between min-h-[140px]">
                    <span className="text-xs font-semibold text-accent">Accent Glow Card</span>
                    <p className="text-xs text-neutral-400 mt-2">Scale hover trigger with amber glow.</p>
                  </GlassCard>
                </div>
              </GlassCard>

              <GlassCard className="flex flex-col gap-6" hoverEffect={false}>
                <div className="border-b border-border/20 pb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Trophy size={18} className="text-primary" /> Progress Trackers
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">Milestone indicators</p>
                </div>

                <div className="space-y-5">
                  <Progress value={20} showValue color="primary" />
                  <Progress value={65} showValue color="accent" />
                  <Progress value={100} showValue color="secondary" />
                </div>
              </GlassCard>
            </section>

            {/* 3. MASCOT & REWARD TIERS INTERACTION DEMO */}
            <section className="space-y-6">
              <div className="border-b border-border/20 pb-3">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy size={20} className="text-accent" /> Ambassador Reward Tiers (Sprint 1 Integration Preview)
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Presentation of RewardCards combining all system sub-components.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {REWARD_TIERS.map((tier) => (
                  <RewardCard
                    key={tier.id}
                    name={tier.name}
                    pointsRequired={tier.pointsRequired}
                    mascotPath={tier.mascotPath}
                    description={tier.description}
                    rewards={tier.rewards}
                    status={claimStatus[tier.id]}
                    onClaim={() => handleClaim(tier.id)}
                    claimLoading={claimLoading[tier.id]}
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Color Palette Tokens */}
            <GlassCard className="md:col-span-2 flex flex-col gap-6" hoverEffect={false}>
              <h3 className="text-xl font-bold border-b border-border/20 pb-3">Branding Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 border border-border rounded-xl bg-card">
                  <div className="h-12 w-full rounded-lg bg-primary mb-2 shadow" />
                  <span className="text-xs font-bold block">Primary Color</span>
                  <span className="text-[10px] text-neutral-500 font-mono">var(--primary)</span>
                </div>
                <div className="p-3 border border-border rounded-xl bg-card">
                  <div className="h-12 w-full rounded-lg bg-secondary mb-2 shadow" />
                  <span className="text-xs font-bold block">Secondary Color</span>
                  <span className="text-[10px] text-neutral-500 font-mono">var(--secondary)</span>
                </div>
                <div className="p-3 border border-border rounded-xl bg-card">
                  <div className="h-12 w-full rounded-lg bg-accent mb-2 shadow" />
                  <span className="text-xs font-bold block">Accent Color</span>
                  <span className="text-[10px] text-neutral-500 font-mono">var(--accent)</span>
                </div>
                <div className="p-3 border border-border rounded-xl bg-card">
                  <div className="h-12 w-full rounded-lg bg-eyfi-purple mb-2 shadow" />
                  <span className="text-xs font-bold block">EYFI Purple</span>
                  <span className="text-[10px] text-neutral-500 font-mono">#6366f1</span>
                </div>
                <div className="p-3 border border-border rounded-xl bg-card">
                  <div className="h-12 w-full rounded-lg bg-eyfi-gold mb-2 shadow" />
                  <span className="text-xs font-bold block">EYFI Gold</span>
                  <span className="text-[10px] text-neutral-500 font-mono">#f59e0b</span>
                </div>
                <div className="p-3 border border-border rounded-xl bg-card">
                  <div className="h-12 w-full rounded-lg bg-neutral-900 border border-neutral-800 mb-2 shadow" />
                  <span className="text-xs font-bold block">EYFI Dark bg</span>
                  <span className="text-[10px] text-neutral-500 font-mono">#0f0f16</span>
                </div>
              </div>
            </GlassCard>

            {/* Layout Typography & Utilities */}
            <GlassCard className="flex flex-col gap-6" hoverEffect={false}>
              <h3 className="text-xl font-bold border-b border-border/20 pb-3">CSS Utilities</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Glassmorphism</h4>
                  <div className="p-3 glass-panel rounded-xl text-xs font-mono text-center text-white">
                    .glass-panel (Blur backdrop)
                  </div>
                </div>

                <div className="pt-4 border-t border-border/20">
                  <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Keyframe Animations</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex justify-between border-b border-border/10 pb-1">
                      <span>Float effect:</span>
                      <span className="text-neutral-500 font-mono">.animate-float</span>
                    </li>
                    <li className="flex justify-between border-b border-border/10 pb-1">
                      <span>Soft glow pulse:</span>
                      <span className="text-neutral-500 font-mono">.animate-pulse-slow</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/80 py-6 text-center text-xs text-neutral-500 mt-auto bg-background/50 relative z-10">
        &copy; {new Date().getFullYear()} EYFI Ambassador System. Premium Design Tokens.
      </footer>
    </div>
  );
}
