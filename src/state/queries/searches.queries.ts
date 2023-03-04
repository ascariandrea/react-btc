import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AppError } from "../../errors/AppError";
import { type AddToWatchListProps } from "./watchlist.queries";

const LAST_SEARCHES = "last-searches";

export const getLastSearchByTypeKey = (type: AddToWatchListProps["type"]): string =>
  `${LAST_SEARCHES}-${type}`;

export const getLastSearchesKey = (
  type: AddToWatchListProps["type"]
): string[] => ["last-searches", type];

export const useLastSearches = (
  type: AddToWatchListProps["type"]
): UseQueryResult<string[], AppError> => {
  return useQuery(getLastSearchesKey(type), async ({ queryKey }) => {
    const searches = localStorage.getItem(
      getLastSearchByTypeKey(queryKey[1] as any)
    );
    if (searches !== null) {
      const s = JSON.parse(searches);
      return s;
    }
    return {};
  });
};
