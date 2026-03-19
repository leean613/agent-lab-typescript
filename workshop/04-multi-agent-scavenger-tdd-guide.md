# Scavenger Hunt Mode (TDD) Guide

This document summarizes the Scavenger Hunt mode planning + TDD workflow from the workshop.

## 1. Start a new Plan agent

- Goal: define “what we are building, why, and tasks.”
- Do: ask the agent to plan “Scavenger Hunt mode.”
- Output:
  - update start screen with mode button
  - new `ScavengerScreen`
  - checkbox + progress logic
  - tests

## 2. Add Scavenger Hunt mode (design)

- Goal: decide final UI/UX behavior.
- Do: agree on:
  - use same questions as existing mode
  - show plain list with checkboxes
  - show progress meter (`x / total` or percent)
- Expect: UI is minimal and clear, not overcomplicated.

## 3. Iterate plan (review)

- Goal: validate design decisions before code.
- Do: answer:
  - “Did we add mode to start page?” → yes means new menu button exists.
  - “Does progress feature avoid overkill?” → yes if simple reliable meter, no extra gamification.
- Fix: if issue, adjust plan before coding.

## 4. TDD Red (tests first)

- Goal: write failing tests for behavior.
- Do: create tests like:
  - mode appears in start screen
  - scavenger view renders `N` questions
  - checkboxes toggle done state
  - progress value updates properly
- Expect: tests fail before implementation.

## 5. TDD Green (make tests pass)

- Goal: minimal implementation that passes tests.
- Do: code:
  - `ScavengerScreen` with checkbox list
  - progress update function
  - integrate mode into flow
- Expect: tests now pass (green).

## 6. Refactor / verify

- Goal: clean code while behavior preserved.
- Do: improve variable names, move shared logic to helpers, remove duplicates.
- Expect: all tests still pass + app still works.

## 7. Hand-offs (review flow)

- Goal: structured checkpoint at each stage.
- Do: confirm result after Red, then after Green, then after refactor.
- Expect: explicit review before moving to next step.

## Bonus: checkpoint + TDD Supervisor

- Save state before step 4 (git commit/stash).
- Run Supervisor agent to manage Red→Green→Refactor.
- If differ, revert and compare.

## Checklist

1. Plan
2. Design decision
3. Write test first
4. Implement small
5. Run tests
6. Refactor
7. Repeat

## Card Deck Shuffle Mode (added)

- Implemented in code:
  - `GameMode` includes `cardDeck`
  - `gameModeConfig.cardDeck`
  - `StartScreen` with a third button
  - `CardDeckScreen` UI
  - `useCardDeckGame` hook
  - `cardDeckLogic` and tests
- Behavior:
  1. Start app, choose Card Deck.
  2. Press Start Game — first random question appears.
  3. Press Draw Card for next random question.
  4. Card draw count increases.
  5. Deck exhausted message appears after all 25 questions.
