# Chhota Pandit — Implementation Blueprint & Prompt Plan

> **Purpose**: Provide a precise, step‑by‑step implementation plan for the “Chhota Pandit” party game web app, and a sequence of code‑generation prompts that build the product incrementally with best practices.  
> **Output**: Copy/paste the prompts (each in a `text` code block) into your code‑generation LLM in order. After each prompt’s work is done, **run linting and tests**.

---

## 0) Context & Non‑Goals (from the specs)

This plan reflects the specs you provided. Highlights we will implement:

- Cards are drawn **without replacement** from a **global pool**; enforce a **loose mix** across categories:
  - **At least 1** card from each **chosen** category.
  - **At most 6** cards from a single category within a selected deck.
- Use the **entire originally selected deck** across rounds (do not remove cards once guessed). Round 1 continues until **all** cards are guessed.
- **Record results per turn** and **tally only at end of each round**, showing a **breakdown**.
- **Fixed timer** per turn, with a **timer modal** as described in the spec.
- **Randomize** starting team; **no penalty** for pass (players police rules; the app doesn’t enforce penalties).
- Simple, minimal UI. **No theming** required now. **No export/import**; state can be lost when tab closes (no persistence beyond page lifetime).
- “**Option A**” path chosen where a decision was forked in the brainstorming (we’ll encode this as the default ruleset).

**Non-goals now**: authentication, backend, networked multiplayer, save/restore, export/import, accessibility polish beyond basic standards, mobile PWA install.

---

## 1) Technical Approach

**Stack**: Pure HTML/CSS/JS (ES modules), no framework. Use Node tooling for dev quality: **Vite** for local dev server & bundling, **ESLint** + **Prettier** for lint/format, **Vitest** + **@testing-library/dom** for unit/integration tests, and **Playwright** (optional, later step) for one smoke E2E. Everything deploys as static files.

**Structure**:
```
/ (repo root)
  index.html
  /src
    main.js                # app entry
    /ui                    # DOM rendering helpers
      dom.js, views/*
    /state                 # game state & reducers (no persistence)
      gameState.js, actions.js
    /logic                 # pure utilities
      deck.js, random.js, timer.js, scoring.js, categories.js, rules.js
    /styles
      base.css, components.css
  /tests                   # vitest
    unit/*  integration/*
  /public                  # static assets if needed
  .eslintrc.cjs  .prettierrc  vite.config.js  package.json
```

**Key modules**:
- `logic/deck.js`: build deck from pool with constraints (min 1 per chosen category, max 6 per category), draw w/o replacement.
- `logic/rules.js`: exports constants & helpers for “Option A” rules (round order, turn length in seconds, pass behavior).
- `state/gameState.js`: a single source of truth object + pure reducers (start game, start round, start turn, mark correct/pass, end turn, next team, end round, etc.).
- `logic/timer.js`: simple countdown with callbacks for tick/expire; uses `document.visibilityState` handling.
- `logic/scoring.js`: per‑turn results accumulation, end‑round tally with breakdown per team.
- `ui/views/*`: small view modules for Setup screen, Game screen (current card + timer + controls), Round Summary modal, Scoreboard header, etc.
- `ui/dom.js`: element helpers (create, mount, on, etc.).

**Error handling & guardrails**:
- Defensive checks for invalid setup (e.g., zero categories selected) with inline guidance.
- Timer is authoritative; disabling the pass/confirm buttons on timeout until next turn is initialized.
- The app does **not** police rule infractions (per spec), but validates obvious UI invariants (e.g., cannot “Correct” if no active card).

**Testing strategy**:
- **Unit**: deck constraints, random selection reproducibility with seeded RNG, timer behaviors, reducers for state transitions, scoring tally.
- **Integration (DOM)**: render Setup → start Game; simulate turns; verify round summary breakdown.
- **(Optional) E2E**: a light Playwright smoke test for a happy path (later milestone).

---

## 2) Roadmap — Iterative, Right‑Sized Increments

We break work into **milestones**, each decomposed into **small steps**. Each step adds visible value and keeps the system working.

### Milestone A — Tooling & Scaffolding
A1. Initialize repo, Node tooling scripts, Vite.  
A2. ESLint + Prettier config & scripts; CI-ready defaults.  
A3. Vitest setup with a first trivial test to verify wiring.  
A4. DOM helpers and base CSS; a very simple “Hello App” render.

