import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root {
  --max-width: 1100px;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html, body, input, textarea, button {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  // * 1rem -> 16px;
  font-size: 1rem;
}

a {
  color: inherit;
  text-decoration: none;
}

/* TODO: adicionar cor no focus quando tiver definido no tema*/ 
:focus {
  outline: 0;
  
}

body {
    background-color: ${({ theme }) => theme.bodyColor};
    color: ${({ theme }) => theme.textColor};
    -webkit-font-smoothing: antialiased;
  }
`;
