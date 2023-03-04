import { Typography } from "@mui/material";
import { CurrencyContext } from "../context/CurrencyContext";
import * as React from "react";

/**
 * Use fixed values to convert satoshi BTC to fiat currencies
 */
const eur = 21043.122672;
const usd = 22411.64494728;

export const CurrencyValue: React.FC<{ value: number; digits?: number }> = ({
  value,
  digits = 2,
}) => {
  const { currency } = React.useContext(CurrencyContext);
  const v = React.useMemo(() => {
    // every value comes in satoshi BTC
    const btcValue = value / 100000000;
    switch (currency) {
      case "USD": {
        return `${(btcValue * usd).toFixed(digits)} $`;
      }
      case "EUR": {
        return `${(btcValue * eur).toFixed(digits)} €`;
      }
      default: {
        return `${btcValue} BTC`;
      }
    }
  }, [currency, value]);

  return <Typography>{v}</Typography>;
};