### Milestone B — Core Data & Rules
B1. Categories and base card pool structure (placeholder data).  
B2. Deck builder with constraints (min 1 per chosen category; max 6 per category; no replacement).  
B3. Seeded RNG utilities to make tests deterministic.  
B4. Rules module (Option A constants): round list, seconds per turn, pass behavior flags.

### Milestone C — State Machine
C1. Game state shape & reducers: setup → lobby (ready).  
C2. Start game: compute deck from setup; randomize starting team.  
C3. Turn lifecycle: start turn → get next card → mark correct/pass → advance.  
C4. End turn (timer/dialog) → next team; stop when round complete.  
C5. End round tally & breakdown view (but minimal UI).

### Milestone D — UI Screens
D1. Setup screen: select categories, set deck size, enter teams & players.  
D2. Game screen: scoreboard header, timer, current card, pass/correct actions.  
D3. End‑of‑turn timer modal.  
D4. Round summary modal with per‑team breakdown and “Continue” to next round.  
D5. End‑of‑game summary and “New Game” reset.

### Milestone E — Quality & Polish
E1. Edge‑case handling and validation messages on setup.  
E2. Keyboard shortcuts (space=correct, shift+space=pass).  
E3. Simple animations/transitions (CSS only).  
E4. Accessibility pass on buttons and focus management.  
E5. Optional: one Playwright smoke test for happy path.

---

## 3) Micro‑Steps (Double‑Split for Right Sizing)

Below, each milestone’s steps are split again into **very small** tasks. No step assumes unimplemented pieces. Each ends by wiring into the app and verifying with tests.

### Milestone A — Tooling & Scaffolding

- **A1.1**: `npm init -y`, add `vite`, `rimraf`, basic `"dev"`, `"build"`, `"preview"` scripts. Create `index.html`, `src/main.js`, `src/styles/base.css`.
- **A1.2**: Basic Vite config, ensure `npm run dev` serves `index.html` and loads `main.js`.
- **A2.1**: Add `eslint` + `@eslint/js` + `eslint-plugin-import`; create `.eslintrc.cjs` (ES modules), add `"lint"` script.
- **A2.2**: Add `prettier` with `.prettierrc`; add `"format"` and `"format:check"` scripts.
- **A3.1**: Add `vitest` + `@testing-library/dom` + `jsdom`; configure `vitest` in `package.json`; add a trivial unit test `tests/unit/smoke.test.js`.
- **A3.2**: Add `"test"` and `"test:watch"` scripts; ensure tests run.
- **A4.1**: Create `src/ui/dom.js` helper with `el`, `on`, `mount` functions. Import in `main.js` to render “Hello App” `<div>`; import base CSS. Add a tiny DOM integration test ensuring the root renders.

### Milestone B — Core Data & Rules

- **B1.1**: `logic/categories.js` export example categories; add 12–24 placeholder cards with category tags.
- **B1.2**: A schema for a `Card` `{ id, text, category }`; unit test for shape.
- **B2.1**: `logic/deck.js` implement `buildDeck(pool, chosenCategories, totalCount, constraints)` that enforces min 1 per chosen cat and max 6/cat.
- **B2.2**: Add tests covering: (a) chosen categories satisfied; (b) per‑category cap respected; (c) no duplicates (no replacement).
- **B3.1**: `logic/random.js` export `makeRNG(seed)` and `shuffle(rng, array)`; unit tests for deterministic shuffles.
- **B3.2**: Update `deck.js` to accept `rng` for deterministic selection; adjust tests to inject seed.
- **B4.1**: `logic/rules.js` export constants per spec: `{ ROUND_ORDER, TURN_SECONDS, PASS_PENALTY=false, ... }` and a `getNextRound(current)` helper.
- **B4.2**: Unit tests for `rules.js` behaviors.

### Milestone C — State Machine

