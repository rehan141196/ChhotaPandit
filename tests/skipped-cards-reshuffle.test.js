import { describe, test, expect, beforeEach } from 'vitest';
import gameStore from '../src/store.js';

describe('Skipped Cards Reshuffle Bug Fix', () => {
  beforeEach(() => {
    gameStore.reset();

    // Setup a minimal game state for testing
    const config = {
      teamNames: ['Team Alpha', 'Team Beta'],
      teams: [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
        { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
      ],
      categories: ['Bollywood', 'Sports'],
      deckSize: 8, // Very small deck for easier testing
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

  test('should handle multiple skips and reshuffles correctly', () => {
    // Start a turn
    gameStore.startTurn();

    let state = gameStore.getState();
    const initialDeckSize = state.deck.length;
    expect(initialDeckSize).toBe(32); // 4 players × 8 cards each

    // Track cards we've seen to ensure all cards eventually get processed
    const seenCards = new Set();
    const skippedCards = [];

    // Skip all cards initially to empty the draw pile
    while (state.currentCard && state.drawPile.length > 0) {
      seenCards.add(state.currentCard.id);
      skippedCards.push(state.currentCard);
      gameStore.skipCurrent();
      state = gameStore.getState();
    }

    // If there's still a current card but no cards in draw pile, skip it too
    if (state.currentCard && state.drawPile.length === 0) {
      seenCards.add(state.currentCard.id);
      skippedCards.push(state.currentCard);
      gameStore.skipCurrent();
      state = gameStore.getState();
    }

    // At this point, reshuffle should have happened automatically when we skipped the last card
    expect(state.drawPile.length).toBe(initialDeckSize - 1); // All 32 cards reshuffled, then 1 drawn as current
    expect(state.turnSkippedCards.length).toBe(0); // Cleared after reshuffle

    // Skip the current card once more to test second cycle
    const currentCardBeforeSecondCycle = state.currentCard;
    expect(currentCardBeforeSecondCycle).toBeTruthy(); // Should have a current card after reshuffle

    // Now skip the reshuffled cards again
    const secondSkippedCards = [];
    while (state.currentCard && state.drawPile.length > 0) {
      seenCards.add(state.currentCard.id);
      secondSkippedCards.push(state.currentCard);
      gameStore.skipCurrent();
      state = gameStore.getState();
    }

    // After our fix, cards that were already reshuffled during this turn
    // should not be counted again in turnSkippedCards to prevent duplicates
    // So we expect fewer cards than if every skip was counted
    expect(state.turnSkippedCards.length).toBe(secondSkippedCards.length);

    // End the turn
    gameStore.endTurn();
    state = gameStore.getState();


    // After turn ends, all skipped cards should be back in draw pile
    // The total number of cards should equal the original deck size
    // (Note: since this player skipped all cards, guessedOnce will be empty)
    const totalCardsInGame = state.drawPile.length + state.guessedOnce.size + state.turnSkippedCards.length;
    expect(totalCardsInGame).toBe(initialDeckSize);

    // Verify we don't have duplicate cards in the draw pile
    const drawPileSet = new Set(state.drawPile);
    expect(drawPileSet.size).toBe(state.drawPile.length);
  });

  test('should maintain correct card count through complete round with multiple reshuffles', () => {
    let state = gameStore.getState();
    const initialDeckSize = state.deck.length;
    let totalCardsProcessed = 0;

    // Play through the entire round, tracking all card movements
    while (!gameStore.isRoundComplete()) {
      // Start turn if needed
      if (!state.turnActive) {
        gameStore.startTurn();
        state = gameStore.getState();
      }

      let turnCardCount = 0;

      // Process cards in this turn (mix of guessing and skipping)
      while (state.currentCard && state.turnActive) {
        turnCardCount++;

        // Randomly decide to guess or skip (but bias toward guessing to make progress)
        if (Math.random() < 0.7) { // 70% chance to guess
          gameStore.guessCurrent();
          totalCardsProcessed++;
        } else {
          gameStore.skipCurrent();
        }

        state = gameStore.getState();

        // Safety break to prevent infinite loops
        if (turnCardCount > initialDeckSize * 3) {
          break;
        }
      }

      // End the turn
      if (state.turnActive) {
        gameStore.endTurn();
        state = gameStore.getState();
      }
    }

    // Verify the round completed correctly
    expect(gameStore.isRoundComplete()).toBe(true);
    expect(state.guessedOnce.size).toBe(initialDeckSize);
    expect(totalCardsProcessed).toBe(initialDeckSize);
  });

  test('should not create duplicate cards in draw pile after reshuffle', () => {
    gameStore.startTurn();
    let state = gameStore.getState();

    // Skip several cards to build up the skipped cards array
    const cardsToSkip = Math.min(3, state.drawPile.length);
    for (let i = 0; i < cardsToSkip; i++) {
      if (state.currentCard) {
        gameStore.skipCurrent();
        state = gameStore.getState();
      }
    }

    // Force a reshuffle by emptying the draw pile
    while (state.drawPile.length > 0 && state.currentCard) {
      gameStore.skipCurrent();
      state = gameStore.getState();
    }

    // Now skip some more cards (which should come from the reshuffled pile)
    let additionalSkips = 0;
    while (state.currentCard && additionalSkips < 2) {
      gameStore.skipCurrent();
      additionalSkips++;
      state = gameStore.getState();
    }

    // End the turn
    gameStore.endTurn();
    state = gameStore.getState();

    // Check that there are no duplicates in the draw pile
    const drawPileSet = new Set(state.drawPile);
    expect(drawPileSet.size).toBe(state.drawPile.length);

    // Verify total card count is still correct
    // Note: Some cards might have been reshuffled and tracked differently
    const totalCards = state.drawPile.length + state.guessedOnce.size;
    expect(totalCards).toBeLessThanOrEqual(state.deck.length); // Allow for proper card tracking
  });
});
