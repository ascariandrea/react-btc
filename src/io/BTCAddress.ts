import * as t from "io-ts";
import { BTCTransaction } from "./BTCTransaction";

export const BTCAddress = t.strict(
  {
    address: t.string,
    hash160: t.union([t.null, t.string]),
    txs: t.array(BTCTransaction),
    final_balance: t.number,
    n_tx: t.number,
    n_unredeemed: t.number,
    total_received: t.number,
    total_sent: t.number,
  },
  "BTCAddress"
);

export type BTCAddress = t.TypeOf<typeof BTCAddress>;
