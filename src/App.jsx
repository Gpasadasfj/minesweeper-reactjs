import { useEffect, useState } from "react";
import "./App.css";
import Controls from "./components/Controls";
import Instructions from "./components/Instructions";
import StatusBar from "./components/StatusBar";
import useGameLogic from "./hooks/useGameLogic";
import Board from "./components/Board";
import useTimer from "./hooks/useTimer";
import Records from "./components/Records";
import useRecords from "./hooks/useRecords";
import Message from "./components/Message";
import useMessage from "./hooks/useMessage";

function App() {
  const [size, setSize] = useState(0);
  const [mode, setMode] = useState("easy");

  // Gestor de récords
  const { setRecord, getRecord } = useRecords();

  // Gestor del temporizador
  const { getTime, startTimer, pauseTimer, resetTimer } = useTimer();

  // Gestor de mensajes de victoria y derrota
  const { message, showMessage, hideMessage } = useMessage();

  // Lógica de luego
  const { board, isGameOver, isWinner, flags, mines, revealCell, toggleFlag } =
    useGameLogic(size, mode, pauseTimer, setRecord, getTime, showMessage);

  useEffect(() => {
    return () => pauseTimer();
  }, [pauseTimer]);

  return (
    <div id="app">
      <h1>💣💣💣 Buscaminas 💣💣💣</h1>
      <Instructions />

      <div>
        <Controls
          setSize={setSize}
          setMode={setMode}
          resetTimer={resetTimer}
          startTimer={startTimer}
        />
        <StatusBar mines={mines} flags={flags} time={getTime()} />
      </div>

      <div id="board-wrapper">
        <Board board={board} revealCell={revealCell} toggleFlag={toggleFlag} />
      </div>

      <div>
        <Records getRecord={getRecord} />
      </div>

      {isGameOver && message && (
        <Message text={message} onClose={hideMessage} />
      )}
      {isWinner && message && <Message text={message} onClose={hideMessage} />}
    </div>
  );
}

export default App;
