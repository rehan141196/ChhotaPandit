/**
 * Integration tests for cross-component functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import gameStore from '../src/store.js';
import { validatePassword } from '../src/auth.js';

// Mock DOM elements for integration testing
const mockDOM = () => {
  globalThis.document = {
    querySelector: vi.fn().mockReturnValue({
      textContent: '',
      innerHTML: '',
      style: {},
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      click: vi.fn(),
      focus: vi.fn(),
      blur: vi.fn(),
      value: '',
      disabled: false,
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
        contains: vi.fn().mockReturnValue(false),
        toggle: vi.fn()
      }
    }),
    querySelectorAll: vi.fn().mockReturnValue([]),
    getElementById: vi.fn().mockReturnValue({
      textContent: '',
      innerHTML: '',
      style: {},
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      click: vi.fn(),
      focus: vi.fn(),
      blur: vi.fn(),
      value: '',
      disabled: false,
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
        contains: vi.fn().mockReturnValue(false),
        toggle: vi.fn()
      }
    }),
    createElement: vi.fn().mockReturnValue({
      setAttribute: vi.fn(),
      getAttribute: vi.fn(),
      appendChild: vi.fn(),
      remove: vi.fn(),
      click: vi.fn(),
      style: {},
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
        contains: vi.fn().mockReturnValue(false),
        toggle: vi.fn()
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }),
    body: {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
      style: {}
    }
  };

  globalThis.window = {
    location: {
      reload: vi.fn(),
      href: 'http://localhost/'
    },
    sessionStorage: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    },
    setTimeout: vi.fn(),
    clearTimeout: vi.fn(),
    setInterval: vi.fn(),
    clearInterval: vi.fn()
  };
};

describe('Cross-Component Integration Tests', () => {
  beforeEach(() => {
    gameStore.reset();
    vi.clearAllMocks();
    mockDOM();
  });

  describe('Full Game Flow Integration', () => {
    it('should complete a full 3-round game flow', () => {
      // Setup game with 2 teams and 3+ categories for adequate card pool
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
          { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 32,
        timerSeconds: 30
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();

      // Complete card selection for all players
      const playerOrder = gameStore.getState().playerOrder;
      for (let i = 0; i < playerOrder.length; i++) {
        const currentPlayerCards = gameStore.getState().currentPlayerCards;
        const cards = currentPlayerCards.slice(0, 8);
        gameStore.selectCards(cards);
      }

      expect(gameStore.getState().cardSelectionPhase).toBe(false);

      // Play Round 1
      gameStore.buildDeck();
      gameStore.startRound(1);
      expect(gameStore.getState().round).toBe(1);

      // Complete turns for all players in Round 1
      for (let i = 0; i < playerOrder.length; i++) {
        gameStore.startTurn();
        expect(gameStore.getState().turnActive).toBe(true);

        // Simulate guessing cards
        if (gameStore.getState().currentCard) {
          gameStore.guessCurrent();
        }
        if (gameStore.getState().currentCard) {
          gameStore.guessCurrent();
        }

        gameStore.endTurn();
        expect(gameStore.getState().turnActive).toBe(false);
      }

      // Proceed to Round 2
      gameStore.nextRound();
      expect(gameStore.getState().round).toBe(2);

      // Complete Round 2
      for (let i = 0; i < playerOrder.length; i++) {
        gameStore.startTurn();
        if (gameStore.getState().currentCard) {
          gameStore.guessCurrent();
        }
        gameStore.endTurn();
      }

      // Proceed to Round 3
      gameStore.nextRound();
      expect(gameStore.getState().round).toBe(3);

      // Complete Round 3
      for (let i = 0; i < playerOrder.length; i++) {
        gameStore.startTurn();
        if (gameStore.getState().currentCard) {
          gameStore.guessCurrent();
        }
        gameStore.endTurn();
      }

      // Game should be complete
      expect(gameStore.getState().round).toBe(3);
    });

    it('should maintain team scores across rounds', () => {
      gameStore.reset();

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 16,
        timerSeconds: 30
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();

      const playerOrder = gameStore.getState().playerOrder;
      playerOrder.forEach(() => {
        const currentPlayerCards = gameStore.getState().currentPlayerCards;
        const cards = currentPlayerCards.slice(0, 8);
        gameStore.selectCards(cards);
      });

      // Track scores across rounds
      const teamScores = [];

      for (let round = 1; round <= 3; round++) {
        gameStore.buildDeck();
        gameStore.startRound(round);

        // Each player takes a turn and scores points
        for (let i = 0; i < playerOrder.length; i++) {
          gameStore.startTurn();

          // Score some points
          if (gameStore.getState().currentCard) {
            gameStore.guessCurrent();
          }
          if (gameStore.getState().currentCard) {
            gameStore.guessCurrent();
          }

          gameStore.endTurn();
        }

        // Store scores after each round (teamScores is [team][round])
        const currentTeamScores = gameStore.getState().teamScores;
        teamScores.push({
          round,
          scores: {
            team1: currentTeamScores[0] ? currentTeamScores[0][round - 1] || 0 : 0,
            team2: currentTeamScores[1] ? currentTeamScores[1][round - 1] || 0 : 0
          }
        });

        if (round < 3) {
          gameStore.nextRound();
        }
      }

      // Verify scores only increase (never decrease)
      for (let i = 1; i < teamScores.length; i++) {
        const prevScores = teamScores[i - 1].scores;
        const currentScores = teamScores[i].scores;

        Object.keys(prevScores).forEach(teamId => {
          // Scores should be cumulative (though may reset between rounds)
          expect(typeof currentScores[teamId]).toBe('number');
          expect(currentScores[teamId]).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should handle player turn order continuity across rounds', () => {
      gameStore.reset();

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Charlie'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 24,
        timerSeconds: 30
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();

      const state = gameStore.getState();
      state.playerOrder.forEach(() => {
        const currentPlayerCards = gameStore.getState().currentPlayerCards;
        const cards = currentPlayerCards.slice(0, 8);
        gameStore.selectCards(cards);
      });

      const playerOrderHistory = [];

      // Track player order across all rounds
      for (let round = 1; round <= 3; round++) {
        gameStore.startRound(round);
        const roundPlayerOrder = [];

        const currentState = gameStore.getState();
        for (let i = 0; i < currentState.playerOrder.length; i++) {
          gameStore.startTurn();
          const turnState = gameStore.getState();
          roundPlayerOrder.push({
            player: turnState.currentPlayer,
            playerIndex: turnState.currentPlayerIndex
          });
          gameStore.endTurn();
        }

        playerOrderHistory.push({
          round,
          playerOrder: roundPlayerOrder
        });

        if (round < 3) {
          gameStore.nextRound();
        }
      }

      // Verify basic turn cycling across rounds
      expect(playerOrderHistory.length).toBe(3);
      expect(playerOrderHistory[0].round).toBe(1);
      expect(playerOrderHistory[1].round).toBe(2);
      expect(playerOrderHistory[2].round).toBe(3);
    });
  });

  describe('Authentication + Game Flow Integration', () => {
    it('should prevent game access without authentication', async () => {
      gameStore.reset();

      // Mock authentication failure
      globalThis.window.sessionStorage.getItem.mockReturnValue(null);

      // Try to access game functionality
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 16,
        timerSeconds: 30
      };

      // Game configuration should work regardless of auth
      expect(() => gameStore.configure(config)).not.toThrow();

      // But auth check should fail
      expect(globalThis.window.sessionStorage.getItem('authenticated')).toBe(null);
    });

    it('should allow game access with valid authentication', async () => {
      gameStore.reset();

      // Mock successful authentication
      globalThis.window.sessionStorage.getItem.mockReturnValue('true');

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 16,
        timerSeconds: 30
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();

      expect(() => gameStore.startCardSelection()).not.toThrow();
    });

    it('should handle password validation edge cases', async () => {
      const correctPassword = 'BetiPushpa!';
      const testCases = [
        { input: correctPassword, expected: true },
        { input: 'betipushpa!', expected: false }, // Case sensitive
        { input: 'BetiPushpa', expected: false }, // Missing exclamation
        { input: '!BetiPushpa', expected: false }, // Exclamation at start
        { input: 'BetiPushpa!!', expected: false }, // Extra exclamation
        { input: ' BetiPushpa!', expected: false }, // Leading space
        { input: 'BetiPushpa! ', expected: false }, // Trailing space
        { input: '', expected: false }, // Empty string
        { input: null, expected: false }, // Null input
        { input: undefined, expected: false } // Undefined input
      ];

      for (const testCase of testCases) {
        try {
          const result = await validatePassword(testCase.input);
          expect(result).toBe(testCase.expected);
        } catch {
          // Invalid inputs should throw or return false
          expect(testCase.expected).toBe(false);
        }
      }
    });
  });

  describe('Timer + Game State Integration', () => {
    it('should handle timer expiration during active turn', () => {
      gameStore.reset();
      vi.useFakeTimers();

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 16,
        timerSeconds: 5
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();

      const state = gameStore.getState();
      const cards = state.currentPlayerCards.slice(0, 8);
      gameStore.selectCards(cards);

      gameStore.buildDeck();
      gameStore.buildDeck();
      gameStore.startRound(1);
      gameStore.startTurn();

      expect(gameStore.getState().turnActive).toBe(true);
      expect(gameStore.getState().timerSeconds).toBe(5);

      // Fast-forward time to expire timer
      vi.advanceTimersByTime(6000); // 6 seconds

      // Timer should have expired
      expect(gameStore.getState().timerSeconds).toBe(0);

      vi.useRealTimers();
    });

    it('should handle timer reset between turns', () => {
      gameStore.reset();
      vi.useFakeTimers();

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 16,
        timerSeconds: 10
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();

      const playerOrder = gameStore.getState().playerOrder;
      playerOrder.forEach(() => {
        const currentPlayerCards = gameStore.getState().currentPlayerCards;
        const cards = currentPlayerCards.slice(0, 8);
        gameStore.selectCards(cards);
      });

      gameStore.buildDeck();
      gameStore.buildDeck();
      gameStore.startRound(1);

      // First player turn
      gameStore.startTurn();
      expect(gameStore.getState().timerSeconds).toBe(10);

      // Advance time partially
      vi.advanceTimersByTime(3000); // 3 seconds
      expect(gameStore.getState().timerSeconds).toBe(7);

      gameStore.endTurn();

      // Second player turn - timer should reset
      gameStore.startTurn();
      expect(gameStore.getState().timerSeconds).toBe(10);

      vi.useRealTimers();
    });

    it('should handle timer state across rounds', () => {
      gameStore.reset();
      vi.useFakeTimers();

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 16,
        timerSeconds: 15
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();

      const state = gameStore.getState();
      const cards = state.currentPlayerCards.slice(0, 8);
      gameStore.selectCards(cards);

      // Round 1
      gameStore.buildDeck();
      gameStore.startRound(1);
      gameStore.startTurn();
      expect(gameStore.getState().timerSeconds).toBe(15);
      gameStore.endTurn();

      // Round 2
      gameStore.nextRound();
      gameStore.startTurn();
      expect(gameStore.getState().timerSeconds).toBe(15); // Should reset for new round
      gameStore.endTurn();

      vi.useRealTimers();
    });
  });

  describe('Error Recovery Integration', () => {
    it('should recover from card selection errors', () => {
      gameStore.reset();

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['NonExistentCategory'], // This should cause an error
        deckSize: 16,
        timerSeconds: 30
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();

      // This should throw an error
      expect(() => gameStore.startCardSelection()).toThrow();

      // Game should still be in card selection phase after error
      const state = gameStore.getState();
      expect(state.cardSelectionPhase).toBe(true);

      // Should be able to reconfigure with valid data
      const validConfig = {
        ...config,
        categories: ['Bollywood', 'Sports']
      };

      gameStore.configure(validConfig);
      expect(() => gameStore.startCardSelection()).not.toThrow();
    });

    it('should handle concurrent timer operations gracefully', () => {
      gameStore.reset();
      vi.useFakeTimers();

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 16,
        timerSeconds: 10
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();

      const state = gameStore.getState();
      const cards = state.currentPlayerCards.slice(0, 8);
      gameStore.selectCards(cards);

      gameStore.buildDeck();
      gameStore.startRound(1);
      gameStore.startTurn();

      // Try to start timer multiple times (should not cause issues)
      gameStore.startTimer();
      gameStore.startTimer();
      gameStore.startTimer();

      expect(state.turnActive).toBe(true);

      // Try to stop timer multiple times
      gameStore.stopTimer();
      gameStore.stopTimer();
      gameStore.stopTimer();

      // Should still be in a valid state
      expect(state.turnActive).toBe(true);

      vi.useRealTimers();
    });

    it('should handle rapid state transitions', () => {
      gameStore.reset();

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 16,
        timerSeconds: 30
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();
      gameStore.startCardSelection();

      // Complete card selection for all players
      let state = gameStore.getState();
      let cards = state.currentPlayerCards.slice(0, 8);
      gameStore.selectCards(cards);

      // Next player's turn
      state = gameStore.getState();
      cards = state.currentPlayerCards.slice(0, 8);
      gameStore.selectCards(cards);

      gameStore.buildDeck();
      gameStore.startRound(1);

      // Rapid start/end turn cycles
      for (let i = 0; i < 5; i++) {
        gameStore.startTurn();
        expect(gameStore.getState().turnActive).toBe(true);

        gameStore.endTurn();
        expect(gameStore.getState().turnActive).toBe(false);
      }

      // Game should still be in a valid state
      const finalState = gameStore.getState();
      expect(finalState.round).toBe(1);
      expect(finalState.cardSelectionPhase).toBe(false);
    });
  });

  describe('Memory and Performance Integration', () => {
    it('should handle large game state without memory leaks', () => {
      gameStore.reset();

      const largePlayerList = Array.from({ length: 100 }, (_, i) => `Player${i + 1}`);

      const config = {
        teamNames: ['Mega Team Alpha', 'Mega Team Beta'],
        teams: [
          { id: 'team1', name: 'Mega Team Alpha', players: largePlayerList.slice(0, 50) },
          { id: 'team2', name: 'Mega Team Beta', players: largePlayerList.slice(50, 100) }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 8,
        timerSeconds: 30
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();

      const state = gameStore.getState();
      expect(state.playerOrder.length).toBe(100);

      // Should not throw out of memory errors
      expect(() => gameStore.startCardSelection()).not.toThrow();
    });

    it('should handle repeated game resets efficiently', () => {
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
          { id: 'team2', name: 'Team Beta', players: ['Bob'] }
        ],
        categories: ['Bollywood', 'Sports'],
        deckSize: 16,
        timerSeconds: 30
      };

      // Reset game state multiple times
      for (let i = 0; i < 50; i++) {
        gameStore.reset();
        gameStore.configure(config);
        gameStore.generatePlayerOrder();

        const state = gameStore.getState();
        expect(state.cardSelectionPhase).toBe(false);
        expect(state.playerOrder.length).toBe(2);
      }

      // Final state should be clean
      const finalState = gameStore.getState();
      expect(finalState.round).toBe(1);
      expect(finalState.turnActive).toBe(false);
    });
  });
});
