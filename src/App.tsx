import { useMemo, useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { useScavengerGame } from './hooks/useScavengerGame';
import { useCardDeckGame } from './hooks/useCardDeckGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { ScavengerScreen } from './components/ScavengerScreen';
import { CardDeckScreen } from './components/CardDeckScreen';
import { BingoModal } from './components/BingoModal';
import { gameModeConfig } from './data/gameModes';
import type { GameMode } from './types';

function App() {
  const [mode, setMode] = useState<GameMode>('bingo');

  const bingo = useBingoGame();
  const scavenger = useScavengerGame();
  const cardDeck = useCardDeckGame();

  const currentGameState =
    mode === 'bingo'
      ? bingo.gameState
      : mode === 'scavenger'
        ? scavenger.gameState
        : cardDeck.gameState;

  const currentModeConfig = useMemo(() => gameModeConfig[mode], [mode]);

  if (currentGameState === 'start') {
    const onStart =
      mode === 'bingo'
        ? bingo.startGame
        : mode === 'scavenger'
          ? scavenger.startGame
          : cardDeck.startGame;
    return (
      <StartScreen
        mode={mode}
        modeConfig={currentModeConfig}
        onChangeMode={setMode}
        onStart={onStart}
      />
    );
  }

  const modalState = {
    showModal:
      mode === 'bingo'
        ? bingo.showBingoModal
        : mode === 'scavenger'
          ? scavenger.showCompleteModal
          : false,
    onDismiss:
      mode === 'bingo'
        ? bingo.dismissModal
        : mode === 'scavenger'
          ? scavenger.dismissModal
          : cardDeck.dismissModal,
  };

  return (
    <>
      <ModePlayback mode={mode} bingo={bingo} scavenger={scavenger} cardDeck={cardDeck} />
      {modalState.showModal && <BingoModal onDismiss={modalState.onDismiss} />}
    </>
  );
}

interface ModePlaybackProps {
  mode: GameMode;
  bingo: ReturnType<typeof useBingoGame>;
  scavenger: ReturnType<typeof useScavengerGame>;
  cardDeck: ReturnType<typeof useCardDeckGame>;
}

function ModePlayback({ mode, bingo, scavenger, cardDeck }: ModePlaybackProps) {
  if (mode === 'bingo') {
    return (
      <GameScreen
        board={bingo.board}
        winningSquareIds={bingo.winningSquareIds}
        hasBingo={bingo.gameState === 'bingo'}
        onSquareClick={bingo.handleSquareClick}
        onReset={bingo.resetGame}
      />
    );
  }

  if (mode === 'scavenger') {
    return (
      <ScavengerScreen
        items={scavenger.items}
        progress={scavenger.progress}
        completed={scavenger.gameState === 'bingo'}
        onItemToggle={scavenger.handleItemClick}
        onReset={scavenger.resetGame}
      />
    );
  }

  return (
    <CardDeckScreen
      currentText={cardDeck.currentCardText}
      historyCount={cardDeck.history.length}
      successCount={cardDeck.successCount}
      failCount={cardDeck.failCount}
      onDrawCard={cardDeck.drawNewCard}
      onSubmitResult={cardDeck.submitResult}
      onReset={cardDeck.resetGame}
    />
  );
}

export default App;
