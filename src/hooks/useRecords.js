import { useState, useEffect } from "react";
import timeToSeconds from "../utils/timeToSeconds"

export default function useRecords() {
  // Guardar y setear los récords
  const [records, setRecords] = useState({});

  // Setear récords al montar el componente
  useEffect(() => {
    const stored = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      stored[key] = localStorage.getItem(key);
    }
    setRecords(stored);
  }, []);

  const setRecord = (mode, size, time) => {
    // Guardar récord
    const key = `${mode}-${size}`;
    const t = timeToSeconds(time);

    const prev = records[key] ? timeToSeconds(records[key]) : Infinity;

    if (t < prev) {
      localStorage.setItem(key, time);
      setRecords((prevRecords) => ({
        ...prevRecords,
        [key]: time,
      }));
    }
  };

  const getRecord = (mode, size) => {
    // Setear récord
    const key = `${mode}-${size}`;
    return records[key] || "SIN TIEMPO";
  };

  return { records, setRecord, getRecord };
}
