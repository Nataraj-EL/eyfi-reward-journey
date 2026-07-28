"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RewardCardStack } from "./RewardCardStack";
import { Button } from "@/components/ui/Button";
import { Sparkles, Trophy, X, Gift } from "lucide-react";
import { cn } from "@/utils/cn";

export interface RewardUnlockProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  mascotPath: string;
  perks: string[];
  rewardText: string;
  description: string;
}

export const RewardUnlock: React.FC<RewardUnlockProps> = ({
  isOpen,
  onClose,
  name,
  mascotPath,
  perks,
  rewardText,
  description,
}) => {
  // Animation phases: "closed" | "opening" | "revealed"
  const [phase, setPhase] = React.useState<"closed" | "opening" | "revealed">("closed");

  // Reset phase when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setPhase("closed");
    }
  }, [isOpen]);

  const handleOpenChest = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    
    // Auto transition to card reveal phase after chest open anim stabilization
    setTimeout(() => {
      setPhase("revealed");
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop modal overlay */}
        <motion.div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Window Container */}
        <motion.div
          className="relative z-10 max-w-lg w-full glass-panel border border-neutral-900 bg-neutral-950/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[460px] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="unlock-title"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 text-neutral-500 hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close celebration modal"
          >
            <X size={16} />
          </button>

          {/* Radial backglow light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

          {/* PHASE 1: Closed chest shake & click to unlock prompt */}
          {phase === "closed" && (
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-xs text-neutral-500 uppercase tracking-widest font-black flex items-center gap-1 select-none">
                <Sparkles size={12} className="text-accent" /> REWARD UNLOCKED
              </span>
              <h3 id="unlock-title" className="text-2xl font-black text-center tracking-tight">
                Unlock your {name} level chest!
              </h3>
              
              {/* Chest shaker box */}
              <motion.div
                className="relative h-32 w-32 flex items-center justify-center bg-primary/10 hover:bg-primary/20 border-2 border-primary/30 hover:border-primary rounded-3xl cursor-pointer shadow-[0_0_30px_rgba(163,230,53,0.15)] group"
                onClick={handleOpenChest}
                animate={{
                  y: [0, -6, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 rounded-3xl bg-primary/5 group-hover:animate-ping pointer-events-none" />
                <Gift size={56} className="text-primary transition-transform duration-300 group-hover:rotate-6 stroke-[1.5]" />
              </motion.div>

              <span className="text-xs text-slate-400 select-none animate-pulse">
                Click chest package to open
              </span>
            </motion.div>
          )}

          {/* PHASE 2: Opening shake & glow bursts */}
          {phase === "opening" && (
            <motion.div className="flex flex-col items-center justify-center gap-4 text-center">
              {/* Shake box chest */}
              <motion.div
                animate={{
                  x: [0, -10, 10, -10, 10, 0],
                  rotate: [0, -5, 5, -5, 5, 0],
                }}
                transition={{ duration: 0.6, repeat: 2 }}
              >
                <Gift size={64} className="text-accent stroke-[1.5]" />
              </motion.div>
              <h3 className="text-xl font-bold tracking-tight animate-pulse text-accent">
                Opening rewards chest...
              </h3>
            </motion.div>
          )}

          {/* PHASE 3: Collectible card stack, confetti particles, and final welcome messages */}
          {phase === "revealed" && (
            <motion.div
              className="flex flex-col items-center gap-6 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {/* Confetti Sparks overlay (10 absolute styled circles shooting out) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {Array.from({ length: 12 }).map((_, idx) => {
                  const angle = (idx / 12) * 2 * Math.PI;
                  const distance = 160 + Math.random() * 80;
                  const destX = Math.cos(angle) * distance;
                  const destY = Math.sin(angle) * distance;
                  
                  return (
                    <motion.div
                      key={idx}
                      className={cn(
                        "absolute top-1/2 left-1/2 w-3 h-3 rounded-full",
                        idx % 3 === 0 && "bg-primary shadow-[0_0_10px_#A3E635]",
                        idx % 3 === 1 && "bg-accent shadow-[0_0_10px_#FACC15]",
                        idx % 3 === 2 && "bg-emerald-500 shadow-[0_0_10px_#10B981]"
                      )}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{
                        x: destX,
                        y: destY,
                        scale: [0, 1, 1.2, 0],
                        opacity: [1, 1, 0.8, 0],
                      }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                    />
                  );
                })}
              </div>

              {/* Congratulations text */}
              <div className="text-center z-10">
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest flex items-center justify-center gap-1">
                  <Trophy size={11} /> Milestone Achieved
                </span>
                <h3 className="text-2xl font-black tracking-tight text-white mt-1">
                  Congratulations!
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  You unlocked <span className="text-primary font-bold">{name}</span>
                </p>
              </div>

              {/* Interactive collectible card stack */}
              <div className="z-10 relative">
                <RewardCardStack
                  name={name}
                  mascotPath={mascotPath}
                  perks={perks}
                  rewardText={rewardText}
                  description={description}
                />
              </div>

              {/* Closing CTA Action button */}
              <div className="z-10 w-full max-w-[300px]">
                <Button
                  variant="primary"
                  className="w-full font-extrabold rounded-full"
                  onClick={onClose}
                >
                  Continue Journey
                </Button>
              </div>
            </motion.div>
          )}

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

RewardUnlock.displayName = "RewardUnlock";
