import {
  useQuery,
  type QueryFunction,
  type UseQueryResult
} from "@tanstack/react-query";
import { pipe } from "fp-ts/lib/function";
import { type AppError } from "../../errors/AppError";
import { getRawTx } from '../../http';
import { BTCTransaction } from "../../io/BTCTransaction";
import { foldTEorThrow } from "../../utils/fp.utils";
import { queryFetch } from "../QueryFetch";

const fetchBTCTransaction: QueryFunction<
  BTCTransaction,
  [string, { hash: string }]
> = async (ctx) => {
  return await pipe(
    queryFetch(
      getRawTx(ctx.queryKey[1].hash),
      BTCTransaction.decode
    ),
    foldTEorThrow
  );
};

export const useBTCTransaction = (
  hash: string
): UseQueryResult<BTCTransaction, AppError> => {
  return useQuery(["btc-transaction-" + hash, { hash }], fetchBTCTransaction);
};