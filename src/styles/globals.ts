import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root {
  --max-width: 1120px;
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

body {
    background-color: ${({ theme }) => theme.bodyColor};
    color: ${({ theme }) => theme.textColor};
    -webkit-font-smoothing: antialiased;
  }

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
}

/* TODO: adicionar cor no focus quando tiver definido no tema*/ 
:focus {
  outline: 0;

}

@media (max-width: 1080px) {
  html {
    font-size: 93.75%
  }
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%
  }
}
`;
