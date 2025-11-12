#!/usr/bin/env node
// src/app.js
// Simple CLI for Rock-Paper-Scissors

const readline = require('readline');
const { getComputerChoice, getWinner, normalizeChoice } = require('./game');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask() {
  rl.question('Pilih (batu/kertas/gunting) atau "exit" untuk keluar: ', (answer) => {
    if (!answer) return ask();
    if (answer.trim().toLowerCase() === 'exit') {
      console.log('Terima kasih sudah bermain!');
      rl.close();
      return;
    }
    const player = normalizeChoice(answer);
    if (!player) {
      console.log('Pilihan tidak valid. Coba lagi.');
      return ask();
    }
    const computer = getComputerChoice();
    const result = getWinner(player, computer);
    console.log(`Kamu: ${player}  |  Komputer: ${computer}`);
    if (result === 'win') console.log('Kamu MENANG! 🎉');
    else if (result === 'lose') console.log('Kamu KALAH 😢');
    else console.log('Seri.');
    return ask();
  });
}

// If run with an argument, play a single round
const arg = process.argv[2];
if (arg) {
  try {
    const player = normalizeChoice(arg);
    if (!player) throw new Error('Invalid choice');
    const computer = getComputerChoice();
    const result = getWinner(player, computer);
    console.log(JSON.stringify({ player, computer, result }));
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
} else {
  console.log('=== Batu, Kertas, Gunting ===');
  ask();
}
