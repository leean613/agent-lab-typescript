import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import App from './App';

beforeEach(() => {
    cleanup();
    localStorage.clear();
});

afterEach(() => {
    cleanup();
    localStorage.clear();
});

describe('App mode switching', () => {
    it('hydrates with StartScreen and can switch to scavenger mode', async () => {
        render(<App />);

        // Start screen should show the mode buttons
        const bingoButton = screen.getByRole('button', { name: /Bingo/i });
        const scavengerButton = screen.getByRole('button', { name: /Scavenger Hunt/i });
        expect(bingoButton).toBeInTheDocument();
        expect(scavengerButton).toBeInTheDocument();

        // Choose scavenger mode and start game
        fireEvent.click(scavengerButton);
        fireEvent.click(screen.getByRole('button', { name: /Start Game/i }));

        // Should render scavenger screen with progress indicator
        expect(screen.getByText(/Scavenger Hunt/i)).toBeInTheDocument();
        expect(screen.getByText(/Progress/i)).toBeInTheDocument();

        // Click back to start screen
        fireEvent.click(screen.getByRole('button', { name: /← Back/i }));
        expect(screen.getByText(/How to Play/i)).toBeInTheDocument();
    });

    it('switches to bingo mode and starts bingo game', () => {
        render(<App />);

        const bingoButton = screen.getByRole('button', { name: /Bingo/i });
        fireEvent.click(bingoButton);
        fireEvent.click(screen.getByRole('button', { name: /Start Game/i }));

        expect(screen.getByText(/Tap a square when you find someone who matches it./i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /← Back/i })).toBeInTheDocument();
    });

    it('switches to card deck mode and supports draw + submit actions', () => {
        render(<App />);

        const cardDeckButton = screen.getByRole('button', { name: /Card Deck/i });
        fireEvent.click(cardDeckButton);
        fireEvent.click(screen.getByRole('button', { name: /Start Game/i }));

        expect(screen.getByText(/Card Deck Shuffle/i)).toBeInTheDocument();
        expect(screen.getByText(/Cards drawn: 1/i)).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Right \(Success\)/i }));
        expect(screen.getByText(/Success: 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Cards drawn: 2/i)).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Left \(Fail\)/i }));
        expect(screen.getByText(/Fail: 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Cards drawn: 3/i)).toBeInTheDocument();
    });
});
