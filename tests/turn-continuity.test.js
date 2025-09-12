/**
 * Tests for turn order continuity across rounds
 */

import { describe, it, expect, beforeEach } from 'vitest';
import gameStore from '../src/store.js';

describe('Turn Order Continuity', () => {
  beforeEach(() => {
    gameStore.reset();
  });

  it('should maintain turn order across round transitions', () => {
    // Setup game with specific player order
    const config = {
      teamNames: ['Team Alpha', 'Team Beta'],
      teams: [
        { id: 'team1', name: 'Team Alpha', players: ['P1', 'P2', 'P3'] },
        { id: 'team2', name: 'Team Beta', players: ['P4', 'P5', 'P6'] }
      ],
      categories: ['Bollywood', 'Sports'],
      deckSize: 8,
      timerSeconds: 60
    };

    gameStore.configure(config);
    gameStore.generatePlayerOrder();

    // Mock card selection to complete setup
    gameStore.startCardSelection();
    const playerOrder = gameStore.getState().playerOrder;

    // Select cards for each player
    playerOrder.forEach(() => {
      const playerCards = gameStore.getState().currentPlayerCards.slice(0, 8);
      gameStore.selectCards(playerCards);
    });

    // Start Round 1
    gameStore.startRound(1);

    const initialPlayerOrder = [...gameStore.getState().playerOrder];
    let currentPlayerIndex = gameStore.getState().currentPlayerIndex;

    console.log('Initial player order:', initialPlayerOrder);
    console.log('Starting with player index:', currentPlayerIndex, '- Player:', initialPlayerOrder[currentPlayerIndex]);

    // Simulate some turns in Round 1
    // Let's say we play 3 turns
    for (let i = 0; i < 3; i++) {
      const currentPlayer = initialPlayerOrder[currentPlayerIndex];
      console.log(`Round 1, Turn ${i + 1}: Player ${currentPlayer} (index ${currentPlayerIndex})`);

      gameStore.startTurn();
      gameStore.guessCurrent(); // Guess one card
      gameStore.endTurn();

      // Update current player index
      currentPlayerIndex = gameStore.getState().currentPlayerIndex;
    }

    // Record the player who should go next
    const playerBeforeRoundTransition = initialPlayerOrder[currentPlayerIndex];
    console.log('Player who should start Round 2:', playerBeforeRoundTransition, '(index', currentPlayerIndex, ')');

    // Advance to Round 2
    const nextRoundSuccess = gameStore.nextRound();
    expect(nextRoundSuccess).toBe(true);

    // Check that the current player index has NOT been reset
    const playerAfterRoundTransition = initialPlayerOrder[gameStore.getState().currentPlayerIndex];
    const newCurrentPlayerIndex = gameStore.getState().currentPlayerIndex;

    console.log('Player who actually starts Round 2:', playerAfterRoundTransition, '(index', newCurrentPlayerIndex, ')');

    // The current player index should be the same
    expect(newCurrentPlayerIndex).toBe(currentPlayerIndex);
    expect(playerAfterRoundTransition).toBe(playerBeforeRoundTransition);

    // The player order itself should remain unchanged
    expect(gameStore.getState().playerOrder).toEqual(initialPlayerOrder);

    // Now simulate one more turn to see the next player
    gameStore.startTurn();
    gameStore.guessCurrent();
    gameStore.endTurn();

    const nextPlayerIndex = gameStore.getState().currentPlayerIndex;
    const expectedNextIndex = (currentPlayerIndex + 1) % initialPlayerOrder.length;
    const nextPlayer = initialPlayerOrder[nextPlayerIndex];
    const expectedNextPlayer = initialPlayerOrder[expectedNextIndex];

    console.log('Next player after first Round 2 turn:', nextPlayer, '(index', nextPlayerIndex, ')');
    console.log('Expected next player:', expectedNextPlayer, '(index', expectedNextIndex, ')');

    expect(nextPlayerIndex).toBe(expectedNextIndex);
    expect(nextPlayer).toBe(expectedNextPlayer);
  });

  it('should ensure no team goes twice in a row across rounds', () => {
    // Setup game
    const config = {
      teamNames: ['Team Alpha', 'Team Beta'],
      teams: [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob'] },
        { id: 'team2', name: 'Team Beta', players: ['Charlie', 'Dave'] }
      ],
      categories: ['Bollywood', 'Sports'],
      deckSize: 8,
      timerSeconds: 60
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

    // Start Round 1 and simulate turns until we're near the end
    gameStore.startRound(1);

    const teams = gameStore.getState().teams;
    const getPlayerTeam = (playerName) => {
      return teams.find(team => team.players.includes(playerName));
    };

    // Simulate several turns and track team alternation
    const turnHistory = [];

    // Play enough turns to cross round boundary
    for (let turn = 0; turn < 6; turn++) {
      const currentPlayer = gameStore.getState().playerOrder[gameStore.getState().currentPlayerIndex];
      const currentTeam = getPlayerTeam(currentPlayer);

      turnHistory.push({
        turn: turn + 1,
        round: gameStore.getState().round,
        player: currentPlayer,
        team: currentTeam.name
      });

      gameStore.startTurn();
      gameStore.guessCurrent();
      gameStore.endTurn();

      // Advance to Round 2 after turn 3
      if (turn === 2) {
        gameStore.nextRound();
      }
    }

    console.log('Turn history:', turnHistory);

    // Check that no team goes twice in a row
    for (let i = 1; i < turnHistory.length; i++) {
      const prevTeam = turnHistory[i - 1].team;
      const currentTeam = turnHistory[i].team;

      expect(currentTeam).not.toBe(prevTeam,
        `Team ${currentTeam} went twice in a row at turns ${i} and ${i + 1}`);
    }
  });
});
