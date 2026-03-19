/** Domain types for the Bingo game */

export interface BingoSquareData {
  id: number;
  text: string;
  isMarked: boolean;
  isFreeSpace: boolean;
}

export interface BingoLine {
  type: 'row' | 'column' | 'diagonal';
  index: number;
  squares: number[];
}

export interface ScavengerItem {
  id: number;
  text: string;
  isChecked: boolean;
}

export type GameState = 'start' | 'playing' | 'bingo';

export type GameMode = 'bingo' | 'scavenger' | 'cardDeck';

export interface GameModeConfig {
  title: string;
  subtitle: string;
  instructionHeadline: string;
  instructionText: string;
}

// Shared UI prop shapes
export interface StartControls {
  mode: GameMode;
  onChangeMode: (mode: GameMode) => void;
  onStart: () => void;
}

export interface Resettable {
  onReset: () => void;
}

export interface ProgressBar {
  checked: number;
  total: number;
  percentage: number;
}
