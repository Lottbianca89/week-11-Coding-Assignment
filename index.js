const cells = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('.game--status');
let currentPlayer = 'X';

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', restartGame);

function handleCellClick(event) {
    const cell = event.target;
    if (cell.innerText === '') {
        cell.innerText = currentPlayer;
        cell.setAttribute('data-index', currentPlayer);
        if (checkWin()) {
            gameStatus.innerText = `Player ${currentPlayer} wins!`;
            disableCellClick();
        } else if (checkDraw()) {
            gameStatus.innerText = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameStatus.innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].innerText !== '' && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText;
    });
}

function checkDraw() {
    return Array.from(cells).every(cell => cell.innerText !== '');
}

function disableCellClick() {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function restartGame() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.setAttribute('data-index', '');
    });
    currentPlayer = 'X';
    gameStatus.innerText = 'Player X\'s turn';
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}