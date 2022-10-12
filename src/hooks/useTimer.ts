import { useEffect, useState } from "react";

function useTimer(initialMinLeft: number) {
  const [timeLeft, setTimeLeft] = useState<number>(initialMinLeft * 60);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 100);
  }, [timeLeft]);

  return [timeLeft > 0, timeLeft];
}

export default useTimer;
