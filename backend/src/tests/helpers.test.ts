import { generateId, calculateSavings } from '../utils/helpers';

describe('Utility Helpers', () => {
  test('generateId should create a unique string with prefix', () => {
    const id = generateId('TEST');
    expect(id).toMatch(/^TEST-/);
    expect(id.length).toBeGreaterThan(10);
  });

  test('calculateSavings should return correct percentage', () => {
    const savings = calculateSavings(1000, 900);
    expect(savings).toBe(10); // 10% savings
  });

  test('calculateSavings should handle zero estimated cost', () => {
    const savings = calculateSavings(0, 900);
    expect(savings).toBe(0);
  });
});
