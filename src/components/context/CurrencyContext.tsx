import * as React from "react";

/**
 * Context provider for currency.
 */
const CURRENCY_KEY = "currency";
export const CurrencyContext = React.createContext({
  currency: "BTC",
  setCurrency: (currency: string) => {},
});

export const CurrencyContextProvider: React.FC<
  React.PropsWithChildren & { defaultValue?: string }
> = ({ children, defaultValue }) => {
  const [currency, setCurrency] = React.useState(
    defaultValue ?? localStorage.getItem(CURRENCY_KEY) ?? "BTC"
  );

  const handleSetCurrency = (c: string): void => {
    localStorage.setItem(CURRENCY_KEY, c);
    setCurrency(c);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency: handleSetCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
