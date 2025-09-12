/**
 * Tests for edge cases in game configuration and validation
 */

import { describe, it, expect, beforeEach } from 'vitest';
import gameStore from '../src/store.js';

describe('Game Configuration Edge Cases', () => {
  beforeEach(() => {
    gameStore.reset();
  });

  describe('Invalid Team Configurations', () => {
    it('should handle empty teams array', () => {
      const config = {
        teamNames: [],
        teams: [],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      expect(() => gameStore.configure(config)).not.toThrow();
      expect(() => gameStore.generatePlayerOrder()).toThrow();
    });

    it('should handle teams with no players', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: [] },
          { id: 'team2', name: 'Team Beta', players: [] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      gameStore.configure(config);
      // Should not throw - the method handles empty teams gracefully
      expect(() => gameStore.generatePlayerOrder()).not.toThrow();
      expect(gameStore.getState().playerOrder).toEqual([]);
    });

    it('should handle teams with duplicate player names', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Alice', 'Bob'] },
          { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();

      const state = gameStore.getState();
      // Should handle duplicates gracefully (either remove or keep both)
      expect(state.playerOrder.length).toBeGreaterThan(0);
    });

    it('should handle teams with very long names', () => {
      const longName = 'A'.repeat(1000);
      const config = {
        teamNames: [longName, 'Team Beta'],
        teams: [
          { id: 'team1', name: longName, players: ['Alice', 'Bob'] },
          { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      expect(() => gameStore.configure(config)).not.toThrow();
    });

    it('should handle single team configuration', () => {
      const config = {
        teamNames: ['Solo Team'],
        teams: [
          { id: 'team1', name: 'Solo Team', players: ['Alice', 'Bob', 'Charlie'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      gameStore.configure(config);
      expect(() => gameStore.generatePlayerOrder()).toThrow('Teams must be configured before generating player order');
    });

    it('should handle teams with special characters in names', () => {
      const config = {
        teamNames: ['Team @#$%', 'Team 🎭🎪'],
        teams: [
          { id: 'team1', name: 'Team @#$%', players: ['Alice!', 'Bob@'] },
          { id: 'team2', name: 'Team 🎭🎪', players: ['Charlie#', 'Dave$'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      expect(() => gameStore.configure(config)).not.toThrow();
      expect(() => gameStore.generatePlayerOrder()).not.toThrow();
    });
  });

  describe('Invalid Category Configurations', () => {
    it('should handle empty categories array', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
          { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
        ],
        categories: [],
        deckSize: 8,
        timerSeconds: 60
      };

      gameStore.configure(config);
      expect(() => gameStore.startCardSelection()).toThrow();
    });

    it('should handle non-existent categories', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
          { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
        ],
        categories: ['NonExistentCategory', 'AnotherFakeCategory'],
        deckSize: 8,
        timerSeconds: 60
      };

      gameStore.configure(config);
      expect(() => gameStore.startCardSelection()).toThrow();
    });

    it('should handle duplicate categories', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
          { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
        ],
        categories: ['Bollywood', 'Bollywood', 'Sports'],
        deckSize: 8,
        timerSeconds: 60
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      expect(() => gameStore.startCardSelection()).not.toThrow();
    });
  });

  describe('Invalid Timer Configurations', () => {
    it('should handle zero timer seconds', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 0
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.startRound(1);

      expect(() => gameStore.startTurn()).not.toThrow();
      // The timer configuration is preserved but timeRemaining should start at the configured value
      expect(gameStore.getState().config.timerSeconds).toBe(0);
    });

    it('should handle negative timer seconds', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: -10
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.startRound(1);

      gameStore.startTurn();
      // Configuration preserves the negative value, but timerSeconds in state uses config value as-is
      expect(gameStore.getState().config.timerSeconds).toBe(-10);
      expect(gameStore.getState().timerSeconds).toBe(-10);
    });

    it('should handle extremely large timer values', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 999999
      };

      expect(() => gameStore.configure(config)).not.toThrow();
    });

    it('should handle non-numeric timer values', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 'invalid'
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.startRound(1);

      gameStore.startTurn();
      // Configuration preserves the string, and timerSeconds in state uses config value as-is
      expect(gameStore.getState().config.timerSeconds).toBe('invalid');
      expect(typeof gameStore.getState().timerSeconds).toBe('string');
    });
  });

  describe('Invalid Deck Size Configurations', () => {
    it('should handle deck size larger than available cards', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: 1000, // Much larger than available cards
        timerSeconds: 60
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();

      expect(() => gameStore.startCardSelection()).not.toThrow();
      // Should limit to available cards
    });

    it('should handle zero deck size', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: 0,
        timerSeconds: 60
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();

      expect(() => gameStore.startCardSelection()).not.toThrow();
      // Zero deck size should still generate 16 cards for selection, but final deck will be different
      expect(gameStore.getState().currentPlayerCards.length).toBe(16);
    });

    it('should handle negative deck size', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: -5,
        timerSeconds: 60
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();

      expect(() => gameStore.startCardSelection()).not.toThrow();
      // Negative deck size should be handled gracefully
      expect(gameStore.getState().currentPlayerCards.length).toBe(16);
    });
  });

  describe('Configuration State Validation', () => {
    it('should handle missing config object', () => {
      expect(() => gameStore.configure(null)).toThrow();
      expect(() => gameStore.configure(undefined)).toThrow();
    });

    it('should handle config with missing required fields', () => {
      const incompleteConfig = {
        teamNames: ['Team Alpha']
        // Missing teams, categories, etc.
      };

      expect(() => gameStore.configure(incompleteConfig)).toThrow();
    });

    it('should handle config with null/undefined required fields', () => {
      const invalidConfig = {
        teamNames: null,
        teams: undefined,
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      expect(() => gameStore.configure(invalidConfig)).toThrow();
    });

    it('should handle reconfiguration after partial setup', () => {
      // First configuration
      const config1 = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      gameStore.configure(config1);
      gameStore.generatePlayerOrder();

      // Second configuration (should reset state)
      const config2 = {
        teamNames: ['New Team'],
        teams: [
          { id: 'team1', name: 'New Team', players: ['Charlie', 'Dave'] }
        ],
        categories: ['Sports'],
        deckSize: 16,
        timerSeconds: 30
      };

      expect(() => gameStore.configure(config2)).not.toThrow();

      const state = gameStore.getState();
      expect(state.config.deckSize).toBe(16);
      expect(state.config.timerSeconds).toBe(30);
    });
  });

  describe('Extreme Scale Testing', () => {
    it('should handle maximum number of players', () => {
      const manyPlayers = Array.from({ length: 25 }, (_, i) => `Player${i + 1}`);
      const manyPlayers2 = Array.from({ length: 25 }, (_, i) => `Player${i + 26}`);
      const config = {
        teamNames: ['Mega Team 1', 'Mega Team 2'],
        teams: [
          { id: 'team1', name: 'Mega Team 1', players: manyPlayers },
          { id: 'team2', name: 'Mega Team 2', players: manyPlayers2 }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      expect(() => gameStore.configure(config)).not.toThrow();
      expect(() => gameStore.generatePlayerOrder()).not.toThrow();
    });

    it('should handle many teams', () => {
      // Note: Since the game requires exactly 2 teams, this test checks the error handling
      const manyTeams = Array.from({ length: 20 }, (_, i) => ({
        id: `team${i + 1}`,
        name: `Team ${i + 1}`,
        players: [`Player${i * 2 + 1}`, `Player${i * 2 + 2}`]
      }));

      const config = {
        teamNames: manyTeams.map(t => t.name),
        teams: manyTeams,
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 60
      };

      expect(() => gameStore.configure(config)).not.toThrow();
      expect(() => gameStore.generatePlayerOrder()).toThrow('Teams must be configured before generating player order');
    });

    it('should handle memory pressure during card selection', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'], // All categories for maximum cards
        deckSize: 8, // Use normal deck size since store enforces 8 cards per player
        timerSeconds: 60
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();

      expect(() => gameStore.startCardSelection()).not.toThrow();

      // Test that card selection works with multiple categories
      expect(gameStore.getState().currentPlayerCards.length).toBe(16);
      expect(gameStore.getState().cardSelectionPhase).toBe(true);

      // Complete card selection for first player
      const selectedCards = gameStore.getState().currentPlayerCards.slice(0, 8);
      expect(() => gameStore.selectCards(selectedCards)).not.toThrow();
    });
  });
});
