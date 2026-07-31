import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface RupeeCoinProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  size?: number;
  rotation?: number;
  blurLevel?: string;
  delay?: number;
  speed?: number;
}

const RupeeCoinComponent: React.FC<RupeeCoinProps> = ({
  className,
  size = 80,
  rotation = 20,
  blurLevel = "none",
  delay = 0,
  speed = 6,
  ...props
}) => {
  // Map blur properties
  const blurs = {
    none: "",
    sm: "blur-[1px]",
    md: "blur-[2px]",
    lg: "blur-[4px]",
  };

  return (
    <motion.div
      className={cn("pointer-events-none select-none relative", blurs[blurLevel as keyof typeof blurs], className)}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -15, 0],
        rotate: [rotation, rotation + 8, rotation],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.65)]"
      >
        <defs>
          {/* Main front face gradient */}
          <radialGradient id="coinFace" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="60%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#3f6212" />
          </radialGradient>

          {/* 3D Side rim depth gradient */}
          <linearGradient id="coinRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2e05" />
            <stop offset="50%" stopColor="#365314" />
            <stop offset="100%" stopColor="#1e3a1e" />
          </linearGradient>

          {/* Highlight sheen */}
          <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* 3D Cylinder Depth (extrusion effect) */}
        <ellipse cx="60" cy="65" rx="50" ry="35" fill="url(#coinRim)" />
        <ellipse cx="60" cy="63" rx="50" ry="35" fill="url(#coinRim)" />
        <ellipse cx="60" cy="61" rx="50" ry="35" fill="#2d4a0f" />

        {/* Outer Rim Details */}
        <ellipse cx="60" cy="60" rx="50" ry="35" fill="#4d7c0f" stroke="#a3e635" strokeWidth="1" />

        {/* Coin Face */}
        <ellipse cx="60" cy="60" rx="46" ry="31" fill="url(#coinFace)" />

        {/* Inner Ring border */}
        <ellipse cx="60" cy="60" rx="41" ry="27" fill="none" stroke="#27272a" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6" />

        {/* Rupee Symbol (₹) in the center */}
        <text
          x="60"
          y="69"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="32"
          fill="#141414"
          textAnchor="middle"
          opacity="0.85"
        >
          ₹
        </text>
        
        {/* Soft Metallic Sheen overlay */}
        <ellipse cx="60" cy="60" rx="46" ry="31" fill="url(#sheen)" style={{ mixBlendMode: "overlay" }} />
      </svg>
    </motion.div>
  );
};

export const RupeeCoin = React.memo(RupeeCoinComponent);
RupeeCoin.displayName = "RupeeCoin";
