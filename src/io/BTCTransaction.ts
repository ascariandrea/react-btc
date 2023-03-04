import * as t from "io-ts";

const BTCTransactionOutput = t.strict(
  {
    addr: t.union([t.string, t.undefined]),
    n: t.number,
    script: t.string,
    spending_outpoints: t.array(
      t.strict({
        n: t.number,
        tx_index: t.number,
      })
    ),
    spent: t.boolean,
    tx_index: t.number,
    type: t.number,
    value: t.number,
  },
  "BTCTransactionOutput"
);

const BTCTransactionInput = t.strict(
  {
    sequence: t.number,
    witness: t.string,
    script: t.string,
    index: t.number,
    prev_out: t.union([BTCTransactionOutput, t.undefined]),
  },
  "BTCTransactionInput"
);

export const BTCTransaction = t.strict(
  {
    hash: t.string,
    time: t.number,
    size: t.number,
    block_index: t.union([t.number, t.null]),
    block_height: t.union([t.number, t.null]),
    inputs: t.array(BTCTransactionInput),
    out: t.array(BTCTransactionOutput),
    ver: t.number,
    vin_sz: t.number,
    vout_sz: t.number,
    weight: t.number,
    fee: t.number,
  },
  "BTCTransaction"
);

export type BTCTransaction = t.TypeOf<typeof BTCTransaction>;
