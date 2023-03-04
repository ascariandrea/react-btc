import {
  useMutation, type UseMutationOptions,
  type UseMutationResult
} from "@tanstack/react-query";
import { type AddToWatchListProps } from "../queries";

export const useDoAddToWatchList = <TError = unknown, TContext = unknown>(
  opts?: UseMutationOptions<undefined, TError, AddToWatchListProps, TContext>
): UseMutationResult<undefined, TError, AddToWatchListProps, TContext> =>
  useMutation<undefined, TError, AddToWatchListProps, TContext>(
    ["toggle-watchlist-item"],
    async (p) => {
      const pKey = `${p.type}-${p.id}`;
      const item = localStorage.getItem(pKey);

      if (item !== null) {
        localStorage.removeItem(pKey);
      } else {
        localStorage.setItem(pKey, JSON.stringify(p));
      }
      return undefined;
    },
    {
      ...opts,
    }

  );
