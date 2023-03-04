import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AppError } from "../../errors/AppError";

export interface AddToWatchListProps {
  type: "address" | "transaction";
  id: string;
}

export const getWatchListQueryKey = (p: AddToWatchListProps): string[] => {
  const ppKey = `${p.type}-${p.id}`;
  return [`watch-list`, p.type, ppKey];
};

export const useWatchList = (
  p: AddToWatchListProps
): UseQueryResult<AddToWatchListProps | null, AppError> => {
  return useQuery(getWatchListQueryKey(p), async () => {
    const item = localStorage.getItem(`${p.type}-${p.id}`) ?? null;
    return await Promise.resolve(item);
  });
};

export const getWatchListNewQueryKey = (): string => {
  return `watch-list-new`;
};

const listAllWatchList = (
  type: Array<AddToWatchListProps["type"]>
): AddToWatchListProps[] => {
  const watched: AddToWatchListProps[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const currentKey = localStorage.key(i);

    if (type.some((t) => currentKey?.startsWith(t))) {
      const key: string = currentKey as any;
      const item = JSON.parse(localStorage.getItem(key) ?? "{}");
      if (!watched.includes(item)) {
        watched.push(item);
      }
    }
  }
  return watched;
};

export const getWatchListAllQueryKey = (
  type: AddToWatchListProps["type"]
): string[] => {
  return [`watch-list-all-${type}`];
};

export const useWatchListAll = (
  type: AddToWatchListProps["type"]
): UseQueryResult<AddToWatchListProps[], AppError> => {
  return useQuery(getWatchListAllQueryKey(type), async () => {
    return listAllWatchList([type]);
  });
};

export const useWatchListNew = (): UseQueryResult<
  AddToWatchListProps[],
  AppError
> => {
  const watched = listAllWatchList(["address", "transaction"]);
  return useQuery([getWatchListNewQueryKey()], async ({ queryKey }) => {
    const currentWatched = listAllWatchList(["address", "transaction"]);
    // console.log({ watched, currentWatched });
    const newWatched = currentWatched.filter((a) => !watched.includes(a));

    watched.push(...newWatched);

    return await Promise.resolve(newWatched);
  });
};
