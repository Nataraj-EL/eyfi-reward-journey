"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RupeeCoin } from "@/components/ui/RupeeCoin";


export default function Home() {
  const tickerText = "WAVE 01 SCOUTS ✦ APPLICATIONS OPEN ✦ BUILD EYFI ON YOUR CAMPUS ✦ LIMITED SPOTS PER COLLEGE ✦ PAID INTERNSHIPS ✦ ";
  const repeatedTicker = Array(8).fill(tickerText).join("");

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col font-sans relative overflow-hidden dot-grid selection:bg-primary selection:text-black">
      
      {/* BACKGROUND FLOATING COINS (6-8 coins distributed across the canvas to add 3D depth) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Left Coin - Large, heavy blur */}
        <RupeeCoin size={110} rotation={25} blurLevel="md" delay={0.2} speed={7.5} className="absolute top-[8%] left-[5%]" />
        
        {/* Mid Left Coin - Small, sharp */}
        <RupeeCoin size={60} rotation={-15} blurLevel="none" delay={1.4} speed={6.5} className="absolute top-[34%] left-[18%]" />
        
        {/* Bottom Left Coin - Medium, sharp */}
        <RupeeCoin size={80} rotation={40} blurLevel="none" delay={2.1} speed={8} className="absolute bottom-[38%] left-[8%]" />
        
        {/* Extreme Bottom Left - Small, heavy blur */}
        <RupeeCoin size={75} rotation={-10} blurLevel="lg" delay={0.8} speed={7} className="absolute bottom-[10%] left-[13%]" />
        
        {/* Top Right Coin - Large, sharp */}
        <RupeeCoin size={135} rotation={-45} blurLevel="none" delay={0.5} speed={8} className="absolute top-[12%] right-[7%]" />
        
        {/* Mid Right Coin - Small, sharp */}
        <RupeeCoin size={70} rotation={15} blurLevel="none" delay={1.8} speed={6} className="absolute top-[42%] right-[20%]" />
        
        {/* Bottom Right Coin - Medium, blur */}
        <RupeeCoin size={85} rotation={-30} blurLevel="sm" delay={1.1} speed={7.2} className="absolute bottom-[35%] right-[9%]" />
        
        {/* Extreme Bottom Right - Large, heavy blur */}
        <RupeeCoin size={105} rotation={20} blurLevel="lg" delay={2.7} speed={9} className="absolute bottom-[4%] right-[14%]" />
      </div>

      {/* [A] INFINITE TICKER MARQUEE (Top Border) */}
      <div className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] py-2.5 overflow-hidden border-b border-orange-500/20 relative z-25 select-none shadow-[0_4px_20px_rgba(249,115,22,0.15)]">
        <div className="marquee-container text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase">
          <div className="marquee-content flex gap-8" style={{ animationDuration: "18s" }}>
            <span>{repeatedTicker}</span>
            <span>{repeatedTicker}</span>
          </div>
        </div>
      </div>

      {/* [B] NAVIGATION BAR */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-6 flex justify-between items-center relative z-20 bg-transparent">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
          <Image
            src="/assets/logo.png"
            alt="EYFI Logo"
            width={100}
            height={32}
            priority
            className="object-contain"
          />
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold select-none">
          <Link href="#how-it-works" className="text-slate-400 hover:text-primary transition-all duration-300">
            How it works
          </Link>
          <Link href="#faqs" className="text-slate-400 hover:text-primary transition-all duration-300">
            FAQs
          </Link>
          <Link href="#eyfi-challenge" className="text-slate-400 hover:text-primary transition-all duration-300">
            EYFI Challenge
          </Link>
        </nav>

        {/* Right CTA Button */}
        <div>
          <Link href="#apply">
            <Button
              variant="primary"
              className="bg-primary hover:bg-primary-foreground text-black font-bold px-6 py-2 rounded-full text-sm shadow-[0_0_20px_rgba(163,230,53,0.2)] focus:ring-offset-black"
            >
              Apply Now
            </Button>
          </Link>
        </div>
      </header>

      {/* [C] HERO SECTION & [D] MIDDLE SUBTEXT & PRIMARY CTA */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 relative z-10 py-16 sm:py-24 max-w-4xl mx-auto">
        
        {/* Top Graphic Anchor (Star Cap icon) */}
        <div className="mb-6 relative group">
          {/* Neon cap backglow */}
          <div className="absolute inset-0 bg-[#A3E635]/15 rounded-full blur-xl scale-75 group-hover:scale-100 transition-all duration-500" />
          
          <Image
            src="/assets/cap.png"
            alt="EYFI Cap Badge"
            width={120}
            height={120}
            priority
            className="relative z-10 drop-shadow-[0_4px_10px_rgba(163,230,53,0.25)] animate-float"
          />
        </div>

        {/* Headlines */}
        <div className="space-y-2 select-none">
          <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-white opacity-95">
            Someone is going to
          </span>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none">
            build <span className="text-primary italic inline-block transform -skew-x-12 tracking-tight">EYFI</span>
          </h2>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            on your <span className="text-primary">campus.</span>
          </h2>
          
          {/* Playfair Serif Italic Subheadline */}
          <p className="font-serif italic text-2xl sm:text-3xl text-accent font-medium pt-2 pb-6">
            Why shouldn&apos;t it be you?
          </p>
        </div>

        {/* [D] Middle Subtext description */}
        <p className="text-[#9CA3AF] text-sm sm:text-base max-w-xl leading-relaxed mb-8">
          Join the first wave of students helping launch India&apos;s first student income challenge across India.
        </p>

        {/* Primary CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link href="#apply">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary hover:bg-primary-foreground text-black font-extrabold px-10 py-4 rounded-full text-base tracking-wide flex items-center gap-2 shadow-[0_8px_30px_rgba(163,230,53,0.35)]"
            >
              Apply Now ➔
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="glass"
              size="lg"
              className="px-10 py-4 rounded-full text-base font-extrabold hover:bg-white/10"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* [E] BOTTOM FEATURE CARD ("EYFI Challenge") */}
        <div id="eyfi-challenge" className="w-full text-left relative group">
          {/* Backdrop glow highlight */}
          <div className="absolute inset-0 bg-[#A3E635]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 p-8 rounded-2xl border border-neutral-900 bg-neutral-900/60 backdrop-blur-md transition-all duration-300 group-hover:border-neutral-800">
            <h3 className="text-primary font-bold text-lg sm:text-xl tracking-tight mb-3">
              EYFI Challenge
            </h3>
            <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
              Earn Your First Income (EYFI) Challenge is where students earn their first income while still in college: freelance, sell, build, teach, perform...
            </p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-950 py-8 px-8 text-center text-xs text-slate-600 mt-auto bg-[#030303]/90 relative z-20">
        <p>&copy; {new Date().getFullYear()} EYFI Ambassador Network. Recreated with precision for UI/UX excellence.</p>
      </footer>
    </div>
  );
}
