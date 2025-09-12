import { describe, test, expect, beforeEach } from 'vitest';
import gameStore from '../src/store.js';

describe('Round Transitions', () => {
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
      deckSize: 8, // Smaller deck for faster tests
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
      state = gameStore.getState();
    }

    gameStore.startRound(1);
  });

  describe('Round 1 to Round 2 Transition', () => {
    test('should tally round 1 scores before transitioning', () => {
      // Play through some of round 1
      gameStore.startTurn();
      const initialState = gameStore.getState();

      // Guess a card to get some points
      if (initialState.currentCard) {
        gameStore.guessCurrent();
      }

      gameStore.endTurn();

      // Get points from the turn
      const afterTurnState = gameStore.getState();
      const team1InitialScore = afterTurnState.teamScores[0][0] || 0;

      // Complete round 1 by marking all cards as guessed
      const state = gameStore.getState();
      state.deck.forEach(card => {
        state.guessedOnce.add(card.id);
      });

      // Should be round complete now
      expect(gameStore.isRoundComplete()).toBe(true);

      // Transition to round 2
      const advanced = gameStore.nextRound();
      expect(advanced).toBe(true);

      const round2State = gameStore.getState();
      expect(round2State.round).toBe(2);

      // Round 1 scores should be preserved
      expect(round2State.teamScores[0][0]).toBe(team1InitialScore);

      // Round 2 scores should be initialized to 0
      expect(round2State.teamScores[0][1]).toBe(0);
      expect(round2State.teamScores[1][1]).toBe(0);
    });

    test('should reset deck and game state for round 2', () => {
      // Complete round 1
      const state = gameStore.getState();
      const originalDeckSize = state.deck.length;

      // Mark all cards as guessed
      state.deck.forEach(card => {
        state.guessedOnce.add(card.id);
      });

      // Transition to round 2
      gameStore.nextRound();

      const round2State = gameStore.getState();

      // All cards should be back in draw pile
      expect(round2State.drawPile.length).toBe(originalDeckSize);
      expect(round2State.discardPile.length).toBe(0);

      // guessedOnce should be cleared for round 2
      expect(round2State.guessedOnce.size).toBe(0);

      // Turn state should be reset
      expect(round2State.turnActive).toBe(false);
      expect(round2State.currentCard).toBe(null);
      expect(round2State.currentPlayerIndex).toBe(0);
    });

    test('should clear turn state when transitioning rounds', () => {
      // Start a turn and create some turn state
      gameStore.startTurn();

      if (gameStore.getState().currentCard) {
        gameStore.guessCurrent();
      }

      const beforeTransition = gameStore.getState();
      expect(beforeTransition.turnGuessedCards.length).toBeGreaterThan(0);

      // Complete the round
      beforeTransition.deck.forEach(card => {
        beforeTransition.guessedOnce.add(card.id);
      });

      gameStore.nextRound();

      const afterTransition = gameStore.getState();
      expect(afterTransition.turnGuessedCards.length).toBe(0);
      expect(afterTransition.turnSkippedCards.length).toBe(0);
    });
  });

  describe('Round 2 to Round 3 Transition', () => {
    test('should advance from round 2 to round 3', () => {
      // Start in round 2
      gameStore.nextRound(); // Round 1 -> 2
      expect(gameStore.getState().round).toBe(2);

      // Play a bit of round 2
      gameStore.startTurn();
      if (gameStore.getState().currentCard) {
        gameStore.guessCurrent();
      }
      gameStore.endTurn();

      // Complete round 2
      const state = gameStore.getState();
      state.deck.forEach(card => {
        state.guessedOnce.add(card.id);
      });

      // Transition to round 3
      const advanced = gameStore.nextRound();
      expect(advanced).toBe(true);

      const round3State = gameStore.getState();
      expect(round3State.round).toBe(3);

      // All previous round scores should be preserved
      expect(round3State.teamScores[0]).toHaveLength(3);
      expect(round3State.teamScores[1]).toHaveLength(3);
    });
  });

  describe('Game Completion', () => {
    test('should not advance beyond round 3', () => {
      // Go to round 3
      gameStore.nextRound(); // Round 1 -> 2
      gameStore.nextRound(); // Round 2 -> 3

      expect(gameStore.getState().round).toBe(3);

      // Try to advance beyond round 3
      const advanced = gameStore.nextRound();
      expect(advanced).toBe(false);

      // Should still be in round 3
      expect(gameStore.getState().round).toBe(3);
    });

    test('should tally final round scores when game completes', () => {
      // Go to round 3
      gameStore.nextRound(); // Round 1 -> 2
      gameStore.nextRound(); // Round 2 -> 3

      // Play some of round 3
      gameStore.startTurn();
      if (gameStore.getState().currentCard) {
        gameStore.guessCurrent();
      }
      gameStore.endTurn();

      const beforeFinalTally = gameStore.getState();
      const round3ScoreBefore = beforeFinalTally.teamScores[0][2] || 0;

      // Complete round 3
      beforeFinalTally.deck.forEach(card => {
        beforeFinalTally.guessedOnce.add(card.id);
      });

      // Try to advance (should fail but tally scores)
      gameStore.nextRound();

      const afterFinalTally = gameStore.getState();

      // Round 3 scores should be tallied
      expect(afterFinalTally.teamScores[0][2]).toBeGreaterThanOrEqual(round3ScoreBefore);
    });
  });

  describe('Score Tallying', () => {
    test('should calculate scores correctly based on turn history', () => {
      // Start round and play some turns
      gameStore.startTurn();

      const initialState = gameStore.getState();
      const firstCard = initialState.currentCard;
      const expectedPoints = firstCard ? firstCard.points : 0;

      if (firstCard) {
        gameStore.guessCurrent();
      }

      gameStore.endTurn();

      // Manual tally
      gameStore.tallyRound();

      const afterTally = gameStore.getState();

      // Team that played should have points equal to the card points
      const team1Score = afterTally.teamScores[0][0] || 0;
      const team2Score = afterTally.teamScores[1][0] || 0;

      // One team should have the expected points
      expect(team1Score + team2Score).toBe(expectedPoints);
    });

    test('should accumulate scores from multiple turns in same round', () => {
      let totalExpectedPoints = 0;

      // Play multiple turns
      for (let i = 0; i < 3; i++) {
        gameStore.startTurn();

        const state = gameStore.getState();
        if (state.currentCard) {
          totalExpectedPoints += state.currentCard.points;
          gameStore.guessCurrent();
        }

        gameStore.endTurn();
      }

      // Tally the round
      gameStore.tallyRound();

      const finalState = gameStore.getState();
      const totalActualPoints = finalState.teamScores[0][0] + finalState.teamScores[1][0];

      expect(totalActualPoints).toBe(totalExpectedPoints);
    });
  });
});
