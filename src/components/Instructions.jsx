export default function Instructions() {
  return (
    <section className="instructions">
      <h2 className="instructions-title">📜 Instrucciones del Juego</h2>
      <ul>
        <li>
          Selecciona el <strong>tamaño del tablero</strong> (Pequeño, Mediano o
          Grande).
        </li>
        <li>
          Elige la <strong>dificultad</strong> (Fácil, Normal o Difícil).
          <br />
          <small>💡 A mayor dificultad → más minas escondidas.</small>
        </li>
        <li>
          Haz <strong>clic izquierdo</strong> en una celda para revelarla.
        </li>
        <li>
          Cada <strong>celda</strong> puede ser una mina 💣, un número que
          indica el número de minas que hay en las celdas adyacentes o estar
          vacía.
        </li>
        <li>
          Si la <strong>celda</strong> clicada está vacía, se revelaran todas
          las celdas vacías adyacentes.
        </li>
        <li>
          Haz{" "}
          <strong>
            clic derecho (o mantén pulsado en dispositivos móviles)
          </strong>
          en una celda para marcarla con una 🚩 (sospecha de mina).
        </li>
        <li>
          Si revelas una <strong>mina 💣</strong>, ¡pierdes la partida!
        </li>
        <li>
          Si revelas todas las celdas que <u>no son minas</u>, ¡ganas la partida
          🎉!
        </li>
        <li>
          El <strong>tiempo</strong> se guarda automáticamente como récord si
          logras una victoria más rápida.
        </li>
        <li>
          El <strong>tiempo</strong> inicia automáticamente al seleccionar
          tamaño y dificultad.
        </li>
      </ul>
    </section>
  );
}
