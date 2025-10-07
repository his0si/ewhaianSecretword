import { useEffect, useState } from 'react';

export const useQuizTimer = (isStarted, isCompleted) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isStarted && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStarted, isCompleted]);

  const resetTimer = () => setTimeElapsed(0);

  return { timeElapsed, resetTimer };
};
