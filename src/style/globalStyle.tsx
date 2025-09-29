import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body, #root { height: 100%; }
  html { overflow-y: scroll; }

  @supports (scrollbar-gutter: stable) {
    html { overflow-y: auto; scrollbar-gutter: stable both-edges; }
  }

  body {
    margin: 0;
    background: var(--mantine-color-body);
    color: var(--mantine-color-text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
