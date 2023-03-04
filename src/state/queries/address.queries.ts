import {
    useQuery,
    type QueryFunction,
    type UseQueryResult
} from "@tanstack/react-query";
import { pipe } from "fp-ts/lib/function";
import { foldTEorThrow } from "../../utils/fp.utils";
import { type AppError } from "../../errors/AppError";
import { BTCAddress } from "../../io/BTCAddress";
import { queryFetch } from "../QueryFetch";
import { getRawAddress } from '../../http';

const fetchBTCAddress: QueryFunction<
  BTCAddress,
  [string, { wif: string }]
> = async (wif) => {
  return await pipe(
    queryFetch(
      getRawAddress(wif.queryKey[1].wif),
      BTCAddress.decode
    ),
    foldTEorThrow
  );
};

export const useBTCAddress = (
  wif: string
): UseQueryResult<BTCAddress, AppError> => {
  return useQuery(["btc-address-" + wif, { wif }], fetchBTCAddress);
};
