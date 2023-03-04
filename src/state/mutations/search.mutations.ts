import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { type AppError } from "../../errors/AppError";
import { type AddToWatchListProps, getLastSearchByTypeKey } from "../queries";

interface UpdateSearchParams {
  type: AddToWatchListProps["type"];
  q: string;
}

export const useDoUpdateSearch = (
  type: AddToWatchListProps["type"],
  opts?: UseMutationOptions<null, AppError, UpdateSearchParams, any>
): UseMutationResult<null, AppError, UpdateSearchParams, any> => {
  return useMutation<null, AppError, UpdateSearchParams, any>(
    ["update-search"],
    async (p) => {
      const key = getLastSearchByTypeKey(p.type);
      const item = localStorage.getItem(key);
      let newItem: any = {};
      if (item !== null) {
        newItem = JSON.parse(item);
        console.log("json item", newItem);
        const entry: number | undefined = newItem[p.q];

        newItem[p.q] = entry !== undefined ? entry + 1 : 1;
      } else {
        newItem = {
          [p.q]: 1,
        };
      }
      localStorage.setItem(key, JSON.stringify(newItem));
      return await Promise.resolve(null);
    },
    {
      ...opts,
    }
  );
};

export const useDoClearSearches = (
  opts?: UseMutationOptions<
    null,
    AppError,
    { type: AddToWatchListProps["type"] },
    any
  >
): UseMutationResult<
  null,
  AppError,
  { type: AddToWatchListProps["type"] },
  any
> => {
  return useMutation(["clear-searches"], async ({ type }) => {
    localStorage.removeItem(getLastSearchByTypeKey(type));
    return await Promise.resolve(null);
  }, opts);
};