- **C1.1**: Define `state/gameState.js`: initial state shape (setup data, deck, roundIndex, activeTeamIndex, turn, scores, history).
- **C1.2**: Export pure reducer functions: `setSetup`, `startGame`, `startRound`, `startTurn`, `markCorrect`, `markPass`, `endTurn`, `endRound`, `resetGame`.
- **C1.3**: Unit tests exercising each reducer; ensure immutability and expected transitions.
- **C2.1**: `startGame` computes deck with `buildDeck(...)` and seeds RNG; `activeTeamIndex` randomized.
- **C2.2**: Unit tests verifying randomization (with seeded RNG) and deck computed once for entire game.
- **C3.1**: Implement `nextCard()` logic retrieving from undealt list per round (no replacement across the whole deck; the round shows the same deck in different constraints).
- **C3.2**: Reducer updates for `markCorrect` and `markPass` (record per‑turn results); unit tests.
- **C4.1**: End turn when out of time or when deck guessed in this round; reducer to rotate team.
- **C4.2**: Integration test simulating a minimal round across two teams.
- **C5.1**: `logic/scoring.js` to compute end‑round breakdown; unit tests.
- **C5.2**: Reducer `endRound` calls scoring and stores the breakdown.

### Milestone D — UI Screens

- **D1.1**: Setup view (`ui/views/setupView.js`): category checkboxes, deck size input, team names/players. Wire to `setSetup`.
- **D1.2**: Validation: must select at least one category and deck size ≥ number of chosen categories; show inline hints.
- **D2.1**: Game view (`ui/views/gameView.js`): scoreboard (teams & scores), current round label, card text, **Correct** and **Pass** buttons. Wire to reducers.
- **D2.2**: Keyboard shortcuts and basic focus management.
- **D3.1**: Timer: `logic/timer.js` with `startCountdown(seconds, {onTick, onExpire})`. Show **timer modal** on expire; disable actions until next turn.
- **D3.2**: Integration test: timer expire triggers `endTurn`.
- **D4.1**: Round summary modal: show per‑team breakdown from state; “Continue” begins next round.
- **D4.2**: Integration test: finishing a round shows summary; clicking continue advances round.
- **D5.1**: End‑of‑game summary view & “New Game” button calling `resetGame`.
- **D5.2**: Integration test: end‑of‑game flow.

### Milestone E — Quality & Polish

- **E1.1**: Edge cases (tiny decks, 1 team per spec if allowed); ensure UI disables impossible actions.
- **E2.1**: CSS transitions for timer and card flip; keep minimal.
- **E3.1**: Accessibility labels & ARIA where appropriate; focus trap for modals.
- **E4.1**: Optional Playwright smoke: happy path—setup → one turn → round summary → end game.

---

## 4) Prompts for a Code‑Generation LLM

> Paste these **in order**. Each prompt ends with verification instructions: **run lint and tests**.

### Prompt A1 — Initialize project

```text
You are helping me build a small vanilla JS web app called “Chhota Pandit”. Create a new Node project with Vite and testing/linting scaffolding.
Goals for this step:
1) Initialize npm (assume empty repo). Add dev dependencies: vite, eslint, @eslint/js, eslint-plugin-import, prettier, vitest, @testing-library/dom, jsdom, rimraf.
2) Create files: index.html, src/main.js, src/styles/base.css, vite.config.js, .eslintrc.cjs, .prettierrc, .gitignore.
3) Scripts in package.json:
   - "dev": "vite"
   - "build": "rimraf dist && vite build"
   - "preview": "vite preview"
   - "lint": "eslint ."
   - "format": "prettier --write ."
   - "format:check": "prettier --check ."
   - "test": "vitest --run"
   - "test:watch": "vitest"
4) index.html should load src/main.js via <script type="module">. Render a root <div id="app"></div>.
5) main.js should console.log('Chhota Pandit ready') and inject a minimal greeting into #app.
6) Configure vitest to use jsdom environment.
7) Create tests/unit/smoke.test.js that asserts the greeting renders.
8) Keep everything as ES modules. No frameworks.

When done, RUN:
- npm run lint
- npm test
```

### Prompt A2 — DOM helpers

```text
Add a small DOM utility module at src/ui/dom.js exporting:
- el(tag, attrs={}, ...children)
- on(el, type, handler)
- mount(parent, child)
Ensure el supports className, dataset, and event handler props like onClick.
Update src/main.js to use dom.js helpers to render an <h1> and a paragraph into #app.

Add tests/integration/dom-helpers.test.js to verify el(), on(), and mount() behaviors using @testing-library/dom.

When done, RUN:
- npm run lint
- npm test
```

### Prompt B1 — Categories and card pool

