import { useEffect } from "react";

export default function Message({ text, onClose }) {
  // Mensaje de victoria o derrota
  useEffect(() => {
    const timer = setTimeout(() => {
      // Desaparece a los 5s
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="game-over-message">{text}</div>;
}
