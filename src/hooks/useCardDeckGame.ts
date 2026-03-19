import { useCallback, useMemo, useState } from 'react';
import { useGameFlow } from './useGameFlow';
import { drawRandomCard, pickNextCard } from '../utils/cardDeckLogic';

interface CardDeckGameState {
  gameState: 'start' | 'playing' | 'bingo';
  currentCardId: number | null;
  currentCardText: string | null;
  history: number[];
  successCount: number;
  failCount: number;
}

interface CardDeckGameActions {
  startGame: () => void;
  drawNewCard: () => void;
  submitResult: (value: 'success' | 'fail') => void;
  resetGame: () => void;
  dismissModal: () => void;
}

export function useCardDeckGame(): CardDeckGameState & CardDeckGameActions {
  const { gameState, setGameState, resetGame, dismissModal } = useGameFlow('start');

  const [currentCardId, setCurrentCardId] = useState<number | null>(null);
  const [currentCardText, setCurrentCardText] = useState<string | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  const deckEmpty = useMemo(() => currentCardId !== null && history.length >= 25, [currentCardId, history]);

  const drawCard = useCallback(() => {
    if (deckEmpty) {
      setCurrentCardId(-1);
      setCurrentCardText('Deck exhausted. Reset to shuffle and draw again.');
      return;
    }

    const nextCard = pickNextCard(currentCardId, history);
    if (nextCard.id === -1) {
      setCurrentCardId(-1);
      setCurrentCardText(nextCard.text);
      return;
    }

    setCurrentCardId(nextCard.id);
    setCurrentCardText(nextCard.text);
    setHistory((prev) => [...prev, nextCard.id]);
  }, [currentCardId, history, deckEmpty]);

  const startGame = useCallback(() => {
    const card = drawRandomCard();
    setCurrentCardId(card.id);
    setCurrentCardText(card.text);
    setHistory([card.id]);
    setSuccessCount(0);
    setFailCount(0);
    setGameState('playing');
  }, [setGameState]);

  const drawNewCard = useCallback(() => {
    drawCard();
  }, [drawCard]);

  const submitResult = useCallback(
    (value: 'success' | 'fail') => {
      if (value === 'success') {
        setSuccessCount((curr) => curr + 1);
      } else {
        setFailCount((curr) => curr + 1);
      }
      drawCard();
    },
    [drawCard]
  );

  const handleReset = useCallback(() => {
    resetGame();
    setCurrentCardId(null);
    setCurrentCardText(null);
    setHistory([]);
    setSuccessCount(0);
    setFailCount(0);
  }, [resetGame]);

  return {
    gameState,
    currentCardId,
    currentCardText,
    history,
    successCount,
    failCount,
    startGame,
    drawNewCard,
    submitResult,
    resetGame: handleReset,
    dismissModal,
  };
}
