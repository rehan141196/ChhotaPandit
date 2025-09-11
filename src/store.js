/**
 * @typedef {Object} Card
 * @property {string} id - Unique identifier for the card
 * @property {string} title - The card title/content
 * @property {string} category - Category this card belongs to
 * @property {number} points - Point value (1-4)
 * @property {string} [hints] - Optional hints for the card
 */

/**
 * @typedef {Object} Team
 * @property {string} id - Unique identifier for the team
 * @property {string} name - Team name
 * @property {string[]} players - Array of player names
 */

/**
 * @typedef {Object} GameConfig
 * @property {string[]} teamNames - Names of the teams
 * @property {Team[]} teams - Team objects with players
 * @property {string[]} categories - Selected categories
 * @property {number} deckSize - Total deck size
 * @property {number} timerSeconds - Timer duration per turn
 */

/**
 * @typedef {Object} TurnResult
 * @property {string} teamId - ID of the team that played this turn
 * @property {number} round - Round number (1, 2, or 3)
 * @property {string[]} guessedCardIds - Cards guessed correctly this turn
 * @property {string[]} skippedCardIds - Cards skipped this turn
 * @property {number} durationSec - Turn duration in seconds
 * @property {number} timestamp - Timestamp when turn ended
 */

/**
 * @typedef {Object} GameState
 * @property {GameConfig} config - Game configuration
 * @property {Team[]} teams - Array of teams
 * @property {string[]} playerOrder - Randomized order of all players
 * @property {Card[]} deck - All cards in the game deck
 * @property {string[]} drawPile - IDs of cards in draw pile
 * @property {string[]} discardPile - IDs of cards in discard pile
 * @property {number} round - Current round (1, 2, or 3)
 * @property {string[]} teamOrder - Order of teams for turns
 * @property {number} currentTeamIndex - Index of current team in teamOrder
 * @property {boolean} turnActive - Whether a turn is currently active
 * @property {TurnResult[]} history - History of all completed turns
 * @property {Set<string>} guessedOnce - Cards guessed at least once (for Round 1 completion)
 * @property {boolean} cardSelectionPhase - Whether we're in the card selection phase
 * @property {number} currentPlayerSelectionIndex - Index of player currently selecting cards
 * @property {Card[]} currentPlayerCards - 16 cards shown to current player for selection
 * @property {Card[]} selectedCards - All cards selected by all players so far
 * @property {Card[]} allShownCards - All cards that have been shown to any player (to ensure no overlap)
 * @property {Object<string, Card[]>} playerSelections - Map of player name to their selected cards
 * @property {number} currentPlayerIndex - Index of current player in playerOrder
 * @property {Card|null} currentCard - Currently displayed card
 * @property {number} timerSeconds - Remaining seconds in current turn
 * @property {number|null} timerInterval - Timer interval ID
 * @property {Card[]} turnGuessedCards - Cards guessed correctly in current turn
 * @property {Card[]} turnSkippedCards - Cards skipped in current turn
 * @property {number[][]} teamScores - Team scores by round [team][round]
 */

// Import cards functions
import { getCardsByCategories, validateDeckConstraints } from './cards.js';

/**
 * GameStore - Singleton-like store for managing game state
 */
class GameStore {
  constructor() {
    /** @type {GameState} */
    this.state = {
      config: null,
      teams: [],
      playerOrder: [],
      deck: [],
      drawPile: [],
      discardPile: [],
      round: 1,
      teamOrder: [],
      currentTeamIndex: 0,
      turnActive: false,
      history: [],
      guessedOnce: new Set(),
      cardSelectionPhase: false,
      currentPlayerSelectionIndex: 0,
      currentPlayerCards: [],
      selectedCards: [],
      allShownCards: [],
      playerSelections: {},
      currentPlayerIndex: 0,
      currentCard: null,
      timerSeconds: 60,
      timerInterval: null,
      turnGuessedCards: [],
      turnSkippedCards: [],
      turnReshuffledCards: [], // Cards that were reshuffled back into play this turn
      teamScores: [[], []], // Team scores by round
      lastTurnSummary: null, // Summary of the last completed turn
    };

    this.listeners = new Set();
  }

  /**
   * Configure the game with setup parameters
   * @param {GameConfig} config - Game configuration
   */
  configure(config) {
    this.state.config = config;

    // Use the provided team objects directly
    this.state.teams = config.teams;

    // Set team order for alternating turns
    this.state.teamOrder = this.state.teams.map((team) => team.id);
    this.state.currentTeamIndex = 0;

    this.notifyListeners();
    console.log('GameStore.configure completed with:', config);
  }

