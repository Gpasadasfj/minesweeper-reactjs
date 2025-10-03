export default function StatusBar({ mines, flags, time }) {
  return (
    <div className="hud">
      <div>
        <p className="label">
          Minas Totales:{" "}
          <span className="value" id="nAllMines">
            {mines}
          </span>
        </p>
      </div>
      <div>
        <p className="label">
          Banderas Colocadas: <span className="value">{flags}</span>
        </p>
      </div>
      <div>
        <p className="label">
          Tiempo: <span className="timer value">{time}</span>
        </p>
      </div>
    </div>
  );
}
