import './styles.css';
import gameStore from './store.js';
import { getCategories } from './cards.js';

// Initialize the Chhota Pandit app
let timerExpiredHandled = false; // Flag to prevent multiple timer expiration handling

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  if (app) {
    app.innerHTML = `
      <header>
        <h1>Chhota Pandit</h1>
        <p>Party Word-Guessing Game</p>
      </header>

      <main>
        <!-- Setup View -->
        <section id="setupView" class="view">
          <h2>Game Setup</h2>

          <div class="setup-section">
            <h3>Team 1</h3>
            <div class="team-config">
              <div class="team-name">
                <label for="team1Name">Team Name:</label>
                <input type="text" id="team1Name" placeholder="Enter team 1 name" required>
              </div>
              <div class="team-players">
                <label>Players (3-6 required):</label>
                <div id="team1Players">
                  <input type="text" placeholder="Player 1 name" class="player-input" required>
                  <input type="text" placeholder="Player 2 name" class="player-input" required>
                  <input type="text" placeholder="Player 3 name" class="player-input" required>
                </div>
                <div class="player-controls">
                  <button type="button" class="add-player-btn" data-team="1">Add Player</button>
                  <button type="button" class="remove-player-btn" data-team="1">Remove Player</button>
                </div>
              </div>
            </div>
          </div>

          <div class="setup-section">
            <h3>Team 2</h3>
            <div class="team-config">
              <div class="team-name">
                <label for="team2Name">Team Name:</label>
                <input type="text" id="team2Name" placeholder="Enter team 2 name" required>
              </div>
              <div class="team-players">
                <label>Players (3-6 required):</label>
                <div id="team2Players">
                  <input type="text" placeholder="Player 1 name" class="player-input" required>
                  <input type="text" placeholder="Player 2 name" class="player-input" required>
                  <input type="text" placeholder="Player 3 name" class="player-input" required>
                </div>
                <div class="player-controls">
                  <button type="button" class="add-player-btn" data-team="2">Add Player</button>
                  <button type="button" class="remove-player-btn" data-team="2">Remove Player</button>
                </div>
              </div>
            </div>
          </div>

          <div class="setup-section">
            <h3>Categories</h3>
            <select id="categorySelect" multiple size="6">
              <option value="placeholder">Loading categories...</option>
            </select>
            <small>Hold Ctrl/Cmd to select multiple categories</small>
          </div>

          <div class="setup-section">
            <h3>Game Info</h3>
            <div class="game-info-display">
              <div class="info-item">
                <strong>Timer:</strong> 60 seconds per turn
              </div>
              <div class="info-item">
                <strong>Deck Size:</strong> <span id="deckSizeDisplay">Calculated based on players</span>
              </div>
              <div class="info-item">
                <strong>Cards per Player:</strong> 16 dealt, keep 8
              </div>
            </div>
          </div>

          <div id="setupValidation" class="validation-message hidden"></div>

          <!-- Quick Test Button (for development) -->
          <div class="quick-test-section">
            <button type="button" id="quickTestBtn" class="secondary-btn">🚀 Quick Test (Skip to Gameplay)</button>
            <p style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">
              Creates default teams and automatically selects cards for quick testing
            </p>
          </div>

          <button type="button" id="startGameBtn" class="primary-btn">Start Game</button>
        </section>

        <!-- Card Selection View -->
        <section id="cardSelectionView" class="view hidden">
          <h2>Card Selection</h2>

          <div class="selection-info">
            <h3>Current Player: <span id="currentPlayerName">Player</span></h3>
            <p>Select <strong>8 cards</strong> from the 16 cards below to include in the game.</p>
            <div class="selection-progress">
              <span id="selectionCount">0</span> / 8 cards selected
            </div>
          </div>

          <div id="cardGrid" class="card-grid">
            <!-- Cards will be populated here -->
          </div>

          <div class="selection-controls">
            <button type="button" id="confirmSelectionBtn" class="primary-btn" disabled>
              Confirm Selection
            </button>
            <button type="button" id="clearSelectionBtn" class="secondary-btn">
              Clear Selection
            </button>
          </div>

          <div class="selection-status">
            <div id="playersCompleted"></div>
          </div>
        </section>

        <!-- Game View -->
        <section id="gameView" class="view hidden">
          <h2>Round <span id="currentRound">1</span></h2>

          <div class="game-info">
            <div class="current-player">
              <h3>Current Player: <span id="currentPlayerName">Player 1</span></h3>
              <div class="current-team">Team: <span id="currentTeamName">Team 1</span></div>
            </div>

            <div class="timer-display">
              <span id="timerDisplay">01:00</span>
            </div>
          </div>

          <!-- Pre-turn state -->
          <div id="preTurnState" class="pre-turn">
            <div class="turn-message">
              <h3>Ready to start your turn?</h3>
              <p>You have 60 seconds to get your team to guess as many cards as possible!</p>
            </div>
            <button type="button" id="startTurnBtn" class="primary-btn">Start Turn</button>
          </div>

          <!-- Active turn state -->
          <div id="activeTurnState" class="active-turn hidden">
            <div class="card-area">
              <div id="currentCardDisplay" class="card game-card">
                <div class="card-content">
                  <h3 id="cardTitle">Card will appear here</h3>
                  <div id="cardHints" class="card-hints"></div>
                  <div id="cardMeta" class="card-meta">
                    <span id="cardCategory" class="category"></span>
                    <span id="cardPoints" class="points"></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="game-controls">
              <button type="button" id="guessedBtn" class="success-btn" disabled>Guessed! ✓</button>
              <button type="button" id="skipBtn" class="neutral-btn" disabled>Skip</button>
            </div>

            <div class="turn-stats">
              <div class="stat">
                <span class="stat-label">Guessed:</span>
                <span id="guessedCount">0</span>
              </div>
              <div class="stat">
                <span class="stat-label">Skipped:</span>
                <span id="skippedCount">0</span>
              </div>
              <div class="stat">
                <span class="stat-label">Points this turn:</span>
                <span id="turnPoints">0</span>
              </div>
            </div>
          </div>

          <!-- Post-turn state -->
          <div id="postTurnState" class="post-turn hidden">
            <div class="turn-summary">
              <h3>Turn Complete!</h3>
              <div class="final-stats">
                <div>Cards guessed: <span id="finalGuessedCount">0</span></div>
                <div>Cards skipped: <span id="finalSkippedCount">0</span></div>
                <div>Points earned: <span id="finalTurnPoints">0</span></div>
              </div>
            </div>
            <button type="button" id="nextPlayerBtn" class="primary-btn">Next Player</button>
          </div>

          <!-- Live Scoreboard -->
          <div class="live-scoreboard">
            <h4>Live Scores</h4>
            <div id="liveScores" class="score-display">
              <!-- Dynamic score content -->
            </div>
          </div>

        </section>

        <!-- Score View -->
        <section id="scoreView" class="view hidden">
          <h2>Scoreboard</h2>

          <div class="score-tables">
            <div class="round-scores">
              <h3>Round Scores</h3>
              <table id="roundScoresTable">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Round 1</th>
                    <th>Round 2</th>
                    <th>Round 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Team 1</td>
                    <td>0</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Team 2</td>
                    <td>0</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="total-scores">
              <h3>Total Scores</h3>
              <table id="totalScoresTable">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Team 1</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Team 2</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button type="button" id="backToGameBtn" class="secondary-btn">Back to Game</button>
        </section>
      </main>

      <footer>
        <p>Chhota Pandit - A party word-guessing game</p>
      </footer>

      <!-- Modal Container -->
      <div id="modalContainer" class="modal hidden">
        <div class="modal-content">
          <h3 id="modalTitle">Modal Title</h3>
          <p id="modalMessage">Modal message content</p>
          <div class="modal-actions">
            <button type="button" id="modalConfirm" class="primary-btn">OK</button>
            <button type="button" id="modalCancel" class="secondary-btn">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }

  console.log('Chhota Pandit app initialized with layout');

  // Log initial GameStore state
  console.log('Initial GameStore state:', gameStore.getState());

  // Setup dynamic functionality
  setupTeamManagement();
  updateDeckSizeDisplay();
  setupGameControls();
  populateCategories();
  setupCardSelectionControls();

  // Subscribe to game state changes
  gameStore.subscribe((state) => {
    // Update game view if it's visible
    const gameView = document.querySelector('#gameView');
    if (gameView && !gameView.classList.contains('hidden')) {
      updateGameView();

      // Handle timer expiration (only once)
      if (state.turnActive && state.timerSeconds === 0 && !timerExpiredHandled) {
        timerExpiredHandled = true;
        handleTimerExpired();
      }

      // Reset flag when turn becomes inactive
      if (!state.turnActive) {
        timerExpiredHandled = false;
      }
    }
  });
});

function setupTeamManagement() {
  // Add player button functionality
  document.querySelectorAll('.add-player-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const teamNumber = e.target.dataset.team;
      addPlayer(teamNumber);
    });
  });

  // Remove player button functionality
  document.querySelectorAll('.remove-player-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const teamNumber = e.target.dataset.team;
      removePlayer(teamNumber);
    });
  });

  // Update deck size when player inputs change
  document.addEventListener('input', (e) => {
    if (e.target.classList.contains('player-input')) {
      updateDeckSizeDisplay();
    }
  });
}

function addPlayer(teamNumber) {
  const playersContainer = document.querySelector(`#team${teamNumber}Players`);
  const currentPlayers = playersContainer.querySelectorAll('.player-input');

  if (currentPlayers.length < 6) {
    const newPlayerInput = document.createElement('input');
    newPlayerInput.type = 'text';
    newPlayerInput.placeholder = `Player ${currentPlayers.length + 1} name`;
    newPlayerInput.className = 'player-input';
    newPlayerInput.required = true;

    playersContainer.appendChild(newPlayerInput);
    updateDeckSizeDisplay();
  }
}

