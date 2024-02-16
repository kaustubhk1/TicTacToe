document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = Array.from(document.querySelectorAll(".cell"));
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const resultScreen = document.getElementById("result-screen");
    const resultMessage = document.getElementById("result-message");
    const newGameButton = document.getElementById("new-game");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                cells[a].classList.add("win");
                cells[b].classList.add("win");
                cells[c].classList.add("win");
                gameOver = true;
                resultMessage.textContent = `${currentPlayer} wins!`;
                resultScreen.style.display = "flex";
                break;
            }
        }

        if (!gameBoard.includes("") && !gameOver) {
            gameOver = true;
            resultMessage.textContent = "It's a draw!";
            resultScreen.style.display = "flex";
        }
    }

    function handleCellClick(event) {
        const cellIndex = cells.indexOf(event.target);
        if (!gameOver && gameBoard[cellIndex] === "") {
            gameBoard[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add(currentPlayer);
            checkWin();
            if (!gameOver) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function handleResetClick() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameOver = false;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O", "win");
        });
        status.textContent = "Player X's turn";
    }

    function handleNewGameClick() {
        resultScreen.style.display = "none";
        handleResetClick();
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", handleResetClick);
    newGameButton.addEventListener("click", handleNewGameClick);
    handleResetClick(); // Initialize the game
});
