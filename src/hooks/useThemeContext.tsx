import React, { createContext, useCallback, useContext, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { defaultTheme } from '@/styles/theme/defaultTheme';
import { darkTheme } from '@/styles/theme/darkTheme';
import { Brightness3, Brightness7 } from '@material-ui/icons';

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
  // TODO: usando dark theme como padrão, mas será alterado para light theme
  // TODO: implementar lógica para botões serem independentes
  defaultTheme.icon = <Brightness3 />;
  darkTheme.icon = <Brightness7 />;
  const [theme, setTheme] = useState<DefaultTheme>(darkTheme);

  const toggleTheme = useCallback(() => {
    if (theme.name === 'default') {
      setTheme(darkTheme);
    } else if (theme.name === 'dark') {
      setTheme(defaultTheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
