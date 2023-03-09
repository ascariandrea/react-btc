import { pipe } from "fp-ts/lib/function";
import fs from "fs";
import path from "path";
import { type BTCAddress } from '../src/io/BTCAddress';
import { type BTCTransaction } from "../src/io/BTCTransaction";

const addressFile = path.resolve(process.cwd(), "./public/address.json");
const addressJSON: BTCAddress = JSON.parse(fs.readFileSync(addressFile, "utf-8"));

const transactionFile = path.resolve(
  process.cwd(),
  "./public/transaction.json"
);

const txJSON: BTCTransaction = pipe(
  fs.readFileSync(transactionFile, "utf-8"),
  JSON.parse
);

const blockByHeightFile = path.resolve(
  process.cwd(),
  "./public/block-height.json"
);
const blockJSON = pipe(fs.readFileSync(blockByHeightFile, "utf-8"), JSON.parse);

const rawBlockFile = path.resolve(process.cwd(), "./public/rawblock.json");
const rawBlockJSON = pipe(fs.readFileSync(rawBlockFile, "utf-8"), JSON.parse);

const lastBlockFile = path.resolve(process.cwd(), "./public/latestblock.json");
const lastBlockJSON = pipe(fs.readFileSync(lastBlockFile, "utf-8"), JSON.parse);

export { addressJSON, txJSON, blockJSON, rawBlockJSON, lastBlockJSON };
