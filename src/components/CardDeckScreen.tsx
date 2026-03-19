import type { Resettable } from '../types';

interface CardDeckScreenProps extends Resettable {
    currentText: string | null;
    historyCount: number;
    successCount: number;
    failCount: number;
    onDrawCard: () => void;
    onSubmitResult: (value: 'success' | 'fail') => void;
}

export function CardDeckScreen({ currentText, historyCount, successCount, failCount, onDrawCard, onSubmitResult, onReset }: CardDeckScreenProps) {
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
                <h1 className="grotesque-heading text-3xl md:text-4xl font-extrabold text-accent">Card Deck Shuffle</h1>
                <div className="w-16"></div>
            </header>

            <div className="relative z-10 p-4 bg-panel/80 border border-white/10 rounded-2xl mb-4 min-h-[220px] flex items-center justify-center text-center">
                {currentText ? (
                    <p className="text-lg md:text-xl font-semibold text-text leading-relaxed">{currentText}</p>
                ) : (
                    <p className="text-sm text-muted">Tap Draw Card to get your first prompt.</p>
                )}
            </div>

            <div className="relative z-10 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => onSubmitResult('fail')}
                        className="w-full bg-red-500 text-white hover:bg-red-400 font-bold py-3 rounded-lg transition-all border border-white/20"
                    >
                        Left (Fail)
                    </button>
                    <button
                        onClick={() => onSubmitResult('success')}
                        className="w-full bg-emerald-500 text-black hover:bg-emerald-400 font-bold py-3 rounded-lg transition-all border border-white/20"
                    >
                        Right (Success)
                    </button>
                </div>

                <button
                    onClick={onDrawCard}
                    className="w-full bg-accent text-black hover:bg-accent2 font-bold py-3 rounded-lg transition-all border border-white/20 shadow-[0_8px_20px_rgba(0,210,255,0.35)]"
                >
                    Draw Card
                </button>

                <div className=" text-sm text-muted text-center">Cards drawn: {historyCount}</div>
                <div className="text-sm text-muted text-center">Success: {successCount} | Fail: {failCount}</div>
            </div>
        </div>
    );
}
