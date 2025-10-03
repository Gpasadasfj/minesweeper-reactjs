import { useCallback, useEffect, useState } from "react";

import {
  createEmptyBoard,
  placeMines,
  createMines,
  calculateNeighbors,
} from "../utils/createBoard";
import soundManager from "../utils/soundManagers";

// Lógica del juego
export default function useGameLogic(
  size,
  mode,
  pauseTimer,
  setRecord,
  getTime,
  showMessage
) {
  const initBoard = useCallback(
    // Inicializar tablero
    (size) => {
      let cells = createEmptyBoard(size);
      let mines = createMines(size, mode);
      cells = placeMines(cells, size, mines);
      cells = calculateNeighbors(cells, size);

      return cells;
    },
    [mode]
  );

  const [board, setBoard] = useState(() => initBoard(size, mode));
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [flags, setFlags] = useState(0);
  const mines = createMines(size, mode);

  const { playDefault, playFlag, playMine, playVictory } = soundManager();

  useEffect(() => {
    // Resetear tablero cuando cambie el tamaño o dificultad
    setBoard(initBoard(size, mode));
    setIsGameOver(false);
    setFlags(0);
  }, [size, mode, initBoard]);

  function revealCell(x, y) {
    // Revelar celda
    if (board[x][y].isRevealed || isGameOver) return;

    // Crear una copia celda a celda del tablero
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    const cell = newBoard[x][y];
    cell.isRevealed = true;
    playDefault();

    // Si es mina se acaba el juego
    if (cell.isMine) {
      setIsGameOver(true);
      playMine();
      setBoard(newBoard);
      pauseTimer();
      showMessage("¡Has perdido!");
      return;
    }

    // Si es una bandera la manejamos
    if (cell.isFlagged) {
      toggleFlag(x, y);
    }

    // Si tiene 0 minas adyacentes, aplicar recursividad para revelar las
    //  celdas vacías adyacentes
    if (cell.neighborMines === 0) {
      revealEmptyCell(x, y, newBoard);
    }

    // Guardar el tablero actual
    setBoard(newBoard);
    // Comprobar si hay ganador
    checkWinner(newBoard);
  }

  // Revelar celdas vacías de forma recursiva
  function revealEmptyCell(i, j, newBoard, visited = {}) {
    // La clave es las coordenadas de la celda
    const key = `${i},${j}`;
    // Si ya ha sido visitada, pasamos al siguiente
    if (visited[key]) return;
    // Sino, la marcamos como visitada
    visited[key] = true;

    // Posiciones adyacentes de la celda
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

    // Por cada posición de los deltas le sumamos la posición actual
    deltas.forEach(([dx, dy]) => {
      const x = i + dx;
      const y = j + dy;

      // Comprobar si se encuentra dentro del tablero
      if (x >= 0 && x < size && y >= 0 && y < size) {
        const neighbor = newBoard[x][y];

        // Comprobar si no esta revelada o no es una mina
        if (!neighbor.isRevealed && !neighbor.isMine) {
          // setTimeOut para dar efecto de "ola"
          setTimeout(() => {
            neighbor.isRevealed = true;

            if (neighbor.isFlagged) {
              toggleFlag(x, y);
            }

            // Crear una copia profunda para evitar problemas de referencia
            setBoard((prevBoard) => {
              // Crear una copia del tablero anterior, fila por fila
              const updatedBoard = prevBoard.map((row, idx) =>
                // Si es la fila donde está la celda a actualizar
                idx === x
                  ? // Recorrer la fila y actualizar solo la celda en la columna 'y'
                    row.map((cell, jdx) => (jdx === y ? { ...neighbor } : cell))
                  : // Si no es la fila, la dejamos igual
                    row
              );
              // Devolvemos el nuevo tablero actualizado
              return updatedBoard;
            });

            // Si no tiene minas adyacentes llamamos a la función de forma recursiva
            if (neighbor.neighborMines === 0) {
              revealEmptyCell(x, y, newBoard, visited);
            }
            checkWinner(newBoard);
          }, 10);
        }
      }
    });
  }

  function toggleFlag(x, y) {
    // Manejar las banderas
    if (board[x][y].isRevealed || isGameOver) return;

    const newBoard = [...board];
    // Si no es bandera, la colocamos, si lo es, la quitamos
    newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;
    playFlag();

    setFlags((prev) => (newBoard[x][y].isFlagged ? prev + 1 : prev - 1));
    setBoard(newBoard);
  }

  function checkWinner(board) {
    // Comprobar si hay ganador
    const minesCount = createMines(size, mode);
    const revealedCells = board
      .flat()
      .filter((cell) => cell.isRevealed && !cell.isMine).length;
    const totalCells = size * size;

    if (revealedCells === totalCells - minesCount) {
      const time = getTime();
      setIsWinner(true);
      playVictory();
      pauseTimer();
      setRecord(mode, size, time);
      showMessage("¡Has Ganado!");
    }
  }

  return { board, isGameOver, isWinner, flags, mines, revealCell, toggleFlag };
}
