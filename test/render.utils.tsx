import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderResult } from "@testing-library/react";
import * as React from "react";
import { HashRouter } from "react-router-dom";
import { CurrencyContextProvider } from "../src/components/context/CurrencyContext";
import { AppTheme } from "../src/theme";

interface RenderTestUI {
  cache: EmotionCache;
  qc: QueryClient;
}

export const queryClientWrapper = (
  qc: QueryClient,
  children: React.ReactNode
): JSX.Element => {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};

export const renderTestUI =
  ({ cache, qc }: RenderTestUI) =>
  (componentF: () => React.ReactNode): RenderResult => {
    return render(
      <HashRouter>
        <CacheProvider value={cache}>
          <CurrencyContextProvider defaultValue="BTC">
            <ThemeProvider theme={AppTheme}>
              {queryClientWrapper(qc, componentF())}
            </ThemeProvider>
          </CurrencyContextProvider>
        </CacheProvider>
      </HashRouter>
    );
  };
