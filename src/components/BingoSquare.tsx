import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-3 text-center border rounded-xl transition-[transform,box-shadow] duration-150 select-none min-h-[70px] text-xs sm:text-sm leading-tight font-semibold tracking-tight';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-bingo/30 border-bingo text-bingo shadow-[0_0_0_2px_rgba(235,185,54,0.8)]'
      : 'bg-marked border-marked-border text-accent shadow-[0_0_0_2px_rgba(0,210,255,0.55)]'
    : 'bg-surface border-white/10 text-text hover:bg-surface/90 hover:scale-[1.02] active:scale-[0.99]';

  const freeSpaceClasses = square.isFreeSpace ? 'font-black text-accent2 text-sm tracking-widest uppercase' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
      title={square.text}
    >
      <span className="whitespace-pre-line break-words">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-1 right-1 text-xs text-accent2 font-bold">✓</span>
      )}
    </button>
  );
}
