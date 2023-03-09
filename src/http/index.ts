import axios, {
  type AxiosRequestConfig
} from "axios";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { type BTCBlock } from "io/BTCBlock";
import { toAppError, type AppError } from '../errors/AppError';
import { type BTCAddress } from "../io/BTCAddress";
import { type BTCTransaction } from "../io/BTCTransaction";

const isDev = process.env.NODE_ENV === "development";
// const isDev = false;

interface HTTPClient {
  get: <T>(
    url: string,
    opts?: AxiosRequestConfig
  ) => TE.TaskEither<AppError, T>;
}

export const HTTPClient: HTTPClient = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): TE.TaskEither<AppError, T> => {
    return pipe(
      TE.tryCatch(async () => await axios.get(url, config), toAppError),
      TE.map((d) => d.data)
    );
  },
};

export const getBlockCount = (): TE.TaskEither<AppError, number> => {
  return isDev
    ? TE.right(7771000)
    : HTTPClient.get("https://blockchain.info/q/getblockcount");
};

export const getRawTx = (
  hash: string
): TE.TaskEither<AppError, BTCTransaction> => {
  return HTTPClient.get(
    isDev
      ? `${process.env.PUBLIC_URL}/transaction.json?time=${hash}`
      : `https://blockchain.info/rawtx/${hash}`
  );
};

export const getRawAddress = (
  address: string
): TE.TaskEither<AppError, BTCAddress> => {
  return HTTPClient.get(
    isDev
      ? `${process.env.PUBLIC_URL}/address.json`
      : `https://blockchain.info/rawaddr/${address}`
  );
};

export const getRawBlock = (
  hash: string
): TE.TaskEither<AppError, BTCBlock> => {
  return HTTPClient.get(
    isDev
      ? `${process.env.PUBLIC_URL}/rawblock.json`
      : `https://blockchain.info/rawblock/${hash}`
  );
};

export const getBlockByHeight = (
  blockHeight: number
): TE.TaskEither<AppError, BTCAddress> => {
  return HTTPClient.get(
    isDev
      ? `${process.env.PUBLIC_URL}/block-height.json`
      : `https://blockchain.info/block-height/${blockHeight}`
  );
};

export const getLatestBlock = (): TE.TaskEither<AppError, BTCBlock> => {
  return pipe(
    HTTPClient.get<{ hash: string }>(
      isDev
        ? `${
            process.env.PUBLIC_URL
          }/latestblock.json`
        : `https://blockchain.info/latestblock`
    ),
    TE.map((d) => d.hash),
    TE.chain((hash) => getRawBlock(hash))
  );
};
