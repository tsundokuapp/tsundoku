import { useState, useEffect, useCallback } from "react";

type WindowDimensions = {
  width: number;
  height: number;
};

export function useWindowDimensions(): WindowDimensions {
  const [dimensions, setDimensions] = useState<WindowDimensions>(() =>
    getWindowDimensions(),
  );

  const handleResize = useCallback(() => {
    setDimensions(getWindowDimensions());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return dimensions;
}

function getWindowDimensions(): WindowDimensions {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
