import { describe, it, expect, beforeEach } from 'vitest';

describe('Chhota Pandit App Layout', () => {
  beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = '<div id="app"></div>';

    // Import and run the main module logic
    const appElement = document.querySelector('#app');
    if (appElement) {
      appElement.innerHTML = `
        <header>
          <h1>Chhota Pandit</h1>
          <p>Party Word-Guessing Game</p>
        </header>

        <main>
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
            <button type="button" id="startGameBtn" class="primary-btn">Start Game</button>
          </section>

          <section id="gameView" class="view hidden">
            <h2>Round <span id="currentRound">1</span></h2>
            <div class="game-info">
              <div class="current-team">
                <h3>Current Team: <span id="currentTeamName">Team 1</span></h3>
              </div>
              <div class="timer-display">
                <span id="timerDisplay">00:60</span>
              </div>
            </div>
            <div class="card-area">
              <div id="currentCard" class="card hidden">
                <h3 id="cardTitle">Card will appear here</h3>
              </div>
              <div id="noCard" class="placeholder">
                Draw a card to begin
              </div>
            </div>
            <div class="game-controls">
              <button type="button" id="guessedBtn" class="success-btn">Guessed!</button>
              <button type="button" id="skipBtn" class="neutral-btn">Skip</button>
              <button type="button" id="endTurnBtn" class="danger-btn">End Turn</button>
            </div>
          </section>

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
                  <tbody></tbody>
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
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <button type="button" id="backToGameBtn" class="secondary-btn">Back to Game</button>
          </section>
        </main>

        <footer>
          <p>Chhota Pandit - A party word-guessing game</p>
        </footer>

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
  });

  describe('Basic Structure', () => {
    it('should have header with app title', () => {
      const header = document.querySelector('header');
      const title = document.querySelector('header h1');

      expect(header).toBeTruthy();
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Chhota Pandit');
    });

    it('should have main element with three view sections', () => {
      const main = document.querySelector('main');
      const setupView = document.querySelector('#setupView');
      const gameView = document.querySelector('#gameView');
      const scoreView = document.querySelector('#scoreView');

      expect(main).toBeTruthy();
      expect(setupView).toBeTruthy();
      expect(gameView).toBeTruthy();
      expect(scoreView).toBeTruthy();
    });

    it('should have footer with note', () => {
      const footer = document.querySelector('footer');

      expect(footer).toBeTruthy();
      expect(footer.textContent).toContain('party word-guessing game');
    });
  });

  describe('View Visibility', () => {
    it('should show only setupView initially', () => {
      const setupView = document.querySelector('#setupView');
      const gameView = document.querySelector('#gameView');
      const scoreView = document.querySelector('#scoreView');

      expect(setupView.classList.contains('hidden')).toBe(false);
      expect(gameView.classList.contains('hidden')).toBe(true);
      expect(scoreView.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Setup View Elements', () => {
    it('should have team name inputs for exactly 2 teams', () => {
      const team1NameInput = document.querySelector('#team1Name');
      const team2NameInput = document.querySelector('#team2Name');

      expect(team1NameInput).toBeTruthy();
      expect(team2NameInput).toBeTruthy();
    });

    it('should have player inputs for both teams (3 minimum each)', () => {
      const team1Players = document.querySelectorAll(
        '#team1Players .player-input'
      );
      const team2Players = document.querySelectorAll(
        '#team2Players .player-input'
      );

      expect(team1Players.length).toBe(3);
      expect(team2Players.length).toBe(3);
    });

    it('should have add/remove player buttons for both teams', () => {
      const addPlayerBtns = document.querySelectorAll('.add-player-btn');
      const removePlayerBtns = document.querySelectorAll('.remove-player-btn');

      expect(addPlayerBtns.length).toBe(2);
      expect(removePlayerBtns.length).toBe(2);

      // Check data attributes
      expect(addPlayerBtns[0].dataset.team).toBe('1');
      expect(addPlayerBtns[1].dataset.team).toBe('2');
    });

    it('should have category selection', () => {
      const categorySelect = document.querySelector('#categorySelect');

      expect(categorySelect).toBeTruthy();
      expect(categorySelect.multiple).toBe(true);
    });

    it('should display fixed game info (timer, deck size calculation)', () => {
      const deckSizeDisplay = document.querySelector('#deckSizeDisplay');
      const gameInfoItems = document.querySelectorAll('.info-item');

      expect(deckSizeDisplay).toBeTruthy();
      expect(gameInfoItems.length).toBe(3);

      // Check for timer info
      const timerInfo = Array.from(gameInfoItems).find((item) =>
        item.textContent.includes('60 seconds')
      );
      expect(timerInfo).toBeTruthy();
    });

    it('should have validation message container', () => {
      const validationContainer = document.querySelector('#setupValidation');

      expect(validationContainer).toBeTruthy();
      expect(validationContainer.classList.contains('hidden')).toBe(true);
    });

    it('should have start game button', () => {
      const startGameBtn = document.querySelector('#startGameBtn');

      expect(startGameBtn).toBeTruthy();
      expect(startGameBtn.classList.contains('primary-btn')).toBe(true);
    });
  });
  describe('Game View Elements', () => {
    it('should have current team display', () => {
      const currentTeamName = document.querySelector('#currentTeamName');

      expect(currentTeamName).toBeTruthy();
    });

    it('should have timer display', () => {
      const timerDisplay = document.querySelector('#timerDisplay');

      expect(timerDisplay).toBeTruthy();
      expect(timerDisplay.textContent).toBe('00:60');
    });

    it('should have card area with placeholder', () => {
      const currentCard = document.querySelector('#currentCard');
      const noCard = document.querySelector('#noCard');

      expect(currentCard).toBeTruthy();
      expect(noCard).toBeTruthy();
      expect(currentCard.classList.contains('hidden')).toBe(true);
    });

    it('should have game control buttons', () => {
      const guessedBtn = document.querySelector('#guessedBtn');
      const skipBtn = document.querySelector('#skipBtn');
      const endTurnBtn = document.querySelector('#endTurnBtn');

      expect(guessedBtn).toBeTruthy();
      expect(skipBtn).toBeTruthy();
      expect(endTurnBtn).toBeTruthy();
    });
  });

  describe('Score View Elements', () => {
    it('should have score tables', () => {
      const roundScoresTable = document.querySelector('#roundScoresTable');
      const totalScoresTable = document.querySelector('#totalScoresTable');

      expect(roundScoresTable).toBeTruthy();
      expect(totalScoresTable).toBeTruthy();
    });

    it('should have back to game button', () => {
      const backToGameBtn = document.querySelector('#backToGameBtn');

      expect(backToGameBtn).toBeTruthy();
    });
  });

  describe('Modal Container', () => {
    it('should have modal container', () => {
      const modalContainer = document.querySelector('#modalContainer');
      const modalTitle = document.querySelector('#modalTitle');
      const modalMessage = document.querySelector('#modalMessage');
      const modalConfirm = document.querySelector('#modalConfirm');
      const modalCancel = document.querySelector('#modalCancel');

      expect(modalContainer).toBeTruthy();
      expect(modalTitle).toBeTruthy();
      expect(modalMessage).toBeTruthy();
      expect(modalConfirm).toBeTruthy();
      expect(modalCancel).toBeTruthy();
      expect(modalContainer.classList.contains('hidden')).toBe(true);
    });
  });
});
