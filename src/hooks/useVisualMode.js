import React, { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    const oldHistory = history;

    if (replace) {
      oldHistory.pop()
    }

    oldHistory.push(newMode);
    setHistory(oldHistory);
  }

  function back() {
    if (history.length <= 1) { return }

    const oldHistory = history;
    oldHistory.pop();
    setHistory(oldHistory);
    const newLast = oldHistory[oldHistory.length - 1];
    setMode(newLast);
  };

  return {
    mode, transition, back
  };
}

