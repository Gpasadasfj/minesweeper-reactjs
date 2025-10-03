export default function Records({ getRecord }) {
  return (
    <section>
      <h2 className="bestTimesTitle">Tus mejores tiempos</h2>
      <div className="bestTimesDiv">
        <div className="container">
          <h3>Pequeño</h3>
          <div className="timesContainer">
            <h4>Fácil</h4>
            <span className="timeSpan">{getRecord("easy", 8)}</span>
            <h4>Normal</h4>
            <span className="timeSpan">{getRecord("normal", 8)}</span>
            <h4>Difícil</h4>
            <span className="timeSpan">{getRecord("hard", 8)}</span>
          </div>
        </div>

        <div className="container">
          <h3>Mediano</h3>
          <div className="timesContainer">
            <h4>Fácil</h4>
            <span className="timeSpan">{getRecord("easy", 16)}</span>
            <h4>Normal</h4>
            <span className="timeSpan" data-size="16" data-mode="normal">
              {getRecord("normal", 16)}
            </span>
            <h4>Difícil</h4>
            <span className="timeSpan">{getRecord("hard", 16)}</span>
          </div>
        </div>

        <div className="container">
          <h3>Grande</h3>
          <div className="timesContainer">
            <h4>Fácil</h4>
            <span className="timeSpan">{getRecord("easy", 24)}</span>
            <h4>Normal</h4>
            <span className="timeSpan">{getRecord("normal", 24)}</span>
            <h4>Difícil</h4>
            <span className="timeSpan">{getRecord("hard", 24)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
