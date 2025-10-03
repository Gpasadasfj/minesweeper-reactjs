import Cell from "./Cell";

export default function Board({ board, revealCell, toggleFlag }) {
  return (
    <div className="board">
      <table id="table">
        <tbody>
          {board.map((row, i) => (
            // Recorrer cada fila del tablero y crear un <tr>
            <tr key={i} className="row">
              {row.map((cell, j) => (
                // Recorrer cada celda y crear un componente Cell
                <Cell
                  key={j}
                  isMine={cell.isMine}
                  neighborMines={cell.neighborMines}
                  isRevealed={cell.isRevealed}
                  isFlagged={cell.isFlagged}
                  onClick={() => revealCell(i, j)}
                  onRightClick={() => toggleFlag(i, j)}
                  onLongPress={() => toggleFlag(i, j)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
