/**
 * Tests for turn cycling - ensuring players get turns in proper order and cycle back to the beginning
 */

import { describe, it, expect, beforeEach } from 'vitest';
import gameStore from '../src/store.js';

describe('Turn Cycling', () => {
  beforeEach(() => {
    gameStore.reset();
  });

  it('should cycle back to first player after all players have had a turn', () => {
    // Setup game with specific teams
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

    // Start Round 1
    gameStore.startRound(1);

    console.log('Player order:', playerOrder);
    console.log('Starting player index:', gameStore.getState().currentPlayerIndex);

    // Track turn history for verification
    const turnHistory = [];
    const totalPlayers = playerOrder.length;

    // Play 2 full cycles (8 turns total for 4 players)
    const totalTurns = totalPlayers * 2;

    for (let turnNum = 0; turnNum < totalTurns; turnNum++) {
      const currentPlayerIndex = gameStore.getState().currentPlayerIndex;
      const currentPlayer = playerOrder[currentPlayerIndex];

      turnHistory.push({
        turnNumber: turnNum + 1,
        playerIndex: currentPlayerIndex,
        playerName: currentPlayer,
        cycle: Math.floor(turnNum / totalPlayers) + 1
      });

      console.log(`Turn ${turnNum + 1}: Player ${currentPlayer} (index ${currentPlayerIndex})`);

      // Play the turn
      gameStore.startTurn();
      gameStore.guessCurrent(); // Guess one card
      gameStore.endTurn();
    }

    console.log('Turn history:', turnHistory);

    // Verify first cycle (turns 1-4)
    for (let i = 0; i < totalPlayers; i++) {
      const turn = turnHistory[i];
      expect(turn.playerIndex).toBe(i);
      expect(turn.playerName).toBe(playerOrder[i]);
      expect(turn.cycle).toBe(1);
    }

    // Verify second cycle (turns 5-8) - should repeat the same order
    for (let i = 0; i < totalPlayers; i++) {
      const turn = turnHistory[totalPlayers + i];
      expect(turn.playerIndex).toBe(i);
      expect(turn.playerName).toBe(playerOrder[i]);
      expect(turn.cycle).toBe(2);
    }

    // Verify that after 2 full cycles, we're back at the first player
    const finalPlayerIndex = gameStore.getState().currentPlayerIndex;
    expect(finalPlayerIndex).toBe(0);
    expect(playerOrder[finalPlayerIndex]).toBe(playerOrder[0]);
  });

  it('should maintain proper turn order even with uneven team sizes', () => {
    // Setup game with uneven team sizes
    const config = {
      teamNames: ['Team Alpha', 'Team Beta'],
      teams: [
        { id: 'team1', name: 'Team Alpha', players: ['Alice', 'Bob', 'Charlie'] },
        { id: 'team2', name: 'Team Beta', players: ['Dave', 'Eve'] }
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

    // Start Round 1
    gameStore.startRound(1);

    console.log('Player order with uneven teams:', playerOrder);

    const totalPlayers = playerOrder.length;
    const turnHistory = [];

    // Play 1.5 cycles to ensure we properly wrap around
    const totalTurns = Math.floor(totalPlayers * 1.5);

    for (let turnNum = 0; turnNum < totalTurns; turnNum++) {
      const currentPlayerIndex = gameStore.getState().currentPlayerIndex;
      const currentPlayer = playerOrder[currentPlayerIndex];

      turnHistory.push({
        turnNumber: turnNum + 1,
        playerIndex: currentPlayerIndex,
        playerName: currentPlayer
      });

      gameStore.startTurn();
      gameStore.guessCurrent();
      gameStore.endTurn();
    }

    console.log('Turn history with uneven teams:', turnHistory);

    // Verify that player indices follow expected pattern: 0, 1, 2, 3, 4, 0, 1, 2...
    for (let i = 0; i < turnHistory.length; i++) {
      const expectedIndex = i % totalPlayers;
      const actualIndex = turnHistory[i].playerIndex;
      const expectedPlayer = playerOrder[expectedIndex];
      const actualPlayer = turnHistory[i].playerName;

      expect(actualIndex).toBe(expectedIndex);
      expect(actualPlayer).toBe(expectedPlayer);
    }
  });

  it('should ensure teams alternate properly through multiple cycles', () => {
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

    gameStore.startRound(1);

    const teams = gameStore.getState().teams;
    const getPlayerTeam = (playerName) => {
      return teams.find(team => team.players.includes(playerName));
    };

    const turnHistory = [];

    // Play 3 full cycles (12 turns total)
    const totalTurns = playerOrder.length * 3;

    for (let turnNum = 0; turnNum < totalTurns; turnNum++) {
      const currentPlayer = playerOrder[gameStore.getState().currentPlayerIndex];
      const currentTeam = getPlayerTeam(currentPlayer);

      turnHistory.push({
        turnNumber: turnNum + 1,
        playerName: currentPlayer,
        teamName: currentTeam.name,
        cycle: Math.floor(turnNum / playerOrder.length) + 1
      });

      gameStore.startTurn();
      gameStore.guessCurrent();
      gameStore.endTurn();
    }

    console.log('Team alternation across cycles:', turnHistory);

    // Verify no team goes twice in a row across the entire sequence
    for (let i = 1; i < turnHistory.length; i++) {
      const prevTeam = turnHistory[i - 1].teamName;
      const currentTeam = turnHistory[i].teamName;

      expect(currentTeam).not.toBe(prevTeam,
        `Team ${currentTeam} went twice in a row at turns ${i} and ${i + 1} (${turnHistory[i - 1].playerName} -> ${turnHistory[i].playerName})`);
    }

    // Verify that each cycle maintains the same player order
    const cycleLength = playerOrder.length;
    for (let cycle = 1; cycle < 3; cycle++) { // Compare cycle 2 and 3 to cycle 1
      for (let pos = 0; pos < cycleLength; pos++) {
        const firstCycleTurn = turnHistory[pos];
        const laterCycleTurn = turnHistory[cycle * cycleLength + pos];

        expect(laterCycleTurn.playerName).toBe(firstCycleTurn.playerName);
        expect(laterCycleTurn.teamName).toBe(firstCycleTurn.teamName);
      }
    }
  });

  it('should handle turn cycling across round transitions', () => {
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

    gameStore.startRound(1);

    const turnHistory = [];

    // Play some turns in Round 1
    for (let i = 0; i < 6; i++) {
      const currentPlayer = playerOrder[gameStore.getState().currentPlayerIndex];
      turnHistory.push({
        round: gameStore.getState().round,
        turnNumber: i + 1,
        playerName: currentPlayer,
        playerIndex: gameStore.getState().currentPlayerIndex
      });

      gameStore.startTurn();
      gameStore.guessCurrent();
      gameStore.endTurn();

      // Advance to Round 2 after 3 turns
      if (i === 2) {
        gameStore.nextRound();
      }
    }

    console.log('Turn cycling across rounds:', turnHistory);

    // Verify that player order continues properly across round transition
    // Round 1: Player 0, 1, 2
    // Round 2: Player 3, 0, 1 (continuing the cycle)

    const expectedPattern = [0, 1, 2, 3, 0, 1]; // Player indices

    for (let i = 0; i < turnHistory.length; i++) {
      const expectedIndex = expectedPattern[i];
      const actualIndex = turnHistory[i].playerIndex;
      const expectedPlayer = playerOrder[expectedIndex];
      const actualPlayer = turnHistory[i].playerName;

      expect(actualIndex).toBe(expectedIndex);
      expect(actualPlayer).toBe(expectedPlayer);
    }
  });
});
