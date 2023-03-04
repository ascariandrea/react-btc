import * as t from "io-ts";
import { BTCTransaction } from "./BTCTransaction";

export const BTCBlock = t.strict(
  {
    hash: t.string,
    ver: t.number,
    prev_block: t.string,
    mrkl_root: t.string,
    time: t.number,
    bits: t.number,
    next_block: t.array(t.string),
    fee: t.number,
    nonce: t.number,
    n_tx: t.number,
    size: t.number,
    block_index: t.number,
    main_chain: t.boolean,
    height: t.number,
    weight: t.number,
    tx: t.array(BTCTransaction),
  },
  "BTCBlock"
);

export type BTCBlock = t.TypeOf<typeof BTCBlock>;
