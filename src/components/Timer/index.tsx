import { useState, useRef, useEffect } from "react";

export const useTimer = (time: number = 400) => {
  // esse timer tá proximo de 4 segundos, porém o processamento do react é mais lento.
  // não adianta mudar os parametros do timer, pois o react não vai conseguir renderizar mais rápido.
  const [timer, setTimer] = useState(time);
  const id = useRef<number>(0);

  const clear = () => {
    window.clearInterval(id.current);
  };
  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 10);
    return () => clear();
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      clear();
    }
  }, [timer]);

  const percent = Math.floor((timer / time) * 100);
  const inversePercent = 100 - percent;

  console.log("timer", percent);

  return {
    originalTime: time,
    timer,
    percent,
    inversePercent,
  };
};