function removePlayer(teamNumber) {
  const playersContainer = document.querySelector(`#team${teamNumber}Players`);
  const currentPlayers = playersContainer.querySelectorAll('.player-input');

  if (currentPlayers.length > 3) {
    playersContainer.removeChild(currentPlayers[currentPlayers.length - 1]);
    updateDeckSizeDisplay();
  }
}

function updateDeckSizeDisplay() {
  const team1Players = document.querySelectorAll(
    '#team1Players .player-input'
  ).length;
  const team2Players = document.querySelectorAll(
    '#team2Players .player-input'
  ).length;
  const totalPlayers = team1Players + team2Players;
  const deckSize = totalPlayers * 8; // Each player keeps 8 cards

  const deckSizeDisplay = document.querySelector('#deckSizeDisplay');
  if (deckSizeDisplay) {
    deckSizeDisplay.textContent = `${deckSize} cards (${totalPlayers} players × 8 cards each)`;
  }

  // Validate team size difference
  const validation = document.querySelector('#setupValidation');
  const teamDiff = Math.abs(team1Players - team2Players);

  if (teamDiff > 1) {
    validation.textContent = `Team sizes must be within 1 player of each other. Current: Team 1 (${team1Players}), Team 2 (${team2Players})`;
    validation.classList.remove('hidden');
    validation.classList.add('error');
  } else {
    validation.classList.add('hidden');
    validation.classList.remove('error');
  }
}