```text
Create src/logic/categories.js exporting:
- CATEGORIES: an array of category ids like ["movies","history","sports","culture"]
- DEFAULT_CARD_POOL: an array of Card objects: { id: string, text: string, category: one of CATEGORIES }
Provide at least 24 placeholder cards spread across categories.

Add unit tests (tests/unit/categories.test.js) to confirm every card has a valid category and unique id.

When done, RUN:
- npm run lint
- npm test
```

### Prompt B2 — Deck builder with constraints

```text
Implement src/logic/deck.js with:
- function buildDeck({ pool, chosenCategories, totalCount, minPerChosen=1, maxPerCategory=6, rng }): returns an array of Cards
Rules:
1) Choose from the global pool using chosenCategories only.
2) Enforce at least 1 card per chosen category (minPerChosen).
3) Enforce at most maxPerCategory from any single category.
4) Select without replacement.
5) If constraints cannot be met, throw a clear Error.

Write thorough unit tests in tests/unit/deck.test.js:
- Satisfies min-per-category and max-per-category constraints
- No duplicates
- Throws when impossible
- Determinism with injected rng

Update package.json test config if needed.

When done, RUN:
- npm run lint
- npm test
```

### Prompt B3 — RNG utilities

```text
Create src/logic/random.js exporting:
- function makeRNG(seed: number|string): returns an object { nextInt, nextFloat } deterministic PRNG
- function shuffle(rng, array): returns a new shuffled copy using Fisher–Yates with rng

Refactor deck.js to accept rng and use it for any randomness.
Add tests (tests/unit/random.test.js) proving determinism and stable shuffle.

When done, RUN:
- npm run lint
- npm test
```

### Prompt B4 — Rules (Option A)

```text
Create src/logic/rules.js exporting:
- ROUND_ORDER: array of round ids, e.g., ["round1","round2","round3"] (values per the spec’s “Option A”)
- TURN_SECONDS: fixed integer, e.g., 60 (adjust per spec if provided)
- PASS_PENALTY: false (no penalty)
- function getNextRound(currentRoundId): returns the next or null if last

Unit tests in tests/unit/rules.test.js to validate constants and getNextRound.

When done, RUN:
- npm run lint
- npm test
```

### Prompt C1 — Game state shape & reducers (setup → lobby)

```text
Create src/state/gameState.js exporting:
- initialState()
- reducers (pure functions): setSetup(data), startGame(), startRound(), startTurn(), markCorrect(), markPass(), endTurn(), endRound(), resetGame()
State should include: setup (chosenCategories, deckSize, teams, players), deck (computed once for entire game), roundIndex, activeTeamIndex, turn (startTime, remaining, currentCardId, correctIds, passIds), scores per team, and history per turn.

Add unit tests in tests/unit/state-basic.test.js exercising setSetup(), resetGame(), and immutability.

When done, RUN:
- npm run lint
- npm test
```

### Prompt C2 — Start game & randomize starting team

```text
Wire startGame() to:
- compute deck via buildDeck(...) using DEFAULT_CARD_POOL, chosen categories, and size
- seed RNG (e.g., Date.now()) and store seed in state
- randomize activeTeamIndex based on rng
- move to the first round

Add tests (tests/unit/state-start.test.js) asserting:
- deck computed once
- activeTeamIndex deterministic with a provided seed
- roundIndex set to 0

When done, RUN:
- npm run lint
- npm test
```

### Prompt C3 — Turn lifecycle & next card logic

```text
Add logic to gameState reducers:
- startTurn(): picks the next available card id for the round
- markCorrect(): moves current card to correctIds for this turn
- markPass(): moves current card to passIds (no penalty, per rules), and fetches a new current card
- endTurn(): closes the turn and prepares state for the next team

Ensure no replacement across the global deck; across rounds the same deck is reused (per spec).

Unit tests (tests/unit/state-turn.test.js) to validate transitions and that a round ends when all deck cards have been correctly guessed in that round.

When done, RUN:
- npm run lint
- npm test
```

### Prompt C4 — Scoring and end‑round breakdown

```text
Create src/logic/scoring.js:
- function tallyRound(history, teams): returns per‑team totals for the round and a breakdown by turn

Integrate endRound() reducer to compute and store the tally/breakdown for the just‑completed round.

Unit tests (tests/unit/scoring.test.js) covering multi‑team scenarios and tie cases.

When done, RUN:
- npm run lint
- npm test
```

