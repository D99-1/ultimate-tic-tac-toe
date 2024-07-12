document.addEventListener('DOMContentLoaded', () => {
    const mainBoard = document.getElementById('main-board');
    const activePlayerElement = document.getElementById('active-player');
    let currentPlayer = 'X'; 
    let activeBoard = null;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]              
    ];

    const updateActivePlayerIndicator = () => {
        activePlayerElement.textContent = `Current Player: ${currentPlayer}`;
    };

    const checkWin = (cells) => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return cells[a].textContent; 
            }
        }
        return null;
    };

    const checkMainBoardWin = () => {
        const mainBoardWinners = Array.from(mainBoard.children).map(board => board.dataset.winner || '');
        const winner = checkWin(mainBoardWinners.map(winner => ({ textContent: winner })));
        if (winner) {
            alert(`${winner} wins the game!`);
        }
    };

    const handleCellClick = (event) => {
        const cell = event.target.closest('.cell');
        const cellContent = cell.querySelector('.cell-content');
        const smallBoard = cell.parentElement;
        const smallBoardIndex = Number(smallBoard.dataset.board);

        if (!cellContent.textContent.trim() && (activeBoard === null || activeBoard === smallBoardIndex || mainBoard.children[activeBoard].classList.contains('won'))) {
            cellContent.textContent = currentPlayer;
            const winner = checkWin(smallBoard.querySelectorAll('.cell-content'));

            if (winner) {
                smallBoard.classList.add('won');
                smallBoard.dataset.winner = winner;
                smallBoard.classList.add(winner === 'X' ? 'x' : 'o');

                const winnerMark = document.createElement('div');
                winnerMark.classList.add('winner-mark');
                winnerMark.textContent = winner;
                smallBoard.appendChild(winnerMark);

                checkMainBoardWin();
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateActivePlayerIndicator();
            activeBoard = Number(cell.dataset.cell);

            document.querySelectorAll('.small-board').forEach(board => {
                board.classList.remove('active');
            });

            if (mainBoard.children[activeBoard] && !mainBoard.children[activeBoard].classList.contains('won')) {
                mainBoard.children[activeBoard].classList.add('active');
            } else {
                activeBoard = null; 
                document.querySelectorAll('.small-board').forEach(board => {
                    if (!board.classList.contains('won')) {
                        board.classList.add('active');
                    }
                });
            }
        }
    };

    for (let i = 0; i < 9; i++) {
        const smallBoard = mainBoard.children[i];
        smallBoard.dataset.board = i; 
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.cell = j;
            cell.addEventListener('click', handleCellClick);

            const cellContent = document.createElement('div');
            cellContent.classList.add('cell-content');
            cell.appendChild(cellContent);

            smallBoard.appendChild(cell);
        }
    }

    updateActivePlayerIndicator();
});