  /**
   * Build the game deck according to constraints
   * @throws {Error} If deck constraints cannot be satisfied
   */
  buildDeck() {
    if (!this.state.config) {
      throw new Error('Game must be configured before building deck');
    }

    const { categories, deckSize } = this.state.config;

    // Validate constraints first
    const validation = validateDeckConstraints(categories, deckSize);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    // Get all available cards for selected categories
    const availableCards = getCardsByCategories(categories);

    // Build deck with constraints:
    // - At least 1 card from each category
    // - Randomly distributed across categories
    // - Total cards = deckSize

    const deck = [];
    const categoryCards = {};

    // Group cards by category
    categories.forEach(category => {
      categoryCards[category] = availableCards.filter(card => card.category === category);
    });

    // First, add at least 1 card from each category
    categories.forEach(category => {
      if (categoryCards[category].length > 0) {
        const randomCard = categoryCards[category][
          Math.floor(Math.random() * categoryCards[category].length)
        ];
        deck.push(randomCard);
        // Remove the selected card from available pool
        categoryCards[category] = categoryCards[category].filter(card => card.id !== randomCard.id);
      }
    });

    // Now fill remaining slots randomly from all available cards
    const cardsPerCategory = {};
    categories.forEach(cat => cardsPerCategory[cat] = 1); // Already added 1 each

    // Create a pool of all remaining available cards
    const remainingCards = Object.values(categoryCards).flat();

    while (deck.length < deckSize && remainingCards.length > 0) {
      // Pick a random card from remaining pool
      const randomIndex = Math.floor(Math.random() * remainingCards.length);
      const randomCard = remainingCards[randomIndex];

      deck.push(randomCard);
      cardsPerCategory[randomCard.category]++;

      // Remove the selected card from remaining pool
      remainingCards.splice(randomIndex, 1);
    }

    if (deck.length < deckSize) {
      throw new Error('Cannot build deck: insufficient cards available');
    }

    // Shuffle the final deck
    this.state.deck = this.shuffleArray(deck);
    this.state.drawPile = this.state.deck.map(card => card.id);
    this.state.discardPile = [];

    this.notifyListeners();
    console.log('Deck built successfully:', {
      totalCards: this.state.deck.length,
      categories: categories,
      cardsPerCategory: cardsPerCategory
    });
  }

  /**
   * Generate randomized player order for the entire game
   * Order remains fixed for the entire game
   * Players alternate between Team 1 and Team 2
   */
  generatePlayerOrder() {
    if (!this.state.teams || this.state.teams.length !== 2) {
      throw new Error(
        'Teams must be configured before generating player order'
      );
    }

    const team1Players = [...this.state.teams[0].players];
    const team2Players = [...this.state.teams[1].players];

    // Shuffle each team's players independently
    const shuffledTeam1 = this.shuffleArray(team1Players);
    const shuffledTeam2 = this.shuffleArray(team2Players);

    // Create alternating order: Team1, Team2, Team1, Team2, etc.
    const playerOrder = [];
    const maxPlayers = Math.max(shuffledTeam1.length, shuffledTeam2.length);

    for (let i = 0; i < maxPlayers; i++) {
      if (i < shuffledTeam1.length) {
        playerOrder.push(shuffledTeam1[i]);
      }
      if (i < shuffledTeam2.length) {
        playerOrder.push(shuffledTeam2[i]);
      }
    }

    this.state.playerOrder = playerOrder;

    this.notifyListeners();
    console.log('Player order generated:', playerOrder);
  }

  /**
   * Start the card selection phase
   * Each player will be shown 16 cards and must select 8
   */
  startCardSelection() {
    if (!this.state.config) {
      throw new Error('Game must be configured before starting card selection');
    }

    if (!this.state.playerOrder || this.state.playerOrder.length === 0) {
      throw new Error('Player order must be generated before starting card selection');
    }

    this.state.cardSelectionPhase = true;
    this.state.currentPlayerSelectionIndex = 0;
    this.state.selectedCards = [];
    this.state.allShownCards = [];
    this.state.playerSelections = {};

    // Generate 16 cards for the first player
    this.generateCardsForPlayer();

    this.notifyListeners();
    console.log('Card selection phase started');
  }

