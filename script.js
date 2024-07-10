document.addEventListener('DOMContentLoaded', () => {
    const mainBoard = document.getElementById('main-board');

    for (let i = 0; i < 9; i++) {
        const smallBoard = mainBoard.children[i];

        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.cell = j;

            const cellContent = document.createElement('div');
            cellContent.classList.add('cell-content');
            cell.appendChild(cellContent);

            smallBoard.appendChild(cell);
        }
    }
});
