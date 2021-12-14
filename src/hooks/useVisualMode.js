import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory(prev => {
      const ourHistory = [...prev];
      if (replace) {ourHistory.pop()};
     return  [...ourHistory, newMode]});
  }

  function back() {
    if (history.length <= 1) { return }

    setMode(history[history.length - 2]);
    setHistory(prev => {
      prev.pop();
      return [...prev];
    })
  };

  return {
    mode, transition, back
  };
}

