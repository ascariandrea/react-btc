import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getWatchListAllQueryKey,
  getWatchListNewQueryKey,
  getWatchListQueryKey,
  type AddToWatchListProps,
} from "../queries";

export const useDoAddToWatchList = <TError = unknown, TContext = unknown>(
  opts?: UseMutationOptions<undefined, TError, AddToWatchListProps, TContext>
): UseMutationResult<undefined, TError, AddToWatchListProps, TContext> => {
  const qc = useQueryClient();
  return useMutation<undefined, TError, AddToWatchListProps, TContext>(
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
      onSuccess: async (data, { type, id }, ctx) => {
        // invalidate current type id
        await qc.invalidateQueries({
          queryKey: getWatchListQueryKey({ type, id }),
        });
        // invalidate watch list for given type
        await qc.invalidateQueries({
          queryKey: getWatchListAllQueryKey(type),
        });

        // invalidate watch list new items
        await qc.invalidateQueries({
          queryKey: [getWatchListNewQueryKey()],
        });

        opts?.onSuccess?.(data, { type, id }, ctx);
      },
    }
  );
};
