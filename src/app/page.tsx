"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedMascot, setSelectedMascot] = useState<number | null>(null);

  // We have 13 mascot images numbered mascot-1.png to mascot-13.png
  const mascots = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    name: `Mascot ${i + 1}`,
    path: `/assets/mascots/mascot-${i + 1}.png`,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-border py-6 px-8 relative z-10 glass-panel-light dark:glass-panel flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg glow-primary">
            EY
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">EYFI Reward Journey</h1>
            <p className="text-xs text-muted-foreground opacity-75">Sprint 0 Foundation</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            Active System Runs
          </span>
        </div>
      </header>

      {/* Hero Welcome */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7 flex flex-col justify-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary w-fit text-sm font-medium">
            <span>🚀</span> Sprint 0 Setup Successful
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            The Gamified <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Ambassador Journey
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
            Welcome to the developer portal for the EYFI Ambassador Reward Journey. 
            The foundation has been initialized with Next.js, TypeScript, Tailwind CSS, 
            and premium global theme styles.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
              <span className="text-xs text-neutral-500 block mb-1">Assets Scanned</span>
              <strong className="text-2xl font-bold">13 Mascots</strong>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
              <span className="text-xs text-neutral-500 block mb-1">Tailwind CSS</span>
              <strong className="text-2xl font-bold">V4.0</strong>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
              <span className="text-xs text-neutral-500 block mb-1">Next.js Router</span>
              <strong className="text-2xl font-bold">App Router</strong>
            </div>
          </div>

          {/* Developer Directories Check */}
          <div className="mt-6">
            <h3 className="font-semibold text-sm mb-3">Project Structure Map</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2 border border-border rounded bg-neutral-100 dark:bg-neutral-900 font-mono">
                📁 src/components
              </div>
              <div className="p-2 border border-border rounded bg-neutral-100 dark:bg-neutral-900 font-mono">
                📁 src/components/ui
              </div>
              <div className="p-2 border border-border rounded bg-neutral-100 dark:bg-neutral-900 font-mono">
                📁 src/components/reward-journey
              </div>
              <div className="p-2 border border-border rounded bg-neutral-100 dark:bg-neutral-900 font-mono">
                📁 src/data
              </div>
              <div className="p-2 border border-border rounded bg-neutral-100 dark:bg-neutral-900 font-mono">
                📁 src/assets
              </div>
              <div className="p-2 border border-border rounded bg-neutral-100 dark:bg-neutral-900 font-mono">
                📁 src/animations
              </div>
            </div>
          </div>
        </section>

        {/* Mascot Assets Gallery */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
            <h3 className="text-lg font-bold mb-2 flex items-center justify-between">
              <span>Mascots & Assets Portal</span>
              <span className="text-xs font-normal text-neutral-500">public/assets/mascots/</span>
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Inspect the visual assets generated for the ambassador reward ladder.
            </p>

            {/* Mascot Grid */}
            <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto p-1 border border-border rounded-xl">
              {mascots.map((mascot) => (
                <button
                  key={mascot.id}
                  onClick={() => setSelectedMascot(mascot.id)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedMascot === mascot.id
                      ? "border-primary scale-95"
                      : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <Image
                    src={mascot.path}
                    alt={mascot.name}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Active Preview */}
            <div className="mt-6 p-4 rounded-xl border border-border bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center relative min-h-[220px]">
              {selectedMascot ? (
                <>
                  <div className="relative w-36 h-36 animate-float">
                    <Image
                      src={mascots[selectedMascot - 1].path}
                      alt={mascots[selectedMascot - 1].name}
                      fill
                      sizes="150px"
                      className="object-contain"
                    />
                  </div>
                  <span className="mt-3 text-sm font-semibold">
                    {mascots[selectedMascot - 1].name}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    /assets/mascots/mascot-{selectedMascot}.png
                  </span>
                </>
              ) : (
                <div className="text-center text-neutral-500 py-8">
                  <div className="text-3xl mb-2">👾</div>
                  <p className="text-sm">Click a mascot above to preview the artwork</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-8 text-center text-xs text-neutral-500 mt-auto">
        &copy; {new Date().getFullYear()} EYFI Ambassador Rewards. Designed with Next.js, Tailwind v4, & TypeScript.
      </footer>
    </div>
  );
}
