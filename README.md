# Tic Tac Toe Game

This repository contains a fully interactive Tic Tac Toe game implemented in JavaScript, featuring both two-player and single-player modes against an AI bot. The game is designed with a clean interface and intuitive interaction, making it easy and fun to play.

## Features

### Two Modes of Play
- **2P Mode**: Compete against another human in a classic game of Tic Tac Toe.
- **1P Mode**: Challenge a computer-controlled bot powered by a minimax algorithm, making it a formidable opponent.

### Dynamic Score Tracking
- Track scores separately for each mode, with individual points for two-player games and a record of matches against the bot.

### AI Bot
- The single-player mode features an AI bot that uses the minimax algorithm to determine its moves, providing strategic challenges.

### Responsive UI
- The game's user interface dynamically updates to reflect the current state of the game, including the board and score displays.

## Technical Overview

### Game State Management
- The game state is managed using an array to represent the board and variables to track the current player and scores.

### Event Handling
- Listens for user interactions, specifically clicks on the game board, to update the game state accordingly.

### Minimax Algorithm
- The AI's decision-making process is powered by the minimax algorithm, ensuring optimal moves based on the current state of the board.

### DOM Manipulation
- Scores and player turns are displayed and updated in real-time using JavaScript to manipulate the DOM.

## Setup and Usage

1. **Clone the repository**:
2. **Open the `index.html` file in your browser** to start playing the game immediately. No additional setup is required.

Enjoy a well-implemented game of Tic Tac Toe right in your web browser, featuring advanced AI and a clean user interface.
