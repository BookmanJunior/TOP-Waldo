import { useEffect, useRef, useState } from 'react';
import FormatTime from '../helpers/FormatTime';

type TimerProps = {
  setFinalTime: (time: number) => void;
  isGameOver: boolean;
};

export default function Timer({ setFinalTime, isGameOver }: TimerProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const startTime = useRef(0);
  const [isRunning, setIsRunning] = useState(true);

  const time = timeElapsed - startTime.current;

  useEffect(() => {
    if (isGameOver) {
      setFinalTime(time);
      setIsRunning(false);
    } else {
      startTime.current = Date.now();
      setTimeElapsed(Date.now());
      setIsRunning(true);
    }
  }, [isGameOver]);

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeElapsed(Date.now());
      }, 10);
    }

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  return <div className=" rounded-md font-bold">{FormatTime(time)}</div>;
}
