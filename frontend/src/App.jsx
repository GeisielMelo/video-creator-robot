import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import React from "react";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
