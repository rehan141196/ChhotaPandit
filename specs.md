# Chhota Pandit – Web Application Specification

This document provides a comprehensive specification for implementing **Chhota Pandit**, a single-page, frontend-only web application party game inspired by Indian culture. The app is to be built with **vanilla HTML/CSS/JavaScript**, using **ES Modules**, **ESLint**, and **Vitest**. No build step is required.

---

## 1. General Requirements

- **Platform**: Single-page web app (SPA), no backend.
- **Frameworks/Libraries**: None (vanilla HTML/CSS/JS).
- **Module System**: ES Modules.
- **Linting**: ESLint with recommended rules.
- **Testing**: Vitest for unit testing.
- **Build Step**: None – code should run natively in the browser.
- **Design**: Minimal, responsive, accessible UI (WCAG-compliant practices).
- **Persistence**: No persistence required; refreshing/closing the tab resets the game.

---

## 2. Gameplay Flow

1. **Team Setup**
   - Prompt user to enter team names and the names of the players.
   - There must be exactly two teams and the player names are required
   - Teams must have **3–6 players each**.
   - Teams can be uneven but only by **1 player difference**.

2. **Player Order**
   - App randomizes order of players across both teams.
   - Order remains fixed for the entire game.

3. **Category Selection**
   - At game start, players choose which card categories to include.
   - Constraint: if insufficient cards exist to satisfy rules, block start and show error.

4. **Card Selection Phase**
   - Each player is dealt **16 cards without replacement**.
   - Must **keep 8** and **discard 8**.
   - Constraints per player’s batch:
     - At least 1 card from each chosen category.
     - At most 6 cards from a single category.
   - UI: simple flow (select → confirm → next player).

5. **Gameplay Rounds**
   - **Deck**: all kept cards form the final deck.
   - **Rounds**:
     - **Round 1**: Free-form hints.
     - **Round 2**: One-word hints.
     - **Round 3**: Actions only.
   - Each round uses the **entire original deck**.

6. **Turn Mechanics**
   - Each turn is **60 seconds** (fixed).
   - A player draws cards one by one:
     - **Correct guess** → mark as correct.
     - **Pass/illegal** → card reinserted randomly in deck.
   - **Timer expiration**:
     - Modal asks if last card was guessed (Yes → scored, No → returned).
   - Turns alternate between teams until all cards are guessed in the round.

7. **Scoring**
   - Each card has a point value (1–4).
   - Scores recorded **per turn**.
   - Tally occurs **at the end of each round** and there is also a live scoreboard
   - Scoreboard shows **round-by-round breakdown** and cumulative totals.

8. **Winning Condition**
   - After Round 3, team with the highest total score wins.

---

## 3. Data Structures

### 3.1 Card JSON Schema

```json
{
  "cards": [
    {
      "id": "uuid-or-increment",
      "title": "Card Title",
      "description": "Short descriptive text",
      "points": 3,
      "category": "Bollywood"
    }
  ]
}
```

- **title**: string, required.
- **description**: string, required.
- **points**: integer 1–4.
- **category**: string (placeholder categories acceptable initially).

### 3.2 In-Memory State

```js
{
  teams: [
    { name: "Team A", players: ["A1", "A2", "A3"], score: [0, 0, 0] },
    { name: "Team B", players: ["B1", "B2", "B3"], score: [0, 0, 0] }
  ],
  playerOrder: ["A1", "B1", "A2", "B2", ...],
  selectedCategories: ["Bollywood", "Sports"],
  deck: [ /* full selected cards */ ],
  currentRound: 1,
  currentTurn: { teamIndex: 0, player: "A1", remainingTime: 60 },
  roundScores: [ [0, 0], [0, 0], [0, 0] ] // team scores per round
}
```

---

## 4. Architecture

- **Entry Point**: `index.html` loading `app.js`.
- **Modules**:
  - `cards.js` – loads static JSON file.
  - `gameState.js` – manages game state.
  - `ui.js` – DOM manipulation helpers.
  - `timer.js` – countdown timer logic.
  - `score.js` – tallying and reporting scores.
  - `tests/` – Vitest test cases.

- **No build step**: JSON and JS modules should be directly importable in browser.

---

## 5. UI/UX Requirements

- **Responsive**: Works on mobile, tablet, desktop.
- **Accessibility**:
  - Semantic HTML (e.g., buttons for actions, headings for sections).
  - ARIA roles where necessary.
  - High-contrast default styles.
  - Keyboard navigation support.
- **Views**:
  - Team setup screen.
  - Category selection screen.
  - Card selection flow.
  - Gameplay screen (with timer, card, actions).
  - Scoreboard screen (round breakdown + total).
  - Modal for timer expiration decision.

---

## 6. Error Handling

- **Invalid Team Sizes**: Show error if teams <3 or >6 players, or uneven >1.
- **Card Supply Shortfall**: Show error explaining required vs available cards.
- **JSON Parsing Errors**: Fallback to empty card set with error message.
- **UI Validation**: Prevent advancing without completing required actions (e.g., selecting exactly 8 cards).
- **Timer Reliability**: Ensure modal blocks state progression until resolved.

---

## 7. Testing Plan

- **Unit Tests (Vitest)**
  - Random player order generation.
  - Card dealing constraints (≥1 per category, ≤6 per category, exactly 16 total).
  - Deck reinsert logic (random reinsertion after pass/illegal).
  - Timer countdown + expiration modal trigger.
  - Score recording per turn and tally per round.
  - Round progression flow (resetting deck per round).

- **Integration/UI Tests (where feasible)**
  - Team setup → category selection → card selection → gameplay flow.
  - Accessibility checks (tab navigation, ARIA roles).
  - Responsiveness (viewport resizing).

---

## 8. Future Enhancements (Not in MVP)

- Thematic styling (Indian motifs/colors).
- Export/import game state.
- In-app card editor.
- Forbidden words list per card.
- Configurable timer length.

---

## 9. Deliverables

- `index.html`
- `styles.css`
- `app.js` (main entry point)
- `cards.json` (static deck)
- `modules/` folder (organized JS modules)
- `tests/` folder (Vitest)
- `README.md` with setup instructions
- `specs.md` (this document)

---

**End of Specification**