function setupGameControls() {
  const startGameBtn = document.querySelector('#startGameBtn');
  const quickTestBtn = document.querySelector('#quickTestBtn');
  const startTurnBtn = document.querySelector('#startTurnBtn');
  const guessedBtn = document.querySelector('#guessedBtn');
  const skipBtn = document.querySelector('#skipBtn');
  const nextPlayerBtn = document.querySelector('#nextPlayerBtn');

  if (startGameBtn) {
    startGameBtn.addEventListener('click', handleStartGame);
  }

  if (quickTestBtn) {
    quickTestBtn.addEventListener('click', handleQuickTest);
  }

  if (startTurnBtn) {
    startTurnBtn.addEventListener('click', handleStartTurn);
  }

  if (guessedBtn) {
    guessedBtn.addEventListener('click', handleGuessedCard);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', handleSkipCard);
  }

  if (nextPlayerBtn) {
    nextPlayerBtn.addEventListener('click', handleNextPlayer);
  }
}

function handleStartTurn() {
  try {
    gameStore.startTurn();
  } catch (error) {
    console.error('Error starting turn:', error);
    alert(error.message);
  }
}

function handleGuessedCard() {
  try {
    gameStore.guessCurrent();
  } catch (error) {
    console.error('Error marking card as guessed:', error);
    alert(error.message);
  }
}

