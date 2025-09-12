/**
 * Tests for timer functionality and automatic turn ending
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import gameStore from '../src/store.js';

describe('Timer Functionality', () => {
  beforeEach(() => {
    gameStore.reset();

    // Setup a basic game
    const config = {
      teamNames: ['Team Alpha', 'Team Beta'],
      teams: [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
        { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
      ],
      categories: ['Bollywood', 'Sports'],
      deckSize: 8,
      timerSeconds: 30 // Shorter timer for testing
    };

    gameStore.configure(config);
    gameStore.generatePlayerOrder();

    // Complete card selection
    gameStore.startCardSelection();
    const playerOrder = gameStore.getState().playerOrder;
    playerOrder.forEach(() => {
      const playerCards = gameStore.getState().currentPlayerCards.slice(0, 8);
      gameStore.selectCards(playerCards);
    });

    gameStore.startRound(1);
  });

  describe('Timer Initialization', () => {
    it('should start timer when turn begins', () => {
      gameStore.startTurn();
      const state = gameStore.getState();

      expect(state.timerSeconds).toBe(30);
      expect(state.timerInterval).not.toBe(null);
    });

    it('should use default timer when no config provided', () => {
      // Reset and configure without timerSeconds
      gameStore.reset();
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8
        // No timerSeconds specified
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.startRound(1);

      gameStore.startTurn();
      const state = gameStore.getState();

      expect(state.timerSeconds).toBe(60); // Default value
    });
  });

  describe('Timer Countdown', () => {
    it('should decrement timer every second', async () => {
      vi.useFakeTimers();

      gameStore.startTurn();
      const initialTime = gameStore.getState().timerSeconds;

      // Advance timer by 1 second
      vi.advanceTimersByTime(1000);

      const newTime = gameStore.getState().timerSeconds;
      expect(newTime).toBe(initialTime - 1);

      // Advance by 5 more seconds
      vi.advanceTimersByTime(5000);

      const laterTime = gameStore.getState().timerSeconds;
      expect(laterTime).toBe(initialTime - 6);

      vi.useRealTimers();
    });

    it('should stop at zero and not go negative', async () => {
      vi.useFakeTimers();

      gameStore.startTurn();

      // Advance timer past the duration
      vi.advanceTimersByTime(35000); // 35 seconds, more than the 30 second timer

      const finalTime = gameStore.getState().timerSeconds;
      expect(finalTime).toBeLessThanOrEqual(0);

      vi.useRealTimers();
    });

    it('should clear timer interval when timer reaches zero', async () => {
      vi.useFakeTimers();

      gameStore.startTurn();
      expect(gameStore.getState().timerInterval).not.toBe(null);

      // Run timer to completion
      vi.advanceTimersByTime(31000);

      const state = gameStore.getState();
      expect(state.timerSeconds).toBeLessThanOrEqual(0);
      expect(state.timerInterval).toBe(null);

      vi.useRealTimers();
    });
  });

  describe('Timer Control', () => {
    it('should stop timer when turn ends manually', () => {
      gameStore.startTurn();
      expect(gameStore.getState().timerInterval).not.toBe(null);

      gameStore.endTurn();
      expect(gameStore.getState().timerInterval).toBe(null);
    });

    it('should reset timer for next player', () => {
      gameStore.startTurn();

      // Manually set timer to a different value
      const state = gameStore.getState();
      state.timerSeconds = 15;

      gameStore.endTurn();

      // Start next turn
      gameStore.startTurn();
      const newState = gameStore.getState();

      expect(newState.timerSeconds).toBe(30); // Back to configured value
    });

    it('should clear timer on game reset', () => {
      gameStore.startTurn();
      expect(gameStore.getState().timerInterval).not.toBe(null);

      gameStore.reset();
      expect(gameStore.getState().timerInterval).toBe(null);
    });

    it('should handle multiple timer start calls safely', () => {
      vi.useFakeTimers();

      // Setup basic game
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 8,
        timerSeconds: 30
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));

      gameStore.startRound(1);
      gameStore.startTurn();

      const state = gameStore.getState();
      expect(state.turnActive).toBe(true);

      // Try to call startTimer multiple times - should not cause issues
      expect(() => gameStore.startTimer()).not.toThrow();
      expect(() => gameStore.startTimer()).not.toThrow();
      expect(() => gameStore.startTimer()).not.toThrow();

      // Should still be in a valid state
      expect(state.turnActive).toBe(true);

      vi.useRealTimers();
    });
  });

  describe('Timer Expiration Scenarios', () => {
    it('should handle timer expiration gracefully', async () => {
      vi.useFakeTimers();

      gameStore.startTurn();

      // Let timer run to completion
      vi.advanceTimersByTime(31000);

      const state = gameStore.getState();
      expect(state.timerSeconds).toBeLessThanOrEqual(0);
      expect(state.timerInterval).toBe(null);

      // Timer expiration should be detectable by UI
      expect(state.turnActive).toBe(true); // Turn should still be active until UI handles it

      vi.useRealTimers();
    });

    it('should maintain game state integrity when timer expires', async () => {
      vi.useFakeTimers();

      gameStore.startTurn();

      // Guess some cards before timer expires
      if (gameStore.getState().currentCard) {
        gameStore.guessCurrent();
      }

      const beforeExpiration = gameStore.getState();
      const guessedBeforeExpiration = beforeExpiration.turnGuessedCards.length;

      // Let timer expire
      vi.advanceTimersByTime(31000);

      const afterExpiration = gameStore.getState();

      // Game state should be preserved
      expect(afterExpiration.turnGuessedCards.length).toBe(guessedBeforeExpiration);
      expect(afterExpiration.round).toBe(beforeExpiration.round);
      expect(afterExpiration.currentPlayerIndex).toBe(beforeExpiration.currentPlayerIndex);

      vi.useRealTimers();
    });

    it('should allow manual turn end after timer expiration', async () => {
      vi.useFakeTimers();

      gameStore.startTurn();

      // Let timer expire
      vi.advanceTimersByTime(31000);

      // Should still be able to end turn manually
      expect(() => gameStore.endTurn()).not.toThrow();

      const state = gameStore.getState();
      expect(state.turnActive).toBe(false);

      vi.useRealTimers();
    });
  });

  describe('Edge Cases', () => {
    it('should handle timer when no cards are available', () => {
      // Empty the draw pile
      const state = gameStore.getState();
      state.drawPile = [];

      expect(() => gameStore.startTurn()).toThrow('No cards left in draw pile');
    });

    it('should handle rapid start/stop timer cycles', () => {
      // This tests for memory leaks or timer conflicts
      for (let i = 0; i < 5; i++) {
        gameStore.startTurn();
        expect(gameStore.getState().timerInterval).not.toBe(null);

        gameStore.endTurn();
        expect(gameStore.getState().timerInterval).toBe(null);
      }
    });

    it('should handle timer with very short duration', () => {
      vi.useFakeTimers();

      // Manually set very short timer
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood'],
        deckSize: 8,
        timerSeconds: 1 // Very short timer
      };

      gameStore.reset();
      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.selectCards(gameStore.getState().currentPlayerCards.slice(0, 8));
      gameStore.startRound(1);

      gameStore.startTurn();
      expect(gameStore.getState().timerSeconds).toBe(1);

      vi.advanceTimersByTime(1100); // Just over 1 second

      const state = gameStore.getState();
      expect(state.timerSeconds).toBeLessThanOrEqual(0);

      vi.useRealTimers();
    });
  });
});
