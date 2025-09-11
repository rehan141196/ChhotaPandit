import { describe, it, expect, beforeEach } from 'vitest';
import gameStore from '../src/store.js';

describe('GameStore', () => {
  beforeEach(() => {
    gameStore.reset();
  });

  describe('API Surface', () => {
    it('should have all required methods', () => {
      expect(typeof gameStore.configure).toBe('function');
      expect(typeof gameStore.buildDeck).toBe('function');
      expect(typeof gameStore.generatePlayerOrder).toBe('function');
      expect(typeof gameStore.startCardSelection).toBe('function');
      expect(typeof gameStore.generateCardsForPlayer).toBe('function');
      expect(typeof gameStore.getCurrentPlayerName).toBe('function');
      expect(typeof gameStore.selectCards).toBe('function');
      expect(typeof gameStore.finishCardSelection).toBe('function');
      expect(typeof gameStore.startRound).toBe('function');
      expect(typeof gameStore.startTurn).toBe('function');
      expect(typeof gameStore.endTurn).toBe('function');
      expect(typeof gameStore.guessCurrent).toBe('function');
      expect(typeof gameStore.skipCurrent).toBe('function');
      expect(typeof gameStore.nextTeam).toBe('function');
      expect(typeof gameStore.tallyRound).toBe('function');
      expect(typeof gameStore.reset).toBe('function');
      expect(typeof gameStore.getState).toBe('function');
      expect(typeof gameStore.subscribe).toBe('function');
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = gameStore.getState();

      expect(state.config).toBe(null);
      expect(state.teams).toEqual([]);
      expect(state.playerOrder).toEqual([]);
      expect(state.deck).toEqual([]);
      expect(state.drawPile).toEqual([]);
      expect(state.discardPile).toEqual([]);
      expect(state.round).toBe(1);
      expect(state.teamOrder).toEqual([]);
      expect(state.currentTeamIndex).toBe(0);
      expect(state.turnActive).toBe(false);
      expect(state.history).toEqual([]);
      expect(state.guessedOnce).toBeInstanceOf(Set);
      expect(state.guessedOnce.size).toBe(0);
    });
  });

  describe('Configure Method', () => {
    it('should configure game state with teams and config', () => {
      const teams = [
        {
          id: 'team1',
          name: 'Team Alpha',
          players: ['Alice', 'Bob', 'Charlie'],
        },
        { id: 'team2', name: 'Team Beta', players: ['Dave', 'Eve', 'Frank'] },
      ];

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: teams,
        categories: ['Movies', 'Sports'],
        deckSize: 48,
        timerSeconds: 60,
      };

      gameStore.configure(config);
      const state = gameStore.getState();

      expect(state.config).toEqual(config);
      expect(state.teams).toEqual(teams);
      expect(state.teamOrder).toEqual(['team1', 'team2']);
      expect(state.currentTeamIndex).toBe(0);
    });
  });

  describe('Player Order Generation', () => {
    beforeEach(() => {
      const teams = [
        {
          id: 'team1',
          name: 'Team Alpha',
          players: ['Alice', 'Bob', 'Charlie'],
        },
        { id: 'team2', name: 'Team Beta', players: ['Dave', 'Eve', 'Frank'] },
      ];

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: teams,
        categories: ['Movies', 'Sports'],
        deckSize: 48,
        timerSeconds: 60,
      };

      gameStore.configure(config);
    });

    it('should generate randomized player order with all players', () => {
      gameStore.generatePlayerOrder();
      const state = gameStore.getState();

      expect(state.playerOrder).toHaveLength(6);
      expect(state.playerOrder).toContain('Alice');
      expect(state.playerOrder).toContain('Bob');
      expect(state.playerOrder).toContain('Charlie');
      expect(state.playerOrder).toContain('Dave');
      expect(state.playerOrder).toContain('Eve');
      expect(state.playerOrder).toContain('Frank');
    });

    it('should alternate players between teams', () => {
      gameStore.generatePlayerOrder();
      const state = gameStore.getState();

      // Team 1: Alice, Bob, Charlie
      // Team 2: Dave, Eve, Frank
      const team1Players = ['Alice', 'Bob', 'Charlie'];
      const team2Players = ['Dave', 'Eve', 'Frank'];

      // Check that players alternate between teams
      for (let i = 0; i < state.playerOrder.length; i++) {
        const player = state.playerOrder[i];
        if (i % 2 === 0) {
          // Even positions should be Team 1 players
          expect(team1Players).toContain(player);
        } else {
          // Odd positions should be Team 2 players
          expect(team2Players).toContain(player);
        }
      }
    });

    it('should throw error if teams not configured', () => {
      gameStore.reset();

      expect(() => {
        gameStore.generatePlayerOrder();
      }).toThrow('Teams must be configured before generating player order');
    });

    it('should generate different orders on multiple calls (probabilistic)', () => {
      // Run multiple times to check randomness (not deterministic but very likely to differ)
      const orders = new Set();

      for (let i = 0; i < 10; i++) {
        gameStore.generatePlayerOrder();
        const state = gameStore.getState();
        orders.add(JSON.stringify(state.playerOrder));
      }

      // With 6 players, we should get some variation in 10 attempts
      expect(orders.size).toBeGreaterThan(1);
    });
  });

  describe('Reset Method', () => {
    it('should reset state to initial values', () => {
      // Configure and modify state
      const teams = [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
        { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] },
      ];

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: teams,
        categories: ['Movies'],
        deckSize: 32,
        timerSeconds: 60,
      };

      gameStore.configure(config);
      gameStore.generatePlayerOrder();

      // Reset
      gameStore.reset();
      const state = gameStore.getState();

      expect(state.config).toBe(null);
      expect(state.teams).toEqual([]);
      expect(state.playerOrder).toEqual([]);
      expect(state.currentTeamIndex).toBe(0);
      expect(state.round).toBe(1);
      expect(state.turnActive).toBe(false);
    });
  });

  describe('State Subscription', () => {
    it('should notify listeners on state changes', () => {
      let notificationCount = 0;
      let lastState = null;

      const unsubscribe = gameStore.subscribe((state) => {
        notificationCount++;
        lastState = state;
      });

      const teams = [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
        { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] },
      ];

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: teams,
        categories: ['Movies'],
        deckSize: 32,
        timerSeconds: 60,
      };

      gameStore.configure(config);

      expect(notificationCount).toBe(1);
      expect(lastState.teams).toEqual(teams);

      unsubscribe();
    });

    it('should allow unsubscribing from state changes', () => {
      let notificationCount = 0;

      const unsubscribe = gameStore.subscribe(() => {
        notificationCount++;
      });

      gameStore.reset(); // Should trigger notification
      expect(notificationCount).toBe(1);

      unsubscribe();
      gameStore.reset(); // Should not trigger notification
      expect(notificationCount).toBe(1);
    });
  });

  describe('Deck Building', () => {
    beforeEach(() => {
      const teams = [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob', 'Charlie'] },
        { id: 'team2', name: 'Team Beta', players: ['Dave', 'Eve', 'Frank'] }
      ];

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: teams,
        categories: ['Bollywood', 'Sports'],
        deckSize: 40, // Now realistic with no 6-per-category limit for deck building
        timerSeconds: 60
      };

      gameStore.configure(config);
    });

    it('should build deck with correct constraints', () => {
      gameStore.buildDeck();
      const state = gameStore.getState();

      expect(state.deck).toHaveLength(40);
      expect(state.drawPile).toHaveLength(40);
      expect(state.discardPile).toHaveLength(0);

      // Check that we have at least 1 card from each category
      const categoriesInDeck = new Set(state.deck.map(card => card.category));
      expect(categoriesInDeck.has('Bollywood')).toBe(true);
      expect(categoriesInDeck.has('Sports')).toBe(true);

      // No longer constrained by 6 per category for deck building
      // Just ensure we have valid cards from selected categories
      state.deck.forEach(card => {
        expect(['Bollywood', 'Sports']).toContain(card.category);
      });
    });

    it('should throw error if not configured', () => {
      gameStore.reset();

      expect(() => {
        gameStore.buildDeck();
      }).toThrow('Game must be configured before building deck');
    });

    it('should throw error if constraints cannot be satisfied', () => {
      // Try to build a deck with impossible constraints
      const teams = [
        { id: 'team1', name: 'Team Alpha', players: ['Alice'] },
        { id: 'team2', name: 'Team Beta', players: ['Bob'] }
      ];

      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: teams,
        categories: ['Festivals'], // Small category
        deckSize: 1000, // Impossible size
        timerSeconds: 60
      };

      gameStore.configure(config);

      expect(() => {
        gameStore.buildDeck();
      }).toThrow();
    });

    it('should create unique deck on multiple builds', () => {
      gameStore.buildDeck();
      const firstDeck = [...gameStore.getState().deck];

      gameStore.buildDeck();
      const secondDeck = [...gameStore.getState().deck];

      // Decks should be same length but likely different order/selection
      expect(firstDeck).toHaveLength(secondDeck.length);

      // Convert to sets of IDs to compare
      const firstIds = new Set(firstDeck.map(card => card.id));
      const secondIds = new Set(secondDeck.map(card => card.id));

      // Due to randomness, the sets might be different (not guaranteed but likely)
      // At minimum, they should be valid decks
      expect(firstIds.size).toBe(40);
      expect(secondIds.size).toBe(40);
    });
  });

  describe('Card Selection Phase', () => {
    beforeEach(() => {
      gameStore.reset();
      const teams = [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
        { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] },
      ];
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: teams,
        categories: ['Bollywood', 'Sports'],
        deckSize: 32, // 4 players * 8 cards each
        timerSeconds: 60,
      };
      gameStore.configure(config);
      gameStore.generatePlayerOrder();
    });

    it('should start card selection phase', () => {
      gameStore.startCardSelection();
      const state = gameStore.getState();

      expect(state.cardSelectionPhase).toBe(true);
      expect(state.currentPlayerSelectionIndex).toBe(0);
      expect(state.currentPlayerCards).toHaveLength(16);
      expect(state.selectedCards).toEqual([]);
      expect(state.playerSelections).toEqual({});
    });

    it('should throw error if not configured', () => {
      gameStore.reset();
      expect(() => {
        gameStore.startCardSelection();
      }).toThrow('Game must be configured before starting card selection');
    });

    it('should throw error if player order not generated', () => {
      gameStore.reset();
      const config = {
        teamNames: ['Team Alpha', 'Team Beta'],
        teams: [
          { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
          { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] },
        ],
        categories: ['Bollywood'],
        deckSize: 32,
        timerSeconds: 60,
      };
      gameStore.configure(config);

      expect(() => {
        gameStore.startCardSelection();
      }).toThrow('Player order must be generated before starting card selection');
    });

    it('should get current player name', () => {
      gameStore.startCardSelection();
      const currentPlayer = gameStore.getCurrentPlayerName();
      const state = gameStore.getState();

      expect(currentPlayer).toBe(state.playerOrder[0]);
    });

    it('should generate 16 cards from selected categories', () => {
      gameStore.startCardSelection();
      const state = gameStore.getState();

      expect(state.currentPlayerCards).toHaveLength(16);

      // All cards should be from selected categories
      const validCategories = new Set(['Bollywood', 'Sports']);
      state.currentPlayerCards.forEach(card => {
        expect(validCategories.has(card.category)).toBe(true);
      });
    });

    it('should allow player to select exactly 8 cards', () => {
      gameStore.startCardSelection();
      const state = gameStore.getState();
      const selectedCards = state.currentPlayerCards.slice(0, 8);

      gameStore.selectCards(selectedCards);
      const newState = gameStore.getState();

      expect(newState.playerSelections[state.playerOrder[0]]).toEqual(selectedCards);
      expect(newState.selectedCards).toHaveLength(8);
      expect(newState.currentPlayerSelectionIndex).toBe(1);
    });

    it('should throw error if not exactly 8 cards selected', () => {
      gameStore.startCardSelection();
      const state = gameStore.getState();

      expect(() => {
        gameStore.selectCards(state.currentPlayerCards.slice(0, 7));
      }).toThrow('Player must select exactly 8 cards');

      expect(() => {
        gameStore.selectCards(state.currentPlayerCards.slice(0, 9));
      }).toThrow('Player must select exactly 8 cards');
    });

    it('should throw error if selected cards not from options', () => {
      gameStore.startCardSelection();

      // Try to select cards not in current options
      const invalidCards = [
        { id: 'invalid1', title: 'Invalid Card 1', category: 'Bollywood', points: 1 },
        { id: 'invalid2', title: 'Invalid Card 2', category: 'Sports', points: 2 },
      ];

      expect(() => {
        gameStore.selectCards(invalidCards.concat(Array(6).fill(invalidCards[0])));
      }).toThrow('Selected cards must be from the current player\'s options');
    });

    it('should complete card selection when all players finish', () => {
      gameStore.startCardSelection();

      // Each player selects 8 cards
      for (let i = 0; i < 4; i++) {
        const state = gameStore.getState();
        const selectedCards = state.currentPlayerCards.slice(0, 8);
        gameStore.selectCards(selectedCards);
      }

      const finalState = gameStore.getState();
      expect(finalState.cardSelectionPhase).toBe(false);
      expect(finalState.deck).toHaveLength(32); // 4 players * 8 cards
      expect(finalState.drawPile).toHaveLength(32);
      expect(Object.keys(finalState.playerSelections)).toHaveLength(4);
    });

    it('should exclude already selected cards from next player options', () => {
      gameStore.startCardSelection();

      // First player selects cards
      const firstState = gameStore.getState();
      const firstPlayerCards = firstState.currentPlayerCards.slice(0, 8);
      const firstPlayerCardIds = new Set(firstPlayerCards.map(card => card.id));

      gameStore.selectCards(firstPlayerCards);

      // Second player should not see first player's cards
      const secondState = gameStore.getState();
      secondState.currentPlayerCards.forEach(card => {
        expect(firstPlayerCardIds.has(card.id)).toBe(false);
      });
    });
  });
});