function handleSkipCard() {
  try {
    gameStore.skipCurrent();
  } catch (error) {
    console.error('Error skipping card:', error);
    alert(error.message);
  }
}

function handleNextPlayer() {
  try {
    const state = gameStore.getState();

    // If turn is still active, end it first
    if (state.turnActive) {
      gameStore.endTurn();
    }

    // Reset timer for next player
    gameStore.resetTimer();

    // Check if round is complete
    const newState = gameStore.getState();
    if (gameStore.isRoundComplete()) {
      // Show round completion message or move to next round
      alert(`Round ${newState.round} complete! All cards have been guessed.`);

      if (newState.round < 3) {
        // TODO: Move to next round or show scoreboard
        alert('Round complete! Moving to next round...');
      } else {
        // Game complete
        alert('Game complete! Final scores...');
      }
    } else {
      // Update the view to show the next player's pre-turn state
      updateGameView();
    }
  } catch (error) {
    console.error('Error handling next player:', error);
    alert(error.message);
  }
}

function handleTimerExpired() {
  const state = gameStore.getState();

  // Ensure we only handle timer expiration once
  if (!state.turnActive) {
    return; // Turn already ended
  }

  console.log('Timer expired - handling last card');

  // If there's a current card, ask the player if it was guessed
  if (state.currentCard) {
    const wasGuessed = confirm(
      `Time's up! Was the last card "${state.currentCard.title}" guessed correctly?\n\nClick OK if YES, Cancel if NO.`
    );

    if (wasGuessed) {
      gameStore.guessCurrent();
    } else {
      gameStore.skipCurrent();
    }
  }

  // End the turn immediately after handling the last card
  gameStore.endTurn();

  console.log('Turn ended due to timer expiration');
}

function handleStartGame() {
  // Validate setup
  const validation = validateGameSetup();
  const validationContainer = document.querySelector('#setupValidation');

  if (!validation.isValid) {
    validationContainer.textContent = validation.message;
    validationContainer.classList.remove('hidden');
    validationContainer.classList.add('error');
    return;
  }

  // Clear validation
  validationContainer.classList.add('hidden');
  validationContainer.classList.remove('error');

  // Get team and player data
  const teams = collectTeamData();

  // Get selected categories
  const selectedCategories = getSelectedCategories();
  if (selectedCategories.length === 0) {
    validationContainer.textContent = 'Please select at least one category.';
    validationContainer.classList.remove('hidden');
    validationContainer.classList.add('error');
    return;
  }

  // Configure the game store
  const config = {
    teamNames: teams.map((team) => team.name),
    teams: teams, // Pass the full team objects
    categories: selectedCategories,
    deckSize: teams.flatMap((team) => team.players).length * 8,
    timerSeconds: 60,
  };

  gameStore.configure(config);

  // Build deck and handle potential errors
  try {
    gameStore.buildDeck();
  } catch (error) {
    validationContainer.textContent = error.message;
    validationContainer.classList.remove('hidden');
    validationContainer.classList.add('error');
    return;
  }

  // Generate randomized player order
  gameStore.generatePlayerOrder();

  console.log(
    'Game started with player order:',
    gameStore.getState().playerOrder
  );

  // Start card selection phase instead of going directly to game
  gameStore.startCardSelection();

  // Switch to card selection view
  document.querySelector('#setupView').classList.add('hidden');
  document.querySelector('#cardSelectionView').classList.remove('hidden');

  // Update card selection view
  updateCardSelectionView();
}

