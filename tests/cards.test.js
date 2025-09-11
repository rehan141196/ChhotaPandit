import { describe, it, expect } from 'vitest';
import { CARDS, getCategories, getCardsByCategories, getCardsByCategory, validateDeckConstraints } from '../src/cards.js';

describe('Cards Module', () => {
  describe('Card Database', () => {
    it('should have cards with required properties', () => {
      expect(CARDS.length).toBeGreaterThan(100); // We have 120 cards

      CARDS.forEach(card => {
        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('title');
        expect(card).toHaveProperty('category');
        expect(card).toHaveProperty('points');

        expect(typeof card.id).toBe('string');
        expect(typeof card.title).toBe('string');
        expect(typeof card.category).toBe('string');
        expect(typeof card.points).toBe('number');
        expect(card.points).toBeGreaterThanOrEqual(1);
        expect(card.points).toBeLessThanOrEqual(4);
      });
    });

    it('should have unique card IDs', () => {
      const ids = CARDS.map(card => card.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have cards distributed across multiple categories', () => {
      const categories = getCategories();
      expect(categories.length).toBeGreaterThanOrEqual(6);
      expect(categories).toContain('Bollywood');
      expect(categories).toContain('Sports');
      expect(categories).toContain('Historical');
      expect(categories).toContain('Food');
      expect(categories).toContain('TV Shows');
      expect(categories).toContain('Festivals');
    });
  });

  describe('Category Functions', () => {
    it('should return sorted categories', () => {
      const categories = getCategories();
      const sortedCategories = [...categories].sort();
      expect(categories).toEqual(sortedCategories);
    });

    it('should filter cards by categories', () => {
      const bollywoodCards = getCardsByCategories(['Bollywood']);
      const sportsCards = getCardsByCategories(['Sports']);

      expect(bollywoodCards.length).toBeGreaterThan(0);
      expect(sportsCards.length).toBeGreaterThan(0);

      bollywoodCards.forEach(card => {
        expect(card.category).toBe('Bollywood');
      });

      sportsCards.forEach(card => {
        expect(card.category).toBe('Sports');
      });
    });

    it('should filter cards by single category', () => {
      const foodCards = getCardsByCategory('Food');
      expect(foodCards.length).toBeGreaterThan(0);

      foodCards.forEach(card => {
        expect(card.category).toBe('Food');
      });
    });

    it('should handle multiple categories', () => {
      const multipleCards = getCardsByCategories(['Bollywood', 'Sports']);
      const bollywoodCount = getCardsByCategory('Bollywood').length;
      const sportsCount = getCardsByCategory('Sports').length;

      expect(multipleCards.length).toBe(bollywoodCount + sportsCount);
    });
  });

  describe('Deck Constraint Validation', () => {
    it('should validate successful deck constraints', () => {
      const result = validateDeckConstraints(['Bollywood', 'Sports'], 60);
      expect(result.isValid).toBe(true);
      expect(result.availableCards).toBe(100); // 50 + 50 cards
    });

    it('should reject empty categories', () => {
      const result = validateDeckConstraints([], 48);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('At least one category must be selected');
    });

    it('should reject insufficient total cards', () => {
      // Try to get more cards than available in a single small category
      const festivalsCards = getCardsByCategory('Festivals');
      const result = validateDeckConstraints(['Festivals'], festivalsCards.length + 10);

      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Not enough cards available');
    });

    it('should reject deck size smaller than category count', () => {
      const result = validateDeckConstraints(['Bollywood', 'Sports', 'Food'], 2);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Deck size must be at least 3');
    });

    it('should validate deck size constraints for large decks', () => {
      // With the 6-per-category limit removed from deck building,
      // we should be able to build larger decks as long as total cards are available
      const result = validateDeckConstraints(['Bollywood', 'Sports', 'Historical'], 80);
      expect(result.isValid).toBe(true);
      expect(result.availableCards).toBe(130); // 50 + 50 + 30 cards
    });

    it('should handle edge case of exactly enough cards', () => {
      // Test with exact number of available cards
      const result = validateDeckConstraints(['Historical'], 30);
      expect(result.isValid).toBe(true);
      expect(result.availableCards).toBe(30);
    });
  });
});
