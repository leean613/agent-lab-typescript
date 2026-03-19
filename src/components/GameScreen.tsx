import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

import type { Resettable } from '../types';

interface GameScreenProps extends Resettable {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="relative min-h-full p-4 md:p-6">
      <div className="grid-overlay"></div>

      <header className="relative z-10 flex items-center justify-between py-2 px-4 md:px-6 bg-surface/80 border border-white/10 rounded-2xl backdrop-blur-sm mb-3">
        <button
          onClick={onReset}
          className="text-muted text-sm font-semibold px-3 py-1.5 uppercase tracking-wider rounded bg-white/5 hover:bg-white/10"
        >
          ← Back
        </button>
        <h1 className="grotesque-heading text-3xl md:text-4xl font-extrabold text-accent">Soc Ops</h1>
        <div className="w-16"></div>
      </header>

      <p className="relative z-10 text-sm text-muted font-medium mb-2 px-3 py-2 bg-panel/60 border border-white/10 rounded-lg">
        Tap a square when you find someone who matches it.
      </p>

      {hasBingo && (
        <div className="relative z-10 bg-bingo/20 text-bingo border border-bingo/40 text-center py-2 font-bold uppercase tracking-wider rounded-lg mb-3">
          🎉 BINGO! You got a line!
        </div>
      )}

      <div className="relative z-10 flex-1 p-2 md:p-4">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
