# EYFI Reward Journey

A premium, gamified ambassador reward experience designed for the **EYFI** ecosystem. The application rewards ambassadors for their contribution and guides them along an interactive journey ladder with customized mascot characters and progressive tiers.

---

## 🚀 Tech Stack

- **Core**: [Next.js (v16.x)](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS (v4.0)](https://tailwindcss.com/)
- **Visual Assets**: 13 custom Gemini-generated mascots
- **Layout & Animations**: Glassmorphism, smooth CSS transitions, customizable animation placeholders.

---

## 📁 Folder Structure

The project conforms to a scalable production-ready layout:

```text
├── public/
│   └── assets/
│       └── mascots/          # Mascot image files (mascot-1.png to mascot-13.png)
├── src/
│   ├── app/                  # Next.js App Router (Layouts, pages, globals.css)
│   ├── components/           # UI and Business components
│   │   ├── ui/               # Reusable atomic elements (buttons, inputs, glass cards)
│   │   ├── reward-journey/   # Gamified progress lines, step animations, tier rewards
│   │   └── dashboard/        # Ambassador progress stats, active tasks, user stats
│   ├── data/                 # Static content, tiers metadata, and mock state
│   ├── assets/               # Local svg icons and design vectors
│   ├── animations/           # CSS animation frames or Framer Motion structures
│   └── utils/                # Helper files and custom hooks (e.g. cn class merger)
```

---

## 🗺️ Sprint Roadmap

### 🏁 Sprint 0: Project Foundation (Current)
- [x] Reorganize asset folders with clean, production-ready names.
- [x] Scaffold Next.js + TypeScript + Tailwind CSS structure.
- [x] Configure global CSS with responsive theme variables & glassy utilities.
- [x] Establish component categorization structure (`ui`, `reward-journey`, `dashboard`).
- [x] Deploy initial codebase structure to GitHub.

### 🎮 Sprint 1: Interactive Rewards Ladder
- [ ] Implement data models for the rewards tiers and point criteria.
- [ ] Build the desktop and mobile layouts for the dashboard.
- [ ] Design the reward ladder roadmap using mascot assets.
- [ ] Add initial hover/interaction sound mappings.

### ⚡ Sprint 2: Web3 Wallet & Operations
- [ ] Integrate Wallet Connect / Web3 authentication.
- [ ] Implement reward claim actions (mint tokens / assign ambassador roles).
- [ ] Connect animations to the ladder progression path (Framer Motion).

### 💅 Sprint 3: Final Polish & Deployment
- [ ] Perform cross-browser UI/UX testing and performance optimizations.
- [ ] Configure CI/CD deployment pipelines.
- [ ] Final handoff and mainnet deployment.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
