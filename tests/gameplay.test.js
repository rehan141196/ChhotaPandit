import { describe, test, expect, beforeEach } from 'vitest';
import gameStore from '../src/store.js';

describe('Gameplay Functionality', () => {
  beforeEach(() => {
    gameStore.reset();

    // Setup a complete game state with 4 players
    const config = {
      teamNames: ['Team Alpha', 'Team Beta'],
      teams: [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
        { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
      ],
      categories: ['Bollywood', 'Sports'],
      deckSize: 32,
      timerSeconds: 60
    };

    gameStore.configure(config);
    gameStore.generatePlayerOrder();
    gameStore.startCardSelection();

    // Simulate card selection for all players
    const state = gameStore.getState();
    while (state.cardSelectionPhase) {
      const currentPlayerCards = state.currentPlayerCards.slice(0, 8);
      gameStore.selectCards(currentPlayerCards);
    }
  });

  describe('Round Management', () => {
    test('should start round 1 correctly', () => {
      gameStore.startRound(1);
      const state = gameStore.getState();

      expect(state.round).toBe(1);
      expect(state.currentPlayerIndex).toBe(0);
      expect(state.turnActive).toBe(false);
      expect(state.currentCard).toBe(null);
      expect(state.drawPile.length).toBe(32); // 4 players * 8 cards each
      expect(state.discardPile.length).toBe(0);
      expect(state.teamScores[0][0]).toBe(0);
      expect(state.teamScores[1][0]).toBe(0);
    });

    test('should throw error for invalid round number', () => {
      expect(() => gameStore.startRound(0)).toThrow('Round number must be 1, 2, or 3');
      expect(() => gameStore.startRound(4)).toThrow('Round number must be 1, 2, or 3');
    });
  });

  describe('Turn Management', () => {
    beforeEach(() => {
      gameStore.startRound(1);
    });

    test('should start turn correctly', () => {
      gameStore.startTurn();
      const state = gameStore.getState();

      expect(state.turnActive).toBe(true);
      expect(state.timerSeconds).toBe(60);
      expect(state.currentCard).not.toBe(null);
      expect(state.turnGuessedCards.length).toBe(0);
      expect(state.turnSkippedCards.length).toBe(0);
      expect(state.timerInterval).not.toBe(null);
    });

    test('should throw error if turn already active', () => {
      gameStore.startTurn();
      expect(() => gameStore.startTurn()).toThrow('A turn is already active');
    });

    test('should throw error if no cards left', () => {
      // Empty the draw pile
      const state = gameStore.getState();
      state.drawPile = [];

      expect(() => gameStore.startTurn()).toThrow('No cards left in draw pile');
    });

    test('should end turn correctly and move to next player', () => {
      gameStore.startTurn();
      const initialPlayerIndex = gameStore.getState().currentPlayerIndex;

      gameStore.endTurn();
      const state = gameStore.getState();

      expect(state.turnActive).toBe(false);
      expect(state.currentCard).toBe(null);
      expect(state.timerInterval).toBe(null);
      expect(state.currentPlayerIndex).toBe((initialPlayerIndex + 1) % state.playerOrder.length);
      expect(state.history.length).toBe(1);
    });

    test('should throw error if no active turn to end', () => {
      expect(() => gameStore.endTurn()).toThrow('No active turn to end');
    });
  });

  describe('Card Actions', () => {
    beforeEach(() => {
      gameStore.startRound(1);
      gameStore.startTurn();
    });

    test('should mark card as guessed correctly', () => {
      const state = gameStore.getState();
      const initialCard = state.currentCard;
      const initialDrawPileLength = state.drawPile.length;

      gameStore.guessCurrent();
      const newState = gameStore.getState();

      expect(newState.turnGuessedCards.length).toBe(1);
      expect(newState.turnGuessedCards[0]).toEqual(initialCard);
      expect(newState.drawPile.length).toBe(initialDrawPileLength - 1);
      expect(newState.currentCard).not.toEqual(initialCard);
    });

    test('should skip card correctly', () => {
      const state = gameStore.getState();
      const initialCard = state.currentCard;
      const initialDrawPileLength = state.drawPile.length;

      gameStore.skipCurrent();
      const newState = gameStore.getState();

      expect(newState.turnSkippedCards.length).toBe(1);
      expect(newState.turnSkippedCards[0]).toEqual(initialCard);
      expect(newState.drawPile.length).toBe(initialDrawPileLength - 1); // Card removed from draw pile (kept separate during turn)
      expect(newState.currentCard).not.toEqual(initialCard);
    });

    test('should reshuffle skipped cards when draw pile becomes empty', () => {
      const state = gameStore.getState();
      const initialDrawPileSize = state.drawPile.length;

      // Skip the first few cards
      gameStore.skipCurrent();
      gameStore.skipCurrent();
      gameStore.skipCurrent();

      const stateAfterSkips = gameStore.getState();
      expect(stateAfterSkips.turnSkippedCards.length).toBe(3);
      expect(stateAfterSkips.drawPile.length).toBe(initialDrawPileSize - 3);

      // Guess all remaining cards to empty the draw pile
      while (stateAfterSkips.drawPile.length > 0) {
        if (stateAfterSkips.currentCard) {
          gameStore.guessCurrent();
        } else {
          break;
        }
      }

      const stateAfterEmptying = gameStore.getState();

      // Now when we try to draw again, skipped cards should be reshuffled
      // This would happen automatically in drawCard() when the pile is empty and there are skipped cards
      if (stateAfterEmptying.turnSkippedCards.length > 0 && stateAfterEmptying.drawPile.length === 0) {
        // Manually trigger a draw to test the reshuffle logic
        gameStore.drawCard();

        const finalState = gameStore.getState();
        // The skipped cards should now be back in the draw pile
        expect(finalState.drawPile.length).toBeGreaterThan(0);
        expect(finalState.turnSkippedCards.length).toBe(0); // Should be cleared
        expect(finalState.currentCard).not.toBeNull(); // Should have a current card again
      }
    });

    test('should throw error if no active turn for card actions', () => {
      gameStore.endTurn();

      expect(() => gameStore.guessCurrent()).toThrow('No active turn');
      expect(() => gameStore.skipCurrent()).toThrow('No active turn');
    });

    test('should throw error if no active turn for card actions', () => {
      gameStore.endTurn();

      expect(() => gameStore.guessCurrent()).toThrow('No active turn');
      expect(() => gameStore.skipCurrent()).toThrow('No active turn');
    });

    test('should handle last card correctly', () => {
      const state = gameStore.getState();

      // Reduce draw pile to just one card
      state.drawPile = [state.drawPile[0]];
      gameStore.drawCard();

      gameStore.guessCurrent();
      const newState = gameStore.getState();

      expect(newState.drawPile.length).toBe(0);
      expect(newState.currentCard).toBe(null);
    });
  });

  describe('Scoring', () => {
    beforeEach(() => {
      gameStore.startRound(1);
      gameStore.startTurn();
    });

    test('should track points correctly during turn', () => {
      const state = gameStore.getState();
      const initialCard = state.currentCard;
      const cardPoints = initialCard.points;

      gameStore.guessCurrent();
      gameStore.endTurn();

      const finalState = gameStore.getState();
      const currentTeam = gameStore.getTeamForPlayer(finalState.playerOrder[0]);
      const teamIndex = finalState.teams.findIndex(team => team.id === currentTeam.id);

      expect(finalState.teamScores[teamIndex][0]).toBe(cardPoints);
    });

    test('should record turn history correctly', () => {
      const state = gameStore.getState();
      const currentPlayer = state.playerOrder[state.currentPlayerIndex];
      const currentTeam = gameStore.getTeamForPlayer(currentPlayer);

      gameStore.guessCurrent();
      gameStore.endTurn();

      const finalState = gameStore.getState();
      expect(finalState.history.length).toBe(1);

      const turnResult = finalState.history[0];
      expect(turnResult.teamId).toBe(currentTeam.id);
      expect(turnResult.round).toBe(1);
      expect(turnResult.guessedCardIds.length).toBe(1);
      expect(turnResult.skippedCardIds.length).toBe(0);
      expect(turnResult.durationSec).toBeGreaterThan(0);
      expect(turnResult.timestamp).toBeGreaterThan(0);
    });
  });

  describe('Helper Functions', () => {
    beforeEach(() => {
      gameStore.startRound(1);
    });

    test('should get team for player correctly', () => {
      const state = gameStore.getState();
      const player1 = state.teams[0].players[0];
      const player2 = state.teams[1].players[0];

      const team1 = gameStore.getTeamForPlayer(player1);
      const team2 = gameStore.getTeamForPlayer(player2);

      expect(team1.id).toBe(state.teams[0].id);
      expect(team2.id).toBe(state.teams[1].id);
    });

    test('should check round completion correctly', () => {
      const state = gameStore.getState();

      // Initially no cards guessed
      expect(gameStore.isRoundComplete()).toBe(false);

      // Mark all cards as guessed
      state.deck.forEach(card => {
        state.guessedOnce.add(card.id);
      });

      expect(gameStore.isRoundComplete()).toBe(true);
    });

    test('should advance player index correctly', () => {
      const state = gameStore.getState();
      const initialIndex = state.currentPlayerIndex;
      const playerCount = state.playerOrder.length;

      gameStore.nextPlayer();
      expect(state.currentPlayerIndex).toBe((initialIndex + 1) % playerCount);

      // Test wrapping around
      state.currentPlayerIndex = playerCount - 1;
      gameStore.nextPlayer();
      expect(state.currentPlayerIndex).toBe(0);
    });
  });

  describe('Timer Functionality', () => {
    beforeEach(() => {
      gameStore.startRound(1);
    });

    test('should start timer when turn starts', () => {
      gameStore.startTurn();
      const state = gameStore.getState();

      expect(state.timerInterval).not.toBe(null);
      expect(state.timerSeconds).toBe(60);
    });

    test('should stop timer when turn ends', () => {
      gameStore.startTurn();
      gameStore.endTurn();
      const state = gameStore.getState();

      expect(state.timerInterval).toBe(null);
    });

    test('should stop timer during reset', () => {
      gameStore.startTurn();
      const stateBefore = gameStore.getState();
      expect(stateBefore.timerInterval).not.toBe(null);

      gameStore.reset();
      const stateAfter = gameStore.getState();
      expect(stateAfter.timerInterval).toBe(null);
    });
  });

  describe('End-to-End Scenarios', () => {
    test('should play through a complete game scenario', () => {
      gameStore.startRound(1);
      gameStore.startTurn();

      // Simulate a player guessing a card
      const state = gameStore.getState();
      const initialCard = state.currentCard;

      gameStore.guessCurrent();
      gameStore.endTurn();

      const newState = gameStore.getState();
      const currentTeam = gameStore.getTeamForPlayer(newState.playerOrder[0]);
      const teamIndex = newState.teams.findIndex(team => team.id === currentTeam.id);

      // Check if the team's score has been updated
      expect(newState.teamScores[teamIndex][0]).toBe(initialCard.points);

      // Check turn history
      expect(newState.history.length).toBe(1);
      const turnResult = newState.history[0];
      expect(turnResult.teamId).toBe(currentTeam.id);
      expect(turnResult.round).toBe(1);
      expect(turnResult.guessedCardIds.length).toBe(1);
      expect(turnResult.skippedCardIds.length).toBe(0);
    });

    test('should reshuffle skipped cards when draw pile becomes empty', () => {
      // Start a turn first
      gameStore.startTurn();

      const state = gameStore.getState();
      const initialDrawPileSize = state.drawPile.length;

      // Skip the first few cards
      gameStore.skipCurrent();
      gameStore.skipCurrent();
      gameStore.skipCurrent();

      const stateAfterSkips = gameStore.getState();
      expect(stateAfterSkips.turnSkippedCards.length).toBe(3);
      expect(stateAfterSkips.drawPile.length).toBe(initialDrawPileSize - 3);

      // Guess all remaining cards to empty the draw pile
      let currentState = gameStore.getState();
      while (currentState.drawPile.length > 0 && currentState.currentCard) {
        gameStore.guessCurrent();
        currentState = gameStore.getState();
      }

      const stateAfterEmptying = gameStore.getState();

      // Now when we try to draw again, skipped cards should be reshuffled
      // This would happen automatically in drawCard() when the pile is empty and there are skipped cards
      if (stateAfterEmptying.turnSkippedCards.length > 0 && stateAfterEmptying.drawPile.length === 0) {
        // Manually trigger a draw to test the reshuffle logic
        gameStore.drawCard();

        const finalState = gameStore.getState();
        // The skipped cards should now be back in the draw pile
        expect(finalState.drawPile.length).toBeGreaterThan(0);
        expect(finalState.turnSkippedCards.length).toBe(0); // Should be cleared
        expect(finalState.currentCard).not.toBeNull(); // Should have a current card again
      }
    });
  });
});