  /**
   * Generate 16 random cards for the current player to choose from
   * Cards are from the selected categories and exclude all previously shown cards
   */
  generateCardsForPlayer() {
    const { categories } = this.state.config;
    const availableCards = getCardsByCategories(categories);

    // Filter out cards already shown to ANY previous player
    const shownCardIds = new Set(this.state.allShownCards.map(card => card.id));
    const unusedCards = availableCards.filter(card => !shownCardIds.has(card.id));

    if (unusedCards.length < 16) {
      throw new Error('Not enough unused cards available for selection');
    }

    // Randomly select 16 cards
    const shuffled = this.shuffleArray([...unusedCards]);
    this.state.currentPlayerCards = shuffled.slice(0, 16);

    // Track these cards as shown
    this.state.allShownCards.push(...this.state.currentPlayerCards);

    this.notifyListeners();
    console.log(`Generated 16 cards for player: ${this.getCurrentPlayerName()}`);
  }

  /**
   * Get the name of the current player selecting cards
   * @returns {string} Current player's name
   */
  getCurrentPlayerName() {
    if (this.state.cardSelectionPhase) {
      return this.state.playerOrder[this.state.currentPlayerSelectionIndex];
    } else {
      return this.state.playerOrder[this.state.currentPlayerIndex];
    }
  }

  /**
   * Player selects 8 cards from their 16 options
   * @param {Card[]} selectedCards - Array of 8 cards the player selected
   */
  selectCards(selectedCards) {
    if (!this.state.cardSelectionPhase) {
      throw new Error('Not in card selection phase');
    }

    if (selectedCards.length !== 8) {
      throw new Error('Player must select exactly 8 cards');
    }

    // Validate all selected cards are from the current player's options
    const currentCardIds = new Set(this.state.currentPlayerCards.map(card => card.id));
    const invalidCards = selectedCards.filter(card => !currentCardIds.has(card.id));

    if (invalidCards.length > 0) {
      throw new Error('Selected cards must be from the current player\'s options');
    }

    const currentPlayer = this.getCurrentPlayerName();

    // Store the player's selections
    this.state.playerSelections[currentPlayer] = selectedCards;
    this.state.selectedCards.push(...selectedCards);

    console.log(`Player ${currentPlayer} selected 8 cards`);

    // Move to next player
    this.state.currentPlayerSelectionIndex++;

    // Check if all players have selected
    if (this.state.currentPlayerSelectionIndex >= this.state.playerOrder.length) {
      this.finishCardSelection();
    } else {
      // Generate cards for next player
      this.generateCardsForPlayer();
    }

    this.notifyListeners();
  }

  /**
   * Finish the card selection phase and build the final deck
   */
  finishCardSelection() {
    this.state.cardSelectionPhase = false;

    // The final deck is all selected cards
    this.state.deck = [...this.state.selectedCards];
    this.state.drawPile = this.state.deck.map(card => card.id);
    this.state.discardPile = [];

    // Clear temporary selection state
    this.state.currentPlayerCards = [];
    this.state.allShownCards = [];
    this.state.currentPlayerSelectionIndex = 0;

    this.notifyListeners();
    console.log(`Card selection completed. Final deck has ${this.state.deck.length} cards`);
    console.log('Player selections:', this.state.playerSelections);
  }

  /**
   * Shuffle an array using Fisher-Yates algorithm
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   * @private
   */
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Start a new round
   * @param {number} roundNumber - Round number (1, 2, or 3)
   */
  startRound(roundNumber) {
    if (roundNumber < 1 || roundNumber > 3) {
      throw new Error('Round number must be 1, 2, or 3');
    }

    this.state.round = roundNumber;
    this.state.currentPlayerIndex = 0;
    this.state.turnActive = false;
    this.state.currentCard = null;

    // Reset draw pile with all cards for new round
    this.state.drawPile = this.state.deck.map(card => card.id);
    this.state.discardPile = [];

    // Initialize team scores for this round if not already done
    this.state.teams.forEach((team, index) => {
      if (!this.state.teamScores[index]) {
        this.state.teamScores[index] = [];
      }
      if (!this.state.teamScores[index][roundNumber - 1]) {
        this.state.teamScores[index][roundNumber - 1] = 0;
      }
    });

    this.notifyListeners();
    console.log(`Round ${roundNumber} started`);
  }

  /**
   * Start a new turn for the current team
   */
  startTurn() {
    if (this.state.turnActive) {
      throw new Error('A turn is already active');
    }

    if (this.state.drawPile.length === 0) {
      throw new Error('No cards left in draw pile');
    }

    this.state.turnActive = true;
    this.state.timerSeconds = this.state.config?.timerSeconds || 60;
    this.state.turnGuessedCards = [];
    this.state.turnSkippedCards = [];
    this.state.turnReshuffledCards = [];
    this.state.lastTurnSummary = null; // Clear previous turn summary

    // Draw the first card
    this.drawCard();

    // Start the timer
    this.startTimer();

    this.notifyListeners();
    console.log(`Turn started for player: ${this.getCurrentPlayerName()}`);
  }

