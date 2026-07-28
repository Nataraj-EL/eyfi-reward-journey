# EYFI Reward Journey

A premium, interactive, and gamified campus ambassador rewards dashboard built for the **EYFI** ecosystem. The application tracks active scout registration milestones and rewards student leaders through unlockable tiers, paid summer internship reviews, merchandise, and founding member tokens.

---

## 🚀 Tech Stack

- **Core**: [Next.js (v16.2.12)](https://nextjs.org/) (App Router, React 19)
- **State Management**: Data-driven state hooks with SSR-safe `localStorage` cache synchronization
- **Styling**: [Tailwind CSS (v4.0)](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & custom CSS keyframes (with media queries for `prefers-reduced-motion` compliance)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Code Architecture & Components Map

The codebase is organized into modular directories matching modern React production standards:

```text
├── public/
│   └── assets/
│       └── mascots/          # 13 high-quality mascot illustrations (mascot-1.png to mascot-13.png)
├── src/
│   ├── app/                  # Next.js App Router Pages
│   │   ├── layout.tsx        # Production-grade head metadata and OpenGraph tag setups
│   │   ├── globals.css       # Custom neon glows, repeating dot-grids, and scroll marquee keyframes
│   │   ├── page.tsx          # High-fidelity center-aligned campaign landing page
│   │   └── dashboard/
│   │       └── page.tsx      # Main ambassador simulation workspace page
│   ├── components/           # Modular component layout directories
│   │   ├── ui/               # Reusable design system elements
│   │   │   ├── Button.tsx    # Accessible multi-variant click helper with loading anims
│   │   │   ├── Badge.tsx     # Color status tags with neon shadowing glow effects
│   │   │   ├── GlassCard.tsx # Glassmorphism border panel with blur backdrops
│   │   │   ├── Progress.tsx  # Dynamic progress bar tracking percentage loads
│   │   │   ├── MascotDisplay.tsx # Optimized float container for mascot artwork rendering
│   │   │   └── RupeeCoin.tsx # 3D-rendered SVG coin representing Indian Rupee (₹)
│   │   └── reward-journey/   # Gamified milestone widgets
│   │       ├── RewardChest.tsx   # Gift box presenter (locked, active, claimed)
│   │       ├── MilestoneNode.tsx # Progression node along the horizontal axis
│   │       ├── RewardPath.tsx    # Connecting progression overlay tracker SVG
│   │       ├── RewardPreview.tsx # Responsive card showing perks list (desktop: sidebar, mobile: cards)
│   │       ├── RewardCardStack.tsx # 3D trading card displaying perks with flip animations
│   │       └── RewardUnlock.tsx   # Celebration overlay chest opening & sparks burst modal
│   ├── data/                 # Consolidated datasets
│   │   ├── ambassador.ts     # Multi-profile stats database config (Aarav, Priya, Rohan)
│   │   └── rewards.ts        # The 6 levels of rewards criteria (Scout, Ambassador, Founder, etc.)
│   ├── utils/                # Calculation helper modules
│   │   ├── cn.ts             # Tailwind class merging tool
│   │   ├── progression.ts    # Isolated logic determining locks, active levels, and milestones
│   │   └── persistence.ts    # LocalCache read/write hooks syncing scout edits and claim history
```

---

## 🕹️ Interactive Features

1. **High-Fidelity Landing Page**: Centered layout mirroring corporate visual aesthetics, complete with infinite scrolling orange gradients, custom badge SVGs, and absolute-positioned 3D rotating Rupee coins.
2. **Dynamic Ambassador Simulator**: A header workspace that allows toggling between three default student profiles and adjusting active scout metrics (scout numbers mutate instantly and recalculate ladder states).
3. **Horizontal Journey Path**: Custom horizontal milestones that scroll sideways on mobile viewports. Connects paths dynamically from registration statistics.
4. **Interactive Chest Unlocks**: Completed milestone chests can be opened to launch spark confetti overlays and reveal 3D trading cards. The trading card flips when clicked to display benefits on the back.
5. **Persistent Claim Transactions**: Achievements are logged dynamically with active **Claim Reward** options that cache status to `localStorage` securely.

---

## 🗺️ Sprint Timeline Summary

- **Sprint 0 (Foundation)**: Initialized Next.js, structured the 13 mascot PNG assets, and configured Tailwind CSS v4 variables.
- **Sprint 1 (Design Tokens)**: Formed class helpers, glass cards, buttons, badges, and responsive metadata structures.
- **Sprint 2 (Dashboard)**: Created welcome headers, campaign metrics blocks, and profiles.
- **Sprint 3 (Milestone Ladder)**: Built horizontal lines, milestone nodes, and active preview sidebars.
- **Sprint 4 (Celebration)**: Completed chest shakes, 3D flip card stacks, spark bursts, and overlay controllers.
- **Sprint 5 (Dynamic State)**: Programmed profile switchers, localStorage synchronizations, and claim transactions.
- **Sprint 6 (Polish)**: Enforced E2E QA checks, accessibility key events, prefers-reduced-motion media settings, and documentation updates.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build Production Bundle
```bash
npm run build
```
