import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import debug from "debug";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AppTheme } from "./theme";
import { App } from "./App";
import { queryClient } from "./state";
import createEmotionCache from "./theme/createEmotionCache";
import "./theme/main.css";
import { CurrencyContextProvider } from "./components/context/CurrencyContext";

debug.enable("*");

// create emotion cache
const cache = createEmotionCache();

function Main(): JSX.Element {
  return (
    <HashRouter>
      <CacheProvider value={cache}>
        <ThemeProvider theme={AppTheme}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline enableColorScheme />
            <CurrencyContextProvider>
              <App />
            </CurrencyContextProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </HashRouter>
  );
}

const container: any = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
