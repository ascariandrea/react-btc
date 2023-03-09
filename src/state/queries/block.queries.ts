import {
  useQuery,
  type QueryFunction,
  type UseQueryResult,
} from "@tanstack/react-query";
import { pipe } from "fp-ts/lib/function";
import { BTCBlock } from "../../io/BTCBlock";
import { foldTEorThrow } from "../../utils/fp.utils";
import { type AppError } from "../../errors/AppError";
import { queryFetch } from "../QueryFetch";
import * as t from "io-ts";
import * as TE from "fp-ts/TaskEither";
import { getBlockByHeight, getBlockCount, getLatestBlock } from "../../http";

const fetchBTCBlock: QueryFunction<
  BTCBlock,
  [string, { blockHeight: number }]
> = async (wif) => {
  return await pipe(
    queryFetch(
      getBlockByHeight(wif.queryKey[1].blockHeight),
      t.type({ blocks: t.array(BTCBlock) }).decode
    ),
    TE.map((d) => d.blocks[0]),
    foldTEorThrow
  );
};

export const useBTCBlock = (
  blockHeight: number
): UseQueryResult<BTCBlock, AppError> => {
  return useQuery(
    [`btc-block-${blockHeight}`, { blockHeight }],
    fetchBTCBlock
  );
};

const fetchBTCBlockCount: QueryFunction<number, string[]> = async () => {
  return await pipe(getBlockCount(), foldTEorThrow);
};

export const useBTCBlockCount = (): UseQueryResult<number, AppError> => {
  return useQuery([`btc-last-block-count`], fetchBTCBlockCount);
};


export const useLatestTransactions = (): UseQueryResult<BTCBlock, AppError> => {
  return useQuery(["btc-latest-transactions"], async () => {
    return await pipe(
      queryFetch(getLatestBlock(), BTCBlock.decode),
      foldTEorThrow
    );
  });
};
