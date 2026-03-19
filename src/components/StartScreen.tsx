import type { GameModeConfig, StartControls } from '../types';

interface StartScreenProps extends StartControls {
  modeConfig: GameModeConfig;
}

export function StartScreen({ mode, onChangeMode, onStart, modeConfig }: StartScreenProps) {
  return (
    <div className="relative min-h-full p-6 flex items-center justify-center overflow-hidden">
      <div className="grid-overlay"></div>
      <div className="relative z-10 w-full max-w-lg p-8 rounded-2xl border border-white/10 bg-panel shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        <h1 className="grotesque-heading text-5xl font-black text-accent leading-tight mb-2">{modeConfig.title}</h1>
        <p className="text-xl text-muted font-semibold tracking-wide mb-6">{modeConfig.subtitle}</p>

        <div className="bg-surface/70 border border-white/10 p-5 rounded-xl mb-6">
          <h2 className="text-sm text-accent2 uppercase tracking-[0.2em] mb-2">Mode</h2>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onChangeMode('bingo')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${mode === 'bingo' ? 'bg-accent text-black' : 'bg-white/10 text-text hover:bg-white/20'
                }`}
            >
              Bingo
            </button>
            <button
              onClick={() => onChangeMode('scavenger')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${mode === 'scavenger' ? 'bg-accent text-black' : 'bg-white/10 text-text hover:bg-white/20'
                }`}
            >
              Scavenger Hunt
            </button>
            <button
              onClick={() => onChangeMode('cardDeck')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${mode === 'cardDeck' ? 'bg-accent text-black' : 'bg-white/10 text-text hover:bg-white/20'
                }`}
            >
              Card Deck
            </button>
          </div>
        </div>

        <div className="bg-surface/70 border border-white/10 p-5 rounded-xl mb-8">
          <h2 className="text-sm text-accent2 uppercase tracking-[0.2em] mb-2">{modeConfig.instructionHeadline}</h2>
          <p className="text-sm text-text/90 font-medium mb-3">{modeConfig.instructionText}</p>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-accent text-black hover:bg-accent2 font-bold py-3 rounded-lg transition-all border border-white/20 shadow-[0_8px_20px_rgba(0,210,255,0.35)]"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
