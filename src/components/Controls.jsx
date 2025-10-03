import { useState } from "react";

export default function Controls({ setSize, setMode, resetTimer, startTimer }) {
  const [activeSize, setActiveSize] = useState(8);
  const [activeMode, setActiveMode] = useState("easy");

  const handleSizeClick = (size) => {
    setActiveSize(size);
    setSize(size);
    resetTimer();
    startTimer();
  };

  const handleModeClick = (mode) => {
    setActiveMode(mode);
    setMode(mode);
    resetTimer();
    startTimer();
  };

  return (
    <section className="control-container">
      <div className="control">
        <h3 className="control-title">Tamaño del tablero</h3>
        <button
          onClick={() => handleSizeClick(8)}
          className={`btn ${activeSize === 8 ? "active" : ""}`}
        >
          Pequeño
        </button>
        <button
          onClick={() => handleSizeClick(16)}
          className={`btn ${activeSize === 16 ? "active" : ""}`}
        >
          Mediano
        </button>
        <button
          onClick={() => handleSizeClick(24)}
          className={`btn ${activeSize === 24 ? "active" : ""}`}
        >
          Grande
        </button>
      </div>
      <div className="control">
        <h3 className="control-title">Dificultad</h3>
        <button
          onClick={() => handleModeClick("easy")}
          className={`btn ${activeMode === "easy" ? "active" : ""}`}
        >
          Fácil
        </button>
        <button
          onClick={() => handleModeClick("normal")}
          className={`btn ${activeMode === "normal" ? "active" : ""}`}
        >
          Normal
        </button>
        <button
          onClick={() => handleModeClick("hard")}
          className={`btn ${activeMode === "hard" ? "active" : ""}`}
        >
          Dificil
        </button>
      </div>
      
    </section>
  );
}
