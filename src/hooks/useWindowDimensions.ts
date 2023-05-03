import { useState, useEffect, useCallback } from "react";
import { SIZES_RAW } from "@/constants/brakingPoints";

type WindowDimensions = {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
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
    return { width: 0, height: 0, isMobile: false, isTablet: false };
  }

  const isMobile = window.innerWidth < SIZES_RAW.MOBILE;
  const isTablet = window.innerWidth < SIZES_RAW.TABLET;

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile,
    isTablet,
  };
}
