import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html {
    font-size: 62.5%;
}
body {
    margin: 0;
    padding: 0;
    background: teal;
    box-sizing: border-box;
    padding: 3rem;
  }

::selection {
    background-color: $color-primary;
    color: $color-white;
}

`;
