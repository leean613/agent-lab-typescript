import { useCallback, useState } from 'react';
import type { GameState } from '../types';

interface UseGameFlowReturn {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  showModal: boolean;
  resetGame: () => void;
  dismissModal: () => void;
  announceWin: () => void;
}

export function useGameFlow(initialGameState: GameState = 'start'): UseGameFlowReturn {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [showModal, setShowModal] = useState(false);

  const resetGame = useCallback(() => {
    setGameState('start');
    setShowModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const announceWin = useCallback(() => {
    setGameState('bingo');
    setShowModal(true);
  }, []);

  return {
    gameState,
    setGameState,
    showModal,
    resetGame,
    dismissModal,
    announceWin,
  };
}