### Prompt D1 — Setup view

```text
Create src/ui/views/setupView.js rendering:
- Category checkboxes for CATEGORIES
- Deck size numeric input
- Team name inputs (at least 2 teams) and optional players list per team
- “Start Game” button

On submit:
- validate: at least 1 category selected; deck size >= number of chosen categories
- dispatch setSetup(data) then startGame() and startRound()
Wire this view in src/main.js as the initial screen.

Integration test (tests/integration/setup-view.test.js) that simulates filling the form and starting the game.

When done, RUN:
- npm run lint
- npm test
```

### Prompt D2 — Game view: scoreboard, card, actions

```text
Create src/ui/views/gameView.js rendering:
- Scoreboard header: team names and cumulative scores
- Current round label (from rules)
- The current card text
- Correct and Pass buttons (hooked to reducers)

Update main.js to swap from setupView to gameView upon game start. Maintain a simple render loop that re-renders on state changes.

Integration test (tests/integration/game-view.test.js) to verify buttons update state appropriately.

When done, RUN:
- npm run lint
- npm test
```

### Prompt D3 — Timer & modal

```text
Create src/logic/timer.js exporting:
- startCountdown(seconds, { onTick, onExpire, nowFn=Date.now }): returns { stop() }
It should tick every 250ms–1000ms and call onExpire once.

In gameView, show a visual countdown. On expire, open a modal that disables card actions and triggers endTurn(). Use accessible markup for the modal and restore focus on close.

Integration test (tests/integration/timer.test.js) using fake timers to ensure expire path ends a turn.

When done, RUN:
- npm run lint
- npm test
```

### Prompt D4 — Round summary modal

```text
Add a round summary modal view showing:
- Per-team round totals and a simple breakdown (turns, correct counts)
- A “Continue to next round” button that dispatches startRound() or if no more rounds, shows end-of-game

Integration test (tests/integration/round-summary.test.js) verifying the summary appears and the continue flow works.

When done, RUN:
- npm run lint
- npm test
```

### Prompt D5 — End-of-game & reset

```text
Add an end-of-game view showing final totals and a “New Game” button that calls resetGame() and returns to setupView.
Confirm that state is cleanly reset and no memory of the old game remains.

Integration test (tests/integration/endgame.test.js) for the full flow.

When done, RUN:
- npm run lint
- npm test
```

### Prompt E1 — Validation & UX polish

```text
Improve setup validation messages and disable the Start button until valid.
Disable action buttons when no current card is active or during the timer modal.
Add keyboard shortcuts: [Enter] for Correct, [Shift+Enter] for Pass.
Light CSS polish in src/styles/components.css.

Update or add tests as needed.

When done, RUN:
- npm run lint
- npm test
```

### Prompt E2 — Accessibility & small animations

```text
Add ARIA roles/labels for buttons and modals. Ensure focus trap in modals and restore focus on close.
Add subtle CSS transitions for timer and card changes (keep minimal).

Run existing tests; add an integration test to confirm focus behavior in the modal.

When done, RUN:
- npm run lint
- npm test
```

### Prompt E3 — Optional Playwright smoke test

```text
Add Playwright as a dev dependency and create a single smoke test:
- Launch dev server
- Navigate to app
- Simulate a minimal setup
- Verify reaching round summary modal

Add "e2e" npm script to run this test.

When done, RUN:
- npm run lint
- npm test
- npm run e2e
```

---

## 5) Verification Checklist

- Lint & tests pass after each prompt.
- Deck constraints satisfied with deterministic tests via seeded RNG.
- Round 1 continues until the **entire deck** is guessed; later rounds reuse the same deck (per spec).
- Per‑turn results recorded; end‑round tally shows breakdown.
- Timer is fixed and triggers a modal that forces end‑turn. No penalty for pass.
- Starting team randomized; UI minimal and accessible enough for basic use.
- No persistence; refresh clears state.
- No orphaned code: every new module is imported and used by views/state.

---

## 6) Next Steps (Future, not in scope now)

- Persistence with localStorage (opt‑in).
- Theming & dark mode.
- Advanced accessibility and internationalization.
- Networked multiplayer & spectator mode.
- Mobile PWA install.
