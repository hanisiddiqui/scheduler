import React, { Fragment, useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(newMode, replace = false) {
    const historyCopy = [...history];
    if (replace) {
      historyCopy.pop();
    }
    setMode(newMode);
    historyCopy.push(newMode);
    setHistory(historyCopy);
  }

  function back() {
    if (history.length > 1) {
      const historyCopy = [...history];
      historyCopy.pop();
      setMode(historyCopy[historyCopy.length - 1]);
      setHistory(historyCopy);
    }
  }

  return { mode, transition, back };
};
