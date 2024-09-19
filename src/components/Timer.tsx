import React, { FC, useState, useEffect, useRef } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTime();
  }, [currentPlayer]);
  function startTime() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTime
        : decrementBlackTime;
    timer.current = setInterval(callback, 1000);
  }
  function decrementWhiteTime() {
    setWhiteTime((prev) => prev - 1);
  }
  function decrementBlackTime() {
    setBlackTime((prev) => prev - 1);
  }
  function handleRestart() {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }
  return (
    <div className="timer">
      <div>
        <button className="button-restart" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
      <h2>BLACK-{blackTime}</h2>
      <h2>WHITE-{whiteTime}</h2>
    </div>
  );
};

export default Timer;
