// src/game.js
// Logic for Rock-Paper-Scissors

const CHOICES = ['rock', 'paper', 'scissors'];

function normalizeChoice(input) {
  if (!input || typeof input !== 'string') return null;
  const s = input.trim().toLowerCase();
  if (s === 'batu' || s === 'rock') return 'rock';
  if (s === 'kertas' || s === 'paper') return 'paper';
  if (s === 'gunting' || s === 'scissors' || s === 'scissor') return 'scissors';
  return null;
}

function getComputerChoice() {
  const i = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[i];
}

// returns 'win' if player wins, 'lose' if player loses, 'draw' if tie
function getWinner(playerChoice, computerChoice) {
  const p = normalizeChoice(playerChoice);
  const c = normalizeChoice(computerChoice);
  if (!p || !c) throw new Error('Invalid choice');
  if (p === c) return 'draw';

  // rock beats scissors, scissors beats paper, paper beats rock
  if (
    (p === 'rock' && c === 'scissors') ||
    (p === 'scissors' && c === 'paper') ||
    (p === 'paper' && c === 'rock')
  ) {
    return 'win';
  }
  return 'lose';
}

module.exports = {
  CHOICES,
  normalizeChoice,
  getComputerChoice,
  getWinner,
};
