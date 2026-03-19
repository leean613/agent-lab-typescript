import { questions } from '../data/questions';
import type { ScavengerItem } from '../types';

export type { ScavengerItem } from '../types';

export function generateScavengerList(): ScavengerItem[] {
  return questions.map((text, index) => ({
    id: index,
    text,
    isChecked: false,
  }));
}

export function toggleScavengerItem(items: ScavengerItem[], id: number): ScavengerItem[] {
  let changed = false;
  const newItems = items.map((item) => {
    if (item.id === id) {
      changed = true;
      return { ...item, isChecked: !item.isChecked };
    }
    return item;
  });

  return changed ? newItems : items;
}

export function calculateScavengerProgress(items: ScavengerItem[]) {
  const total = items.length;
  const checked = items.filter((item) => item.isChecked).length;
  const percentage = total === 0 ? 0 : (checked / total) * 100;

  return {
    total,
    checked,
    percentage,
  };
}

export function isScavengerComplete(items: ScavengerItem[]) {
  return items.every((item) => item.isChecked);
}
