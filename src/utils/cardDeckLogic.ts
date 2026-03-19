import { questions } from '../data/questions';

export function drawRandomCard(excludedIds: number[] = []): { id: number; text: string } {
  const available = questions
    .map((text, index) => ({ id: index, text }))
    .filter((card) => !excludedIds.includes(card.id));

  if (available.length === 0) {
    throw new Error('No cards left to draw');
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

export function pickNextCard(currentId: number | null, history: number[]): { id: number; text: string } {
  const excluded = [...history];
  if (currentId !== null) {
    excluded.push(currentId);
  }

  const available = questions
    .map((text, index) => ({ id: index, text }))
    .filter((card) => !excluded.includes(card.id));

  if (available.length === 0) {
    return { id: -1, text: 'Deck exhausted. Shuffle to continue.' };
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}
