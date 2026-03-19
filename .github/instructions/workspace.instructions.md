# Workspace Instructions: soc-ops (agent-lab-typescript)

## ✅ Mandatory development checklist
- [ ] npm run lint
- [ ] npm run test
- [ ] npm run build

## Quick start
- npm install
- npm run dev (open http://localhost:5173/)

## Essential files & structure
- src/App.tsx: root app
- src/components/: bingo UI
- src/hooks/useBingoGame.ts: game state
- src/utils/bingoLogic.ts: bingo validation
- src/data/questions.ts: phrase list
- workshop/: lab exercises
- .github/instructions: prompt policies

## Tasks
- Keep workshop guide open/pinned
- Generate/maintain workspace instructions
- Use background/cloud agents for safe automated edits

## Guardrails
- Clean, accessible UI, no dark purple gradient themes
- React+TS+Tailwind v4 and Vite pipeline

## Notes for agents
- Bingo detection in bingoLogic.ts
- Build: tsc -b && vite build
- Test: vitest run
