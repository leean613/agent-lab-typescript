import type { GameMode } from '../types';

export interface GameModeConfig {
  title: string;
  subtitle: string;
  instructionHeadline: string;
  instructionText: string;
}

export const gameModeConfig: Record<GameMode, GameModeConfig> = {
  bingo: {
    title: 'Soc Ops',
    subtitle: 'Social Bingo — Grotesque Type Grid',
    instructionHeadline: 'How to Play Bingo',
    instructionText: '1) Scan the crowd and find people matching each prompt. 2) Tap a square when you confirm a match. 3) Get 5 in a row to score BINGO.',
  },
  scavenger: {
    title: 'Soc Ops',
    subtitle: 'Scavenger Hunt — Checklist Adventure',
    instructionHeadline: 'How to Play Scavenger Hunt',
    instructionText: 'Check off items in the list as you complete them. Finish all 25 to win!',
  },
  cardDeck: {
    title: 'Soc Ops',
    subtitle: 'Card Deck Shuffle — Random Prompts',
    instructionHeadline: 'How to Play Card Deck Shuffle',
    instructionText: 'Draw a card to get a random question prompt. Keep tapping Draw Card for a new one.',
  },
};
