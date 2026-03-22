# Operation Dark Cloud

**Administrative Accountability Matrix — Newanforbi v. CDCR DAPO Stockton**

> **Live site:** https://newanforbi.github.io/operation-dark-cloud/

A React-based tracker for coordinating multi-vector accountability actions against California Department of Corrections and Rehabilitation (CDCR) Division of Adult Parole Operations personnel implicated in documented constitutional violations, misconduct, and retaliation.

---

## Features

- **Three view modes** — organize by Agent, by Vector (action pathway), or by Priority
- **Task completion tracking** — check off completed actions with persistent state via localStorage
- **Per-task notes** — attach and save notes to any individual action item
- **Priority indicators** — color-coded status levels: Critical, High, Medium, Low, Done
- **Progress dashboard** — live stats showing total tasks, completed count, and percentage
- **Zero account required** — all data is stored locally in the browser; nothing leaves your device

---

## Agents Tracked

| Agent | Role | Color |
|---|---|---|
| Gary Noguchi | Unit Supervisor | Red |
| A. Derrick | Parole Agent | Orange |
| Glenn Urrea | Parole Agent | Amber |
| Long Moua | Parole Agent | Lime |
| Joseelyn Rojo | Parole Agent | Cyan |

---

## Action Vectors

Ten parallel accountability pathways are tracked simultaneously:

1. **POST Decertification (SB 2)** — Professional license revocation via CA Commission on Peace Officer Standards
2. **US DOJ Civil Rights Division** — Federal civil rights intervention
3. **CA DOJ / Attorney General** — State criminal referral and prosecution
4. **Office of the Inspector General** — Independent CDCR oversight
5. **Administrative Law Judge (Writ Petition)** — Judicial challenge to administrative decisions
6. **State Personnel Board (SPB)** — Direct civil service discipline
7. **California Civil Rights Department** — Discrimination and retaliation complaints
8. **BBS / Clinical Contractors** — Clinical licensing board complaints *(completed)*
9. **OIA Internal Affairs** — CDCR internal affairs complaints
10. Additional vectors for parallel pressure

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS (CDN) |
| Persistence | Browser localStorage |
| Deployment | GitHub Pages via GitHub Actions |

---

## Local Development

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the project with Vite and deploys to GitHub Pages.

**First-time setup:** In the repo go to **Settings → Pages → Source** and select **GitHub Actions**.

The live site updates within ~60 seconds of a push to `main`.

---

## Data & Privacy

All task progress and notes are stored exclusively in your browser's localStorage under the key `accountability-tracker-v2`. No data is transmitted to any server. Clearing browser site data will reset progress.

---

## Case Reference

*Newanforbi v. CDCR DAPO Stockton* — ongoing administrative and civil rights proceedings against Stockton-area parole supervision personnel for documented violations including retaliation, constitutional violations, and professional misconduct.
