import { describe, it, expect } from 'vitest';
import {
  generateScavengerList,
  toggleScavengerItem,
  calculateScavengerProgress,
  isScavengerComplete,
} from './scavengerLogic';

describe('scavengerLogic', () => {
  describe('generateScavengerList', () => {
    it('should return a list of scavenger items using question text and unchecked states', () => {
      const list = generateScavengerList();

      expect(list).toHaveLength(25);
      list.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('text');
        expect(item.text).toEqual(expect.any(String));
        expect(item.isChecked).toBe(false);
      });

      const ids = list.map((item) => item.id);
      expect(ids).toEqual(Array.from({ length: 25 }, (_, i) => i));
    });
  });

  describe('toggleScavengerItem', () => {
    it('should toggle an unchecked item to checked', () => {
      const list = generateScavengerList();
      const toggled = toggleScavengerItem(list, 0);
      expect(toggled[0].isChecked).toBe(true);
      expect(list[0].isChecked).toBe(false); // immutable
    });

    it('should toggle a checked item to unchecked', () => {
      const list = generateScavengerList();
      const toggled = toggleScavengerItem(toggleScavengerItem(list, 0), 0);
      expect(toggled[0].isChecked).toBe(false);
    });

    it('should not mutate unrelated items', () => {
      const list = generateScavengerList();
      const toggled = toggleScavengerItem(list, 3);
      expect(toggled[3].isChecked).toBe(true);
      expect(toggled[0].isChecked).toBe(false);
    });

    it('should return original array if id does not exist', () => {
      const list = generateScavengerList();
      const toggled = toggleScavengerItem(list, 999);
      expect(toggled).toEqual(list);
    });
  });

  describe('calculateScavengerProgress', () => {
    it('should calculate checked count, total count, and percentage', () => {
      const list = generateScavengerList();
      const partiallyChecked = toggleScavengerItem(list, 0);
      const stats = calculateScavengerProgress(partiallyChecked);

      expect(stats.total).toBe(25);
      expect(stats.checked).toBe(1);
      expect(stats.percentage).toBeCloseTo(4, 1); // 1/25 = 4%
    });
  });

  describe('isScavengerComplete', () => {
    it('should return false when not all items are checked', () => {
      const list = generateScavengerList();
      expect(isScavengerComplete(list)).toBe(false);
    });

    it('should return true when all items are checked', () => {
      const list = generateScavengerList();
      const allChecked = list.map((item) => ({ ...item, isChecked: true }));
      expect(isScavengerComplete(allChecked)).toBe(true);
    });
  });
});