function validateGameSetup() {
  // Check team names
  const team1Name = document.querySelector('#team1Name').value.trim();
  const team2Name = document.querySelector('#team2Name').value.trim();

  if (!team1Name || !team2Name) {
    return { isValid: false, message: 'Both team names are required.' };
  }

  // Check player names
  const team1Players = Array.from(
    document.querySelectorAll('#team1Players .player-input')
  )
    .map((input) => input.value.trim())
    .filter((name) => name !== '');

  const team2Players = Array.from(
    document.querySelectorAll('#team2Players .player-input')
  )
    .map((input) => input.value.trim())
    .filter((name) => name !== '');

  if (team1Players.length < 3 || team2Players.length < 3) {
    return {
      isValid: false,
      message: 'Each team must have at least 3 players.',
    };
  }

  if (team1Players.length > 6 || team2Players.length > 6) {
    return { isValid: false, message: 'Each team can have at most 6 players.' };
  }

  const teamDiff = Math.abs(team1Players.length - team2Players.length);
  if (teamDiff > 1) {
    return {
      isValid: false,
      message: 'Team sizes must be within 1 player of each other.',
    };
  }

  // Check for duplicate player names
  const allPlayers = [...team1Players, ...team2Players];
  const uniquePlayers = new Set(allPlayers);
  if (allPlayers.length !== uniquePlayers.size) {
    return { isValid: false, message: 'All player names must be unique.' };
  }

  return { isValid: true };
}

function collectTeamData() {
  const team1Name = document.querySelector('#team1Name').value.trim();
  const team2Name = document.querySelector('#team2Name').value.trim();

  const team1Players = Array.from(
    document.querySelectorAll('#team1Players .player-input')
  )
    .map((input) => input.value.trim())
    .filter((name) => name !== '');

  const team2Players = Array.from(
    document.querySelectorAll('#team2Players .player-input')
  )
    .map((input) => input.value.trim())
    .filter((name) => name !== '');

  return [
    { id: 'team1', name: team1Name, players: team1Players },
    { id: 'team2', name: team2Name, players: team2Players },
  ];
}

function updateGameViewWithPlayerOrder() {
  const state = gameStore.getState();

  // Initialize Round 1 if we just finished card selection
  if (!state.turnActive && state.round === 1 && state.drawPile.length === 0) {
    gameStore.startRound(1);
  }

  updateGameView();
}

function updateGameView() {
  const state = gameStore.getState();

  // Update round number
  const currentRoundEl = document.querySelector('#currentRound');
  if (currentRoundEl) {
    currentRoundEl.textContent = state.round;
  }

  // Update current player info
  const currentPlayerName = state.playerOrder[state.currentPlayerIndex];
  const currentTeam = gameStore.getTeamForPlayer(currentPlayerName);

  // Update all current player name elements (there might be multiple)
  const currentPlayerNameEls = document.querySelectorAll('#currentPlayerName');
  currentPlayerNameEls.forEach(el => {
    if (el) {
      el.textContent = currentPlayerName;
    }
  });

  const currentTeamNameEl = document.querySelector('#currentTeamName');
  if (currentTeamNameEl) {
    currentTeamNameEl.textContent = currentTeam ? currentTeam.name : 'Unknown';
  }

  // Update timer display
  updateTimerDisplay();

  // Update game state visibility
  updateGameStateVisibility();

  // Update current card display
  updateCurrentCardDisplay();

  // Update turn stats
  updateTurnStats();

  // Update live scoreboard
  updateLiveScoreboard();
}

function updateTimerDisplay() {
  const state = gameStore.getState();
  const timerDisplay = document.querySelector('#timerDisplay');

  if (timerDisplay) {
    const minutes = Math.floor(state.timerSeconds / 60);
    const seconds = state.timerSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Add warning class when time is running low
    if (state.timerSeconds <= 10 && state.turnActive) {
      timerDisplay.classList.add('warning');
    } else {
      timerDisplay.classList.remove('warning');
    }
  }
}

