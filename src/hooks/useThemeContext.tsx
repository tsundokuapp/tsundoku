import React, { createContext, useCallback, useContext, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { lightTheme } from "@/styles/theme/lightTheme";
import { defaultTheme as darkTheme } from "@/styles/theme/defaultTheme";

import { FiSun as IconLightMode } from "react-icons/fi";
import { MdDarkMode as IconDarkMode } from "react-icons/md";

interface IThemeContext {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

interface ICustomThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({
  children,
}: ICustomThemeProviderProps) => {
  // TODO: implementar lógica para botões serem independentes
  lightTheme.icon = <IconLightMode />;
  darkTheme.icon = <IconDarkMode />;
  const [theme, setTheme] = useState<DefaultTheme>(darkTheme);

  const toggleTheme = useCallback(() => {
    if (theme.name === "default") {
      setTheme(lightTheme);
    } else if (theme.name === "light") {
      setTheme(darkTheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
