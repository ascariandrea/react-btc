import axios, {
  AxiosError,
  type AxiosRequestConfig,
  isAxiosError,
} from "axios";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { type BTCBlock } from "io/BTCBlock";
import { type BTCAddress } from "../io/BTCAddress";
import { type BTCTransaction } from "../io/BTCTransaction";

const isDev = process.env.NODE_ENV === "development";
// const isDev = false;

const toAxiosError = (e: unknown): AxiosError => {
  if (isAxiosError(e)) {
    return e;
  }
  if (e instanceof Error) {
    return new AxiosError(e.message);
  }
  return new AxiosError("Unknown error");
};

interface HTTPClient {
  get: <T>(
    url: string,
    opts?: AxiosRequestConfig
  ) => TE.TaskEither<AxiosError, T>;
}

export const HTTPClient: HTTPClient = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): TE.TaskEither<AxiosError, T> => {
    return pipe(
      TE.tryCatch(async () => await axios.get(url, config), toAxiosError),
      TE.map((d) => d.data)
    );
  },
};

export const getBlockCount = (): TE.TaskEither<AxiosError, number> => {
  return isDev
    ? TE.right(7771000)
    : HTTPClient.get("https://blockchain.info/q/getblockcount");
};

export const getRawTx = (
  hash: string
): TE.TaskEither<AxiosError, BTCTransaction> => {
  return HTTPClient.get(
    isDev
      ? `${process.env.PUBLIC_URL}/transaction.json?time=${hash}`
      : `https://blockchain.info/rawtx/${hash}`
  );
};

export const getRawAddress = (
  address: string
): TE.TaskEither<AxiosError, BTCAddress> => {
  return HTTPClient.get(
    isDev
      ? `${process.env.PUBLIC_URL}/address.json?time=${address}`
      : `https://blockchain.info/rawaddr/${address}`
  );
};

export const getRawBlock = (
  hash: string
): TE.TaskEither<AxiosError, BTCBlock> => {
  return HTTPClient.get(
    isDev
      ? `${process.env.PUBLIC_URL}/rawblock.json?time=${hash}`
      : `https://blockchain.info/rawblock/${hash}`
  );
};

export const getBlockByHeight = (
  blockHeight: number
): TE.TaskEither<AxiosError, BTCAddress> => {
  return HTTPClient.get(
    isDev
      ? `${process.env.PUBLIC_URL}/block-height.json?time=${blockHeight}`
      : `https://blockchain.info/block-height/${blockHeight}`
  );
};

export const getLatestBlock = (): TE.TaskEither<AxiosError, BTCBlock> => {
  return pipe(
    HTTPClient.get<{ hash: string }>(
      isDev
        ? `${
            process.env.PUBLIC_URL
          }/latestblock.json?time=${new Date().getMilliseconds()}`
        : `https://blockchain.info/latestblock`
    ),
    TE.map((d) => d.hash),
    TE.chain((hash) => getRawBlock(hash))
  );
};
