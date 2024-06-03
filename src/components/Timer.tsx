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

  return (
    <div className="pointer-events-none fixed bottom-2 left-0 right-0 flex justify-center">
      <p className=" rounded-md bg-pink-100 bg-opacity-90 p-2">{FormatTime(time)}</p>
    </div>
  );
}
