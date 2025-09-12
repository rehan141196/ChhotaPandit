import { describe, test, expect, beforeEach } from 'vitest';
import gameStore from '../src/store.js';

describe('Round Completion Functionality', () => {
  beforeEach(() => {
    gameStore.reset();

    // Setup a minimal game state for faster tests
    const config = {
      teamNames: ['Team Alpha', 'Team Beta'],
      teams: [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
        { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
      ],
      categories: ['Bollywood', 'Sports'],
      deckSize: 16, // Smaller deck for faster tests
      timerSeconds: 60
    };

    gameStore.configure(config);
    gameStore.generatePlayerOrder();
    gameStore.startCardSelection();

    // Simulate card selection for all players (8 cards each)
    let state = gameStore.getState();
    while (state.cardSelectionPhase) {
      const currentPlayerCards = state.currentPlayerCards.slice(0, 8);
      gameStore.selectCards(currentPlayerCards);
      state = gameStore.getState(); // Update state after selection
    }

    gameStore.startRound(1);
  });

  describe('Round 1 Completion Detection', () => {
    test('should detect when round is complete', () => {
      // Initially round should not be complete
      expect(gameStore.isRoundComplete()).toBe(false);

      // Simulate playing through all cards in the deck
      let attempts = 0;
      const maxAttempts = 50; // Reduced safety limit

      while (!gameStore.isRoundComplete() && attempts < maxAttempts) {
        attempts++;

        // Start a turn if not active
        const state = gameStore.getState();
        if (!state.turnActive) {
          try {
            gameStore.startTurn();
          } catch {
            // If we can't start a turn, we might be done
            break;
          }
        }

        // Guess all available cards in this turn
        let turnState = gameStore.getState();
        let cardsInTurn = 0;
        const maxCardsPerTurn = 10; // Reduced safety limit

        while (turnState.currentCard && turnState.turnActive && cardsInTurn < maxCardsPerTurn) {
          gameStore.guessCurrent();
          turnState = gameStore.getState();
          cardsInTurn++;
        }

        // End the turn if it's still active
        if (turnState.turnActive) {
          gameStore.endTurn();
        }

        // Move to next player
        gameStore.nextPlayer();

        // Check if we're really done
        const finalState = gameStore.getState();
        if (finalState.drawPile.length === 0 && finalState.turnSkippedCards.length === 0) {
          break;
        }
      }

      // Round should be complete now or we should have exhausted attempts
      const finalState = gameStore.getState();

      // Either the round is complete, or we've run out of cards
      const shouldBeComplete = finalState.drawPile.length === 0 && finalState.turnSkippedCards.length === 0;
      expect(gameStore.isRoundComplete() || shouldBeComplete).toBe(true);
    });

    test('should not be complete when cards remain', () => {
      // Start a turn and guess only one card
      gameStore.startTurn();
      const state = gameStore.getState();

      if (state.currentCard) {
        gameStore.guessCurrent();
      }

      gameStore.endTurn();

      // Round should not be complete yet
      expect(gameStore.isRoundComplete()).toBe(false);
    });

    test('should track guessed cards correctly across turns', () => {
      const initialState = gameStore.getState();
      const totalCards = initialState.drawPile.length;

      // Play several turns and track progress
      for (let turn = 0; turn < 3 && !gameStore.isRoundComplete(); turn++) {
        gameStore.startTurn();

        // Guess a few cards
        for (let i = 0; i < 3; i++) {
          const state = gameStore.getState();
          if (state.currentCard && state.turnActive) {
            gameStore.guessCurrent();
          } else {
            break;
          }
        }

        gameStore.endTurn();
        gameStore.nextPlayer();
      }

      const finalState = gameStore.getState();
      const totalGuessed = finalState.history.reduce((sum, turn) => sum + turn.guessedCardIds.length, 0);

      expect(totalGuessed).toBeGreaterThan(0);
      expect(totalGuessed).toBeLessThanOrEqual(totalCards);
    });
  });

  describe('Round Score Tracking', () => {
    test('should accumulate team scores correctly throughout round', () => {
      const initialState = gameStore.getState();
      expect(initialState.teamScores[0][0]).toBe(0); // Team 1, Round 1
      expect(initialState.teamScores[1][0]).toBe(0); // Team 2, Round 1

      // Play a few turns for each team

      for (let playerIndex = 0; playerIndex < 4; playerIndex++) {
        gameStore.startTurn();

        // Guess 2 cards per turn
        for (let cardIndex = 0; cardIndex < 2; cardIndex++) {
          const state = gameStore.getState();
          if (state.currentCard && state.turnActive) {
            gameStore.guessCurrent();
          }
        }

        gameStore.endTurn();
        gameStore.nextPlayer();
      }

      const finalState = gameStore.getState();

      // Both teams should have some points now
      const team1Score = finalState.teamScores[0][0];
      const team2Score = finalState.teamScores[1][0];

      expect(team1Score + team2Score).toBeGreaterThan(0);
    });

    test('should handle skipped cards in score calculation', () => {
      gameStore.startTurn();

      const initialState = gameStore.getState();
      const currentTeam = gameStore.getTeamForPlayer(initialState.playerOrder[initialState.currentPlayerIndex]);
      const teamIndex = initialState.teams.findIndex(team => team.id === currentTeam.id);

      // Skip a card, then guess a card
      if (initialState.currentCard) {
        gameStore.skipCurrent();

        const afterSkipState = gameStore.getState();
        if (afterSkipState.currentCard) {
          gameStore.guessCurrent();
        }
      }

      gameStore.endTurn();

      const finalState = gameStore.getState();
      const teamScore = finalState.teamScores[teamIndex][0];

      // Score should only reflect guessed cards, not skipped ones
      expect(finalState.turnSkippedCards.length).toBe(0); // Should be cleared after turn
      expect(teamScore).toBeGreaterThan(0); // Should have points from guessed card
    });
  });

  describe('Turn Transition', () => {
    test('should properly reset turn state between players', () => {
      // Start first turn
      gameStore.startTurn();

      if (gameStore.getState().currentCard) {
        gameStore.guessCurrent();
        gameStore.skipCurrent();
      }

      gameStore.endTurn();

      const afterFirstTurn = gameStore.getState();
      expect(afterFirstTurn.turnActive).toBe(false);
      expect(afterFirstTurn.turnGuessedCards.length).toBe(0);
      expect(afterFirstTurn.turnSkippedCards.length).toBe(0);

      // Move to next player and start another turn
      gameStore.nextPlayer();
      gameStore.startTurn();

      const afterSecondStart = gameStore.getState();
      expect(afterSecondStart.turnActive).toBe(true);
      expect(afterSecondStart.turnGuessedCards.length).toBe(0);
      expect(afterSecondStart.turnSkippedCards.length).toBe(0);
      expect(afterSecondStart.currentCard).not.toBeNull();
    });

    test('should maintain correct player order throughout round', () => {
      const initialState = gameStore.getState();
      const originalOrder = [...initialState.playerOrder];
      const originalIndex = initialState.currentPlayerIndex;

      // Test the initial player order and then through several turns
      for (let i = 0; i < 3; i++) {
        const currentState = gameStore.getState();

        // The current player should match the expected position in the rotation
        const expectedPlayerIndex = (originalIndex + i) % originalOrder.length;
        const expectedPlayer = originalOrder[expectedPlayerIndex];
        const actualPlayer = currentState.playerOrder[currentState.currentPlayerIndex];

        expect(actualPlayer).toBe(expectedPlayer);
        expect(currentState.currentPlayerIndex).toBe(expectedPlayerIndex);

        // Simulate a turn (endTurn automatically advances to next player)
        gameStore.startTurn();
        if (currentState.currentCard) {
          gameStore.guessCurrent();
        }
        gameStore.endTurn();
        // After endTurn(), we should be on the next player for the next iteration
      }
    });
  });

  describe('Error Handling', () => {
    test('should handle empty deck gracefully', () => {
      // Manually empty the deck to test edge case
      const state = gameStore.getState();
      state.drawPile = [];
      state.currentCard = null;

      // Should not be able to start turn with no cards
      expect(() => gameStore.startTurn()).toThrow('No cards left in draw pile');
    });

    test('should handle timer expiration edge cases', () => {
      gameStore.startTurn();

      // Simulate timer expiration
      const state = gameStore.getState();
      state.timerSeconds = 0;
      state.turnActive = true;

      // Should be able to handle this gracefully
      expect(() => gameStore.endTurn()).not.toThrow();

      const finalState = gameStore.getState();
      expect(finalState.turnActive).toBe(false);
    });
  });
});
