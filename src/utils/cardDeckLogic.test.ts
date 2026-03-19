import { describe, it, expect } from 'vitest';
import { drawRandomCard, pickNextCard } from './cardDeckLogic';
import { questions } from '../data/questions';

describe('cardDeckLogic', () => {
  it('drawRandomCard returns one of the questions', () => {
    const card = drawRandomCard();
    expect(card).toHaveProperty('id');
    expect(card).toHaveProperty('text');
    expect(card.text).toBe(questions[card.id]);
  });

  it('drawRandomCard does not return excluded IDs', () => {
    const excluded = [0, 1, 2, 3, 4];
    const card = drawRandomCard(excluded);
    expect(excluded).not.toContain(card.id);
  });

  it('pickNextCard returns a new card when available', () => {
    const first = drawRandomCard();
    const second = pickNextCard(first.id, [first.id]);
    expect(second.id).not.toBe(first.id);
    expect(second.text).toBe(questions[second.id]);
  });

  it('pickNextCard indicates deck exhausted when no cards remain', () => {
    const history = questions.map((_, i) => i);
    const result = pickNextCard(null, history);
    expect(result.id).toBe(-1);
    expect(result.text).toMatch(/Deck exhausted/);
  });

  it('pickNextCard picks correct card when current is provided and history includes it', () => {
    const first = drawRandomCard();
    const next = pickNextCard(first.id, [first.id]);

    expect(next.id).not.toBe(first.id);
    expect(next.text).toBe(questions[next.id]);
  });
});