const board = Array(9).fill(null); // Initialize the game board with 9 empty cells
let currentPlayer = "X"; // X always starts first
let gameActive = true;

function handleClick(cell, index) {
    if (board[index] || !gameActive) return; // Prevent clicking on a filled cell or when the game is over

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.pointerEvents = "none";

    if (checkWin()) {
        document.getElementById("message").textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById("message").textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch turns
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board.fill(null);
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = "";
        cell.style.pointerEvents = "auto";
    });
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("message").textContent = "";
}
