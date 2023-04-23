import React, { createContext, useCallback, useContext, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme/lightTheme';
import { defaultTheme } from '@/styles/theme/defaultTheme';
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
  lightTheme.icon = <Brightness3 />;
  defaultTheme.icon = <Brightness7 />;
  const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);

  const toggleTheme = useCallback(() => {
    if (theme.name === 'default') {
      setTheme(defaultTheme);
    } else if (theme.name === 'dark') {
      setTheme(lightTheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
