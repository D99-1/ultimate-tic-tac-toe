document.addEventListener('DOMContentLoaded', () => {
    const mainBoard = document.getElementById('main-board');
    let currentPlayer = 'X'; 
    let activeBoard = null;

    const handleCellClick = (event) => {
        const cell = event.target.closest('.cell');
        const cellContent = cell.querySelector('.cell-content');
        const smallBoardIndex = Number(cell.parentElement.dataset.board);

        if (!cellContent.textContent.trim() && (activeBoard === null || activeBoard === smallBoardIndex)) {
            cellContent.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            activeBoard = Number(cell.dataset.cell);
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
});
