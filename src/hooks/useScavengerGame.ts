import { useCallback, useMemo, useState } from 'react';
import type { ScavengerItem } from '../types';
import { useGameFlow } from './useGameFlow';
import { generateScavengerList, toggleScavengerItem, calculateScavengerProgress, isScavengerComplete } from '../utils/scavengerLogic';

interface ScavengerGameState {
  gameState: 'start' | 'playing' | 'bingo';
  items: ScavengerItem[];
  progress: { checked: number; total: number; percentage: number };
  showCompleteModal: boolean;
}

interface ScavengerGameActions {
  startGame: () => void;
  handleItemClick: (itemId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
}

export function useScavengerGame(): ScavengerGameState & ScavengerGameActions {
  const { gameState, setGameState, showModal, resetGame, dismissModal, announceWin } = useGameFlow('start');
  const [items, setItems] = useState<ScavengerItem[]>([]);

  const progress = useMemo(() => calculateScavengerProgress(items), [items]);

  const startGame = useCallback(() => {
    const list = generateScavengerList();
    setItems(list);
    setGameState('playing');
  }, [setGameState]);

  const handleItemClick = useCallback(
    (itemId: number) => {
      setItems((currentItems) => {
        const nextItems = toggleScavengerItem(currentItems, itemId);
        const completed = isScavengerComplete(nextItems);

        if (completed) {
          announceWin();
        }

        return nextItems;
      });
    },
    [announceWin]
  );

  const handleReset = useCallback(() => {
    resetGame();
    setItems([]);
  }, [resetGame]);

  return {
    gameState,
    items,
    progress,
    showCompleteModal: showModal,
    startGame,
    handleItemClick,
    resetGame: handleReset,
    dismissModal,
  };
}
