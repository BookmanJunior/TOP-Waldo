import { useEffect, useState } from 'react';
import FormatTime from '../helpers/FormatTime';

type TimerProps = {
  setFinalTime: (time: number) => void;
  isGameOver: boolean;
};

export default function Timer({ setFinalTime, isGameOver }: TimerProps) {
  const [timeElapsed, setTimeElapsed] = useState(Date.now);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer: number;

    if (isGameOver) {
      setFinalTime(timeElapsed);
      setIsRunning(false);
    }

    if (isRunning) {
      timer = setInterval(() => {
        setTimeElapsed(Date.now() - timeElapsed);
      }, 10);
    }

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, isGameOver]);

  return (
    <div className="pointer-events-none fixed bottom-2 left-0 right-0 flex justify-center">
      <p className=" rounded-md bg-pink-100 bg-opacity-90 p-2">{FormatTime(timeElapsed)}</p>
    </div>
  );
}
