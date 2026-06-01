import { useState, useRef, useCallback, useMemo, useEffect } from 'react';

export const useCallDuration = () => {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const formattedTime = useMemo(() => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (!hrs && !mins && !secs) return '';
    const parts = [mins, secs].map((v) => v.toString().padStart(2, '0'));
    if (hrs > 0) parts.unshift(hrs.toString().padStart(2, '0'));
    return parts.join(':');
  }, [seconds]);

  return {
    seconds,
    formattedTime,
    startTimer,
    stopTimer,
    setSeconds,
  };
};
