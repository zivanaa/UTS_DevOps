// tests/game.test.js
const { CHOICES, normalizeChoice, getComputerChoice, getWinner } = require('../src/game');

describe('normalizeChoice', () => {
  test('accepts Indonesian and English words', () => {
    expect(normalizeChoice('batu')).toBe('rock');
    expect(normalizeChoice('Kertas')).toBe('paper');
    expect(normalizeChoice(' GUNTING ')).toBe('scissors');
    expect(normalizeChoice('scissors')).toBe('scissors');
    expect(normalizeChoice('unknown')).toBeNull();
  });
});

describe('getComputerChoice', () => {
  test('returns a valid choice', () => {
    const c = getComputerChoice();
    expect(CHOICES).toContain(c);
  });
});

describe('getWinner', () => {
  test('rock beats scissors', () => {
    expect(getWinner('rock', 'scissors')).toBe('win');
    expect(getWinner('batu', 'gunting')).toBe('win');
  });

  test('scissors beats paper', () => {
    expect(getWinner('scissors', 'paper')).toBe('win');
  });

  test('paper beats rock', () => {
    expect(getWinner('paper', 'rock')).toBe('win');
  });

  test('losing cases', () => {
    expect(getWinner('rock', 'paper')).toBe('lose');
    expect(getWinner('scissors', 'rock')).toBe('lose');
  });

  test('draw cases', () => {
    expect(getWinner('rock', 'rock')).toBe('draw');
    expect(getWinner('kertas', 'paper')).toBe('draw');
  });

  test('throws on invalid input', () => {
    expect(() => getWinner('x', 'rock')).toThrow();
    expect(() => getWinner('rock', 'y')).toThrow();
  });
});
