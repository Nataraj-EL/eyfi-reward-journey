"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { RupeeCoin } from "@/components/ui/RupeeCoin";
import { Sparkles, HelpCircle, Trophy } from "lucide-react";

export default function Home() {
  const tickerText = "WAVE 01 SCOUTS ✦ APPLICATIONS OPEN ✦ BUILD EYFI ON YOUR CAMPUS ✦ LIMITED SPOTS PER COLLEGE ✦ PAID INTERNSHIPS ✦ ";
  const repeatedTicker = Array(8).fill(tickerText).join("");

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col font-sans relative overflow-hidden dot-grid selection:bg-primary selection:text-black">
      
      {/* BACKGROUND FLOATING COINS (6-8 coins distributed across the canvas to add 3D depth) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left Coin - Large, slight blur */}
        <RupeeCoin size={120} rotation={25} blurLevel="sm" delay={0.2} speed={7} className="absolute top-[18%] left-[8%]" />
        
        {/* Mid Left Coin - Small, sharp */}
        <RupeeCoin size={65} rotation={-15} blurLevel="none" delay={1.5} speed={5.5} className="absolute top-[40%] left-[18%]" />
        
        {/* Bottom Left Coin - Medium, blur, low down */}
        <RupeeCoin size={90} rotation={10} blurLevel="md" delay={0.8} speed={6.5} className="absolute bottom-[25%] left-[5%]" />
        
        {/* Extreme Bottom Left - Small, sharp */}
        <RupeeCoin size={60} rotation={35} blurLevel="none" delay={2.3} speed={5} className="absolute bottom-[8%] left-[12%]" />
        
        {/* Top Right Coin - Large, tilted, sharp */}
        <RupeeCoin size={135} rotation={-45} blurLevel="none" delay={0.5} speed={8} className="absolute top-[12%] right-[7%]" />
        
        {/* Mid Right Coin - Small, sharp */}
        <RupeeCoin size={70} rotation={15} blurLevel="none" delay={1.8} speed={6} className="absolute top-[42%] right-[20%]" />
        
        {/* Bottom Right Coin - Medium, blur */}
        <RupeeCoin size={85} rotation={-30} blurLevel="sm" delay={1.1} speed={7.2} className="absolute bottom-[35%] right-[9%]" />
        
        {/* Extreme Bottom Right - Large, heavy blur */}
        <RupeeCoin size={105} rotation={20} blurLevel="lg" delay={2.7} speed={9} className="absolute bottom-[4%] right-[14%]" />
      </div>

      {/* [A] INFINITE TICKER MARQUEE (Top Border) */}
      <div className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] py-2.5 overflow-hidden border-b border-orange-500/20 relative z-20 select-none shadow-[0_4px_20px_rgba(249,115,22,0.15)]">
        <div className="marquee-container text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase">
          <div className="marquee-content flex gap-8">
            <span>{repeatedTicker}</span>
            <span>{repeatedTicker}</span>
          </div>
        </div>
      </div>

      {/* [B] NAVIGATION BAR */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-6 flex justify-between items-center relative z-20 bg-transparent">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 py-1">
          <span className="text-2xl font-black tracking-tight text-white select-none">
            EY
            <span className="text-primary italic inline-block transform -skew-x-6 relative">
              FI
              <span className="absolute -top-1 -right-2 text-[10px] text-[#A3E635] animate-pulse">⚡</span>
            </span>
          </span>
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
          
          <svg
            width="88"
            height="88"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 drop-shadow-[0_4px_10px_rgba(163,230,53,0.25)]"
          >
            {/* Outer dotted orbit */}
            <circle cx="50" cy="46" r="38" stroke="#A3E635" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
            
            {/* Inner solid orbit */}
            <circle cx="50" cy="46" r="32" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.15" />
            
            {/* Baseball Cap SVG Paths */}
            {/* Main Cap Dome */}
            <path
              d="M26 52 C26 28, 74 28, 74 52"
              stroke="#A3E635"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cap Visor/Brim */}
            <path
              d="M74 52 C76 52, 92 48, 86 62 C82 70, 68 56, 52 56 C36 56, 26 56, 26 52"
              stroke="#A3E635"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Seams detailing */}
            <path d="M50 28 V40" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M50 28 C40 32, 34 40, 32 50" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M50 28 C60 32, 66 40, 68 50" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.5" />
            
            {/* Cap Button on top */}
            <circle cx="50" cy="27" r="3" fill="#FACC15" stroke="#A3E635" strokeWidth="1" />
            
            {/* Golden Star Badge inside Circle */}
            <circle cx="50" cy="46" r="10" fill="#050505" stroke="#FACC15" strokeWidth="2" />
            <polygon
              points="50,39 53,44 59,44 54,48 56,54 50,51 44,54 46,48 41,44 47,44"
              fill="#FACC15"
            />
          </svg>
        </div>

        {/* Headlines */}
        <div className="space-y-2 select-none">
          <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-white opacity-95">
            Someone is going to
          </span>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none">
            build <span className="text-primary glow-lime/10">EYFI</span>
          </h2>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            on your <span className="text-primary">campus.</span>
          </h2>
          
          {/* Playfair Serif Italic Subheadline */}
          <p className="font-serif italic text-2xl sm:text-3xl text-accent font-medium pt-2 pb-6">
            Why shouldn't it be you?
          </p>
        </div>

        {/* [D] Middle Subtext description */}
        <p className="text-[#9CA3AF] text-sm sm:text-base max-w-xl leading-relaxed mb-8">
          Join the first wave of students helping launch India's first student income challenge across India.
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