  /**
   * End the current turn
   */
  endTurn() {
    if (!this.state.turnActive) {
      throw new Error('No active turn to end');
    }

    // Stop the timer
    this.stopTimer();

    // Record the turn result
    const currentPlayer = this.getCurrentPlayerName();
    const currentTeam = this.getTeamForPlayer(currentPlayer);

    const turnResult = {
      teamId: currentTeam.id,
      round: this.state.round,
      guessedCardIds: this.state.turnGuessedCards.map(card => card.id),
      skippedCardIds: this.state.turnSkippedCards.map(card => card.id),
      durationSec: Math.max(1, (this.state.config?.timerSeconds || 60) - this.state.timerSeconds),
      timestamp: Date.now()
    };

    this.state.history.push(turnResult);

    // Add points to team score
    const points = this.state.turnGuessedCards.reduce((sum, card) => sum + card.points, 0);
    const teamIndex = this.state.teams.findIndex(team => team.id === currentTeam.id);

    if (teamIndex === -1) {
      throw new Error(`Team not found for player ${currentPlayer}. Team ID: ${currentTeam.id}`);
    }

    // Ensure team scores array exists and is properly initialized
    if (!this.state.teamScores[teamIndex]) {
      this.state.teamScores[teamIndex] = [];
    }
    if (this.state.teamScores[teamIndex][this.state.round - 1] === undefined) {
      this.state.teamScores[teamIndex][this.state.round - 1] = 0;
    }

    this.state.teamScores[teamIndex][this.state.round - 1] += points;

    // Track guessed cards for round completion check
    this.state.turnGuessedCards.forEach(card => {
      this.state.guessedOnce.add(card.id);
    });

    // Store turn summary for display (before clearing)
    this.state.lastTurnSummary = {
      playerName: currentPlayer,
      teamName: currentTeam.name,
      guessedCount: this.state.turnGuessedCards.length,
      skippedCount: this.state.turnSkippedCards.length,
      points: points,
      guessedCards: [...this.state.turnGuessedCards],
      skippedCards: [...this.state.turnSkippedCards]
    };

    // Return any remaining skipped cards to the draw pile for future turns
    const cardsToReturn = [];

    // Add skipped cards
    if (this.state.turnSkippedCards.length > 0) {
      cardsToReturn.push(...this.state.turnSkippedCards.map(card => card.id));
    }

    // Add current card if it exists - always return it to maintain card count
    if (this.state.currentCard) {
      cardsToReturn.push(this.state.currentCard.id);
    }

    if (cardsToReturn.length > 0) {
      // Only add cards that are not already in the draw pile
      const cardsToAdd = cardsToReturn.filter(cardId =>
        !this.state.drawPile.includes(cardId)
      );

      // Insert remaining cards randomly back into the draw pile
      cardsToAdd.forEach(cardId => {
        const insertPosition = Math.floor(Math.random() * (this.state.drawPile.length + 1));
        this.state.drawPile.splice(insertPosition, 0, cardId);
      });

      if (cardsToAdd.length > 0) {
        console.log(`Returned ${cardsToAdd.length} skipped cards to draw pile for future turns`);
      }
    }

    // Clear turn state
    this.state.turnActive = false;
    this.state.currentCard = null;
    this.state.turnGuessedCards = [];
    this.state.turnSkippedCards = [];
    this.state.turnReshuffledCards = [];

    // Move to next player
    this.nextPlayer();

    this.notifyListeners();
    console.log(`Turn ended for player: ${currentPlayer}, points earned: ${points}`);
  }

  /**
   * Mark the current card as guessed correctly
   */
  guessCurrent() {
    if (!this.state.turnActive) {
      throw new Error('No active turn');
    }

    if (!this.state.currentCard) {
      throw new Error('No current card to guess');
    }

    // Add to guessed cards for this turn
    this.state.turnGuessedCards.push(this.state.currentCard);

    console.log(`Card guessed: ${this.state.currentCard.title}`);

    // Draw next card if available and timer hasn't expired
    if (this.state.timerSeconds > 0) {
      this.drawCard();
    } else {
      // Timer expired, clear current card
      this.state.currentCard = null;
    }

    this.notifyListeners();
  }

  /**
   * Skip the current card
   */
  skipCurrent() {
    if (!this.state.turnActive) {
      throw new Error('No active turn');
    }

    if (!this.state.currentCard) {
      throw new Error('No current card to skip');
    }

    // Add to skipped cards for this turn
    this.state.turnSkippedCards.push(this.state.currentCard);

    console.log(`Card skipped: ${this.state.currentCard.title}`);

    // Clear current card before drawing next one to avoid double-counting in reshuffle
    this.state.currentCard = null;

    // Draw next card if available and timer hasn't expired
    this.drawCard();

    this.notifyListeners();
  }