function updateGameStateVisibility() {
  const state = gameStore.getState();

  const preTurnState = document.querySelector('#preTurnState');
  const activeTurnState = document.querySelector('#activeTurnState');
  const postTurnState = document.querySelector('#postTurnState');

  // Hide all states first
  preTurnState?.classList.add('hidden');
  activeTurnState?.classList.add('hidden');
  postTurnState?.classList.add('hidden');

  if (!state.turnActive && state.timerSeconds > 0) {
    // Pre-turn state: waiting for player to start turn
    preTurnState?.classList.remove('hidden');
  } else if (state.turnActive) {
    // Active turn state: timer running, showing cards
    activeTurnState?.classList.remove('hidden');

    // Enable/disable action buttons based on whether there's a card
    const guessedBtn = document.querySelector('#guessedBtn');
    const skipBtn = document.querySelector('#skipBtn');

    if (guessedBtn && skipBtn) {
      const hasCard = state.currentCard !== null;
      guessedBtn.disabled = !hasCard;
      skipBtn.disabled = !hasCard;
    }
  } else if (state.timerSeconds === 0) {
    // Post-turn state: timer expired, show summary
    postTurnState?.classList.remove('hidden');
    updatePostTurnSummary();
  }
}

function updateCurrentCardDisplay() {
  const state = gameStore.getState();
  const card = state.currentCard;

  const cardTitle = document.querySelector('#cardTitle');
  const cardHints = document.querySelector('#cardHints');
  const cardCategory = document.querySelector('#cardCategory');
  const cardPoints = document.querySelector('#cardPoints');

  if (card) {
    if (cardTitle) cardTitle.textContent = card.title;
    if (cardHints) cardHints.textContent = card.hints || '';
    if (cardCategory) cardCategory.textContent = card.category;
    if (cardPoints) cardPoints.textContent = `${card.points} pts`;
  } else {
    if (cardTitle) cardTitle.textContent = 'No more cards';
    if (cardHints) cardHints.textContent = '';
    if (cardCategory) cardCategory.textContent = '';
    if (cardPoints) cardPoints.textContent = '';
  }
}

function updateTurnStats() {
  const state = gameStore.getState();

  const guessedCount = document.querySelector('#guessedCount');
  const skippedCount = document.querySelector('#skippedCount');
  const turnPoints = document.querySelector('#turnPoints');

  if (guessedCount) {
    guessedCount.textContent = state.turnGuessedCards.length;
  }
  if (skippedCount) {
    skippedCount.textContent = state.turnSkippedCards.length;
  }
  if (turnPoints) {
    const points = state.turnGuessedCards.reduce((sum, card) => sum + card.points, 0);
    turnPoints.textContent = points;
  }
}

function updatePostTurnSummary() {
  const state = gameStore.getState();

  const finalGuessedCount = document.querySelector('#finalGuessedCount');
  const finalSkippedCount = document.querySelector('#finalSkippedCount');
  const finalTurnPoints = document.querySelector('#finalTurnPoints');

  // Use lastTurnSummary if available, otherwise fall back to current turn data
  const summary = state.lastTurnSummary;

  if (summary) {
    if (finalGuessedCount) {
      finalGuessedCount.textContent = summary.guessedCount;
    }
    if (finalSkippedCount) {
      finalSkippedCount.textContent = summary.skippedCount;
    }
    if (finalTurnPoints) {
      finalTurnPoints.textContent = summary.points;
    }
  } else {
    // Fallback to current turn data (shouldn't happen after endTurn is called)
    if (finalGuessedCount) {
      finalGuessedCount.textContent = state.turnGuessedCards.length;
    }
    if (finalSkippedCount) {
      finalSkippedCount.textContent = state.turnSkippedCards.length;
    }
    if (finalTurnPoints) {
      const points = state.turnGuessedCards.reduce((sum, card) => sum + card.points, 0);
      finalTurnPoints.textContent = points;
    }
  }
}

