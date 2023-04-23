import { useState, useEffect } from "react";

// TODO: verificar o momento de chamada desse hook, a partir do lifecycle do componente
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
