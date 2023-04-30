import React, { createContext, useCallback, useContext, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { lightTheme } from "@/styles/theme/lightTheme";
import { defaultTheme as darkTheme } from "@/styles/theme/defaultTheme";

import { FiSun as IconLightMode } from "react-icons/fi";
import { MdDarkMode as IconDarkMode } from "react-icons/md";

interface IThemeContext {
  theme: DefaultTheme;
  toggleTheme: () => void;
  activeDarkTheme: () => void;
  activeLightTheme: () => void;
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
  lightTheme.icon.darkIcon = <IconDarkMode />;
  lightTheme.icon.lightIcon = <IconLightMode />;
  darkTheme.icon.lightIcon = <IconLightMode />;
  darkTheme.icon.darkIcon = <IconDarkMode />;
  const [theme, setTheme] = useState<DefaultTheme>(darkTheme);

  const toggleTheme = useCallback(() => {
    if (theme.name === "default") {
      setTheme(lightTheme);
    } else if (theme.name === "light") {
      setTheme(darkTheme);
    }
  }, [theme]);

  const activeDarkTheme = useCallback(() => {
    if (theme.name === "default") return;

    setTheme(darkTheme);
  }, [theme]);

  const activeLightTheme = useCallback(() => {
    if (theme.name === "light") return;

    setTheme(lightTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ toggleTheme, theme, activeDarkTheme, activeLightTheme }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