function updateLiveScoreboard() {
  const state = gameStore.getState();
  const liveScores = document.querySelector('#liveScores');

  if (!liveScores || !state.teams.length) return;

  const scoresHTML = state.teams.map((team, teamIndex) => {
    const roundScores = state.teamScores[teamIndex] || [];
    const currentRoundScore = roundScores[state.round - 1] || 0;
    const totalScore = roundScores.reduce((sum, score) => sum + (score || 0), 0);

    return `
      <div class="team-score">
        <div class="team-name">${team.name}</div>
        <div class="score-details">
          <span class="round-score">Round ${state.round}: ${currentRoundScore}</span>
          <span class="total-score">Total: ${totalScore}</span>
        </div>
      </div>
    `;
  }).join('');

  liveScores.innerHTML = scoresHTML;
}

function populateCategories() {
  const categorySelect = document.querySelector('#categorySelect');
  if (categorySelect) {
    const categories = getCategories();

    // Clear existing options
    categorySelect.innerHTML = '';

    // Add category options
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    console.log('Categories populated:', categories);
  }
}

function getSelectedCategories() {
  const categorySelect = document.querySelector('#categorySelect');
  if (!categorySelect) return [];

  return Array.from(categorySelect.selectedOptions).map(option => option.value);
}

// Card Selection Functions
function updateCardSelectionView() {
  const state = gameStore.getState();

  // Update current player name
  const currentPlayerName = document.querySelector('#currentPlayerName');
  if (currentPlayerName) {
    currentPlayerName.textContent = state.playerOrder[state.currentPlayerSelectionIndex];
  }

  // Update selection progress
  updateSelectionProgress();

  // Render cards
  renderCardSelection(state.currentPlayerCards);

  // Update players completed status
  updatePlayersCompletedStatus();

  console.log(`Card selection view updated for: ${state.playerOrder[state.currentPlayerSelectionIndex]}`);
}

function renderCardSelection(cards) {
  const cardGrid = document.querySelector('#cardGrid');
  if (!cardGrid) return;

  cardGrid.innerHTML = '';

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'selection-card';
    cardElement.dataset.cardId = card.id;

    cardElement.innerHTML = `
      <div class="card-content">
        <h4>${card.title}</h4>
        ${card.hints ? `<div class="card-hints">${card.hints}</div>` : ''}
        <div class="card-meta">
          <span class="category">${card.category}</span>
          <span class="points">${card.points} pts</span>
        </div>
      </div>
      <div class="card-selection-indicator"></div>
    `;

    cardElement.addEventListener('click', () => toggleCardSelection(card.id));
    cardGrid.appendChild(cardElement);
  });
}

const selectedCardIds = new Set();

function toggleCardSelection(cardId) {
  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
  if (!cardElement) return;

  if (selectedCardIds.has(cardId)) {
    // Deselect
    selectedCardIds.delete(cardId);
    cardElement.classList.remove('selected');
  } else {
    // Select (if not at limit)
    if (selectedCardIds.size < 8) {
      selectedCardIds.add(cardId);
      cardElement.classList.add('selected');
    }
  }

  updateSelectionProgress();
  updateConfirmButton();
}

function updateSelectionProgress() {
  const selectionCount = document.querySelector('#selectionCount');
  if (selectionCount) {
    selectionCount.textContent = selectedCardIds.size;
  }
}

function updateConfirmButton() {
  const confirmBtn = document.querySelector('#confirmSelectionBtn');
  if (confirmBtn) {
    confirmBtn.disabled = selectedCardIds.size !== 8;
  }
}

function updatePlayersCompletedStatus() {
  const state = gameStore.getState();
  const statusContainer = document.querySelector('#playersCompleted');
  if (!statusContainer) return;

  const completed = Object.keys(state.playerSelections).length;
  const total = state.playerOrder.length;

  statusContainer.innerHTML = `
    <h4>Progress: ${completed}/${total} players completed</h4>
    ${Object.keys(state.playerSelections).map(player =>
      `<div class="completed-player">✓ ${player}</div>`
    ).join('')}
  `;
}

