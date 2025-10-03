import { useState, useCallback } from "react";

export default function useMessage() {
  // Hook para gestionar el uso de los mensajes de victoria y derrota
  const [message, setMessage] = useState(null);

  const showMessage = useCallback((text) => {
    setMessage(text);
  }, []);

  const hideMessage = useCallback(() => setMessage(null), []);

  return { message, showMessage, hideMessage };
}
