import type { ScavengerItem, ProgressBar, Resettable } from '../types';

interface ScavengerScreenProps extends Resettable {
    items: ScavengerItem[];
    progress: ProgressBar;
    completed: boolean;
    onItemToggle: (itemId: number) => void;
}

export function ScavengerScreen({
    items,
    progress,
    completed,
    onItemToggle,
    onReset,
}: ScavengerScreenProps) {
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
                <h1 className="grotesque-heading text-3xl md:text-4xl font-extrabold text-accent">Scavenger Hunt</h1>
                <div className="w-16"></div>
            </header>

            <div className="relative z-10 px-3 py-2 bg-panel/60 border border-white/10 rounded-lg mb-3">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-text">Progress</span>
                    <span className="text-sm font-semibold text-accent">{progress.checked}/{progress.total}</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent transition-all" style={{ width: `${progress.percentage}%` }}></div>
                </div>
            </div>

            {completed && (
                <div className="relative z-10 bg-bingo/20 text-bingo border border-bingo/40 text-center py-2 font-bold uppercase tracking-wider rounded-lg mb-3">
                    🎉 Scavenger Hunt complete!
                </div>
            )}

            <ul className="relative z-10 space-y-2 max-h-[calc(100vh-230px)] overflow-y-auto p-2">
                {items.map((item) => (
                    <li key={item.id}>
                        <label className="flex items-center gap-3 p-2 rounded-lg border border-white/10 bg-surface/70 hover:bg-white/10 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={item.isChecked}
                                onChange={() => onItemToggle(item.id)}
                                className="w-4 h-4"
                            />
                            <span className={`text-sm ${item.isChecked ? 'line-through text-muted' : 'text-text'}`}>
                                {item.text}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