function handleConfirmSelection() {
  const state = gameStore.getState();
  const selectedCards = state.currentPlayerCards.filter(card =>
    selectedCardIds.has(card.id)
  );

  try {
    gameStore.selectCards(selectedCards);

    // Clear selection for next player
    selectedCardIds.clear();

    // Check if card selection is complete
    const newState = gameStore.getState();
    if (!newState.cardSelectionPhase) {
      // Move to game view
      document.querySelector('#cardSelectionView').classList.add('hidden');
      document.querySelector('#gameView').classList.remove('hidden');
      updateGameViewWithPlayerOrder();
    } else {
      // Update view for next player
      updateCardSelectionView();
    }
  } catch (error) {
    console.error('Error confirming selection:', error);
    alert(error.message);
  }
}

function handleClearSelection() {
  // Clear all selections
  selectedCardIds.clear();

  // Update UI
  document.querySelectorAll('.selection-card.selected').forEach(card => {
    card.classList.remove('selected');
  });

  updateSelectionProgress();
  updateConfirmButton();
}

function setupCardSelectionControls() {
  const confirmBtn = document.querySelector('#confirmSelectionBtn');
  const clearBtn = document.querySelector('#clearSelectionBtn');

  if (confirmBtn) {
    confirmBtn.addEventListener('click', handleConfirmSelection);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', handleClearSelection);
  }
}

function handleQuickTest() {
  console.log('Quick test mode activated!');

  // Set up default teams
  document.querySelector('#team1Name').value = 'Team A';
  document.querySelector('#team2Name').value = 'Team B';

  // Set up default players
  const team1Players = document.querySelectorAll('#team1Players .player-input');
  const team2Players = document.querySelectorAll('#team2Players .player-input');

  if (team1Players.length >= 3) {
    team1Players[0].value = 'P1';
    team1Players[1].value = 'P2';
    team1Players[2].value = 'P3';
  }

  if (team2Players.length >= 3) {
    team2Players[0].value = 'P4';
    team2Players[1].value = 'P5';
    team2Players[2].value = 'P6';
  }

  // Select all categories from the select element
  const categorySelect = document.querySelector('#categorySelect');
  if (categorySelect) {
    // Select all options
    for (let i = 0; i < categorySelect.options.length; i++) {
      categorySelect.options[i].selected = true;
    }
  }

  // Get selected categories
  const selectedCategories = getSelectedCategories();

  if (selectedCategories.length === 0) {
    alert('No categories available for quick test');
    return;
  }

  // Configure game store
  const config = {
    teamNames: ['Team A', 'Team B'],
    teams: [
      { id: 'team1', name: 'Team A', players: ['P1', 'P2', 'P3'] },
      { id: 'team2', name: 'Team B', players: ['P4', 'P5', 'P6'] }
    ],
    categories: selectedCategories,
    deckSize: 48,
    timerSeconds: 60,
  };

  try {
    gameStore.configure(config);
    gameStore.generatePlayerOrder();
    gameStore.buildDeck();

    // Start card selection phase
    gameStore.startCardSelection();

    // Auto-select cards for all players
    const state = gameStore.getState();
    state.playerOrder.forEach(() => {
      // Get 16 cards for this player (update the state to get fresh cards)
      const currentState = gameStore.getState();
      const playerCards = currentState.currentPlayerCards;

      // Auto-select first 8 cards
      const selectedCards = playerCards.slice(0, 8);
      gameStore.selectCards(selectedCards);
    });

    // At this point card selection should be complete
    // Switch directly to game view
    document.querySelector('#setupView').classList.add('hidden');
    document.querySelector('#cardSelectionView').classList.add('hidden');
    document.querySelector('#gameView').classList.remove('hidden');

    // Start Round 1
    gameStore.startRound(1);
    updateGameView();

    console.log('Quick test setup complete - jumped straight to gameplay!');
  } catch (error) {
    console.error('Quick test setup failed:', error);
    alert(`Quick test setup failed: ${error.message}`);
  }
}
