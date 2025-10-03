import randomNumber from "./randomNumber";

export function createEmptyBoard(size) {
  // Crear tablero vacío
  const cells = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      });
    }
    cells.push(row);
  }
  return cells;
}

export function createMines(size, mode) {
  // Crear minas
  let mines;
  let nCells = size * size;
  switch (mode) {
    case "easy":
      mines = Math.round(nCells * 0.1);
      break;
    case "normal":
      mines = Math.round(nCells * 0.15);
      break;
    case "hard":
      mines = Math.round(nCells * 0.2);
      break;
    default:
      mines = 0;
  }

  return mines;
}

export function placeMines(cells, size, mines) {
  // Colocar minas
  let placed = 0;
  while (placed < mines) {
    const x = randomNumber(size);
    const y = randomNumber(size);

    if (!cells[x][y].isMine) {
      cells[x][y].isMine = true;
      placed++;
    }
  }
  return cells;
}

export function calculateNeighbors(cells, size) {
  // Calcular minas en las celdas adyacentes
  const deltas = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  cells.forEach((row, i) => {
    row.forEach((cell, j) => {
      let minesAround = 0;
      deltas.forEach(([dx, dy]) => {
        const x = i + dx;
        const y = j + dy;
        if (x >= 0 && x < size && y >= 0 && y < size) {
          if (cells[x][y].isMine) minesAround++;
        }
      });
      cell.neighborMines = minesAround
    });
  });
  return cells;
}
