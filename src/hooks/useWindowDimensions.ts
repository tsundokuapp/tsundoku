import {
  useState,
  useEffect,
  useCallback,
  useRef,
  MutableRefObject,
} from "react";
import { SIZES_RAW } from "@/constants/breakingPoints";

type WindowDimensions = {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isExtraMobile: boolean;
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

interface IDimensions {
  width: number;
  height: number;
}
// Função que retorna as dimensões de um elemento mesmo após o resize da tela
export const useDimensions = (ref: MutableRefObject<any>) => {
  const dimensions = useRef<IDimensions>({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, [ref]);

  return dimensions.current;
};

// Função que retorna as dimensões da tela
function getWindowDimensions(): WindowDimensions {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isTablet: false,
      isExtraMobile: false,
    };
  }

  const isMobile = window.innerWidth < SIZES_RAW.MOBILE;
  const isTablet = window.innerWidth < SIZES_RAW.TABLET;
  const isExtraMobile = window.innerWidth < SIZES_RAW.EXTRA_MOBILE;

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isExtraMobile,
    isMobile,
    isTablet,
  };
}