  /**
   * Move to the next team
   */
  nextTeam() {
    // Implementation placeholder
    console.log('GameStore.nextTeam called');
  }

  /**
   * Move to the next player
   */
  nextPlayer() {
    this.state.currentPlayerIndex = (this.state.currentPlayerIndex + 1) % this.state.playerOrder.length;
  }

  /**
   * Get the team for a given player
   * @param {string} playerName - Player name
   * @returns {Team} The team the player belongs to
   */
  getTeamForPlayer(playerName) {
    return this.state.teams.find(team => team.players.includes(playerName));
  }

  /**
   * Draw a card from the draw pile
   */
  drawCard() {
    // If draw pile is empty but we have skipped cards in this turn, reshuffle them back
    if (this.state.drawPile.length === 0 && this.state.turnSkippedCards.length > 0) {
      // Reshuffle only the skipped cards back into the draw pile
      const cardsToReshuffle = [...this.state.turnSkippedCards];
      const cardIdsToReshuffle = cardsToReshuffle.map(card => card.id);

      // Track these cards as reshuffled so we don't double-add them at turn end
      this.state.turnReshuffledCards.push(...cardsToReshuffle);

      // Shuffle the cards randomly
      for (let i = cardIdsToReshuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardIdsToReshuffle[i], cardIdsToReshuffle[j]] = [cardIdsToReshuffle[j], cardIdsToReshuffle[i]];
      }

      // Add them back to the draw pile
      this.state.drawPile.push(...cardIdsToReshuffle);

      // Clear the skipped cards from the current turn since they're back in play
      this.state.turnSkippedCards = [];

      console.log(`Reshuffled ${cardIdsToReshuffle.length} cards back into draw pile`);
    }

    if (this.state.drawPile.length === 0) {
      this.state.currentCard = null;
      return;
    }

    const cardId = this.state.drawPile.shift(); // Remove the first card from draw pile
    this.state.currentCard = this.state.deck.find(card => card.id === cardId);
  }

  /**
   * Start the turn timer
   */
  startTimer() {
    this.stopTimer(); // Clear any existing timer

    this.state.timerInterval = setInterval(() => {
      this.state.timerSeconds--;

      if (this.state.timerSeconds <= 0) {
        this.stopTimer();
        // Timer expired - this will be handled by the UI
      }

      this.notifyListeners();
    }, 1000);
  }

  /**
   * Stop the turn timer
   */
  stopTimer() {
    if (this.state.timerInterval) {
      clearInterval(this.state.timerInterval);
      this.state.timerInterval = null;
    }
  }

  /**
   * Reset timer to default value for next player
   */
  resetTimer() {
    this.stopTimer();
    this.state.timerSeconds = this.state.config?.timerSeconds || 60;
    this.notifyListeners();
  }

  /**
   * Check if the current round is complete
   * @returns {boolean} True if all cards have been guessed
   */
  isRoundComplete() {
    return this.state.guessedOnce.size === this.state.deck.length;
  }

  /**
   * Tally scores for the current round
   */
  tallyRound() {
    // Implementation placeholder
    console.log('GameStore.tallyRound called');
  }

  /**
   * Reset the game state
   */
  reset() {
    this.stopTimer(); // Make sure to stop any active timer

    this.state = {
      config: null,
      teams: [],
      playerOrder: [],
      deck: [],
      drawPile: [],
      discardPile: [],
      round: 1,
      teamOrder: [],
      currentTeamIndex: 0,
      turnActive: false,
      history: [],
      guessedOnce: new Set(),
      cardSelectionPhase: false,
      currentPlayerSelectionIndex: 0,
      currentPlayerCards: [],
      selectedCards: [],
      allShownCards: [],
      playerSelections: {},
      currentPlayerIndex: 0,
      currentCard: null,
      timerSeconds: 60,
      timerInterval: null,
      turnGuessedCards: [],
      turnSkippedCards: [],
      turnReshuffledCards: [],
      teamScores: [[], []], // Team scores by round
    };
    this.notifyListeners();
    console.log('GameStore.reset called');
  }

  /**
   * Get the current game state
   * @returns {GameState} The current state
   */
  getState() {
    return this.state;
  }

  /**
   * Subscribe to state changes
   * @param {Function} listener - Callback function to call on state changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of state changes
   * @private
   */
  notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('Error in state listener:', error);
      }
    });
  }
}

// Export singleton instance
const gameStore = new GameStore();
export default gameStore;
