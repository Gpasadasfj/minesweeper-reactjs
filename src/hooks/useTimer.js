import { useState, useRef, useEffect, useCallback } from "react";

export default function useTimer() {
  // Temporizador
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const intervalRef = useRef(null);

  function formatNum(num) {
    // Formato 00:00:00
    return num.toString().padStart(2, "0");
  }

  function getTime() {
    // Obtener tiempo actual
    return `${formatNum(time.h)}:${formatNum(time.m)}:${formatNum(time.s)}`;
  }

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          let { h, m, s } = prev;
          s += 1;
          if (s === 60) {
            s = 0;
            m += 1;
            if (m === 60) {
              m = 0;
              h += 1;
            }
          }
          return { h, m, s };
        });
      }, 1000);
    }
  };

  const pauseTimer = useCallback(() => {
    // Pausar temporizador
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  function resetTimer() {
    // Reiniciar temporizador
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime({ h: 0, m: 0, s: 0 });
  }

  // Cleanup en desmontaje
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { time, getTime, startTimer, pauseTimer, resetTimer };
}
