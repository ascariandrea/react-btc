import { type BTCAddress } from "../io/BTCAddress";

interface BTCUIInfo {
  totals: {
    spent: number;
    received: number;
    unspent: number;
    tx: number;
  };
  currentBalance: number;
}

export const toAddressInfo = (a: BTCAddress): BTCUIInfo => {
  return {
    currentBalance: a.final_balance,
    totals: {
      spent: a.total_sent,
      unspent: a.total_received - a.total_sent,
      received: a.total_received,
      tx: a.n_tx - a.n_unredeemed,
    },
  };
};
