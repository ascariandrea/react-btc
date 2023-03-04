import { Button, Typography } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { useDoClearSearches } from "../state/mutations";
import QueriesRenderer from "../components/common/QueriesRenderer";
import { type AddToWatchListProps } from "../state/queries";
import {
  getLastSearchesKey,
  useLastSearches,
} from "../state/queries/searches.queries";
import { useQueryClient } from "@tanstack/react-query";

export const MostSearched: React.FC<{ type: AddToWatchListProps["type"] }> = ({
  type,
}) => {
  const qc = useQueryClient();
  const doClearSearches = useDoClearSearches({
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: getLastSearchesKey(type) });
    },
  });
  return (
    <QueriesRenderer
      queries={{ searches: useLastSearches(type) }}
      render={({ searches }) => {
        const items = Object.entries(searches).sort(
          (a, b) => (b[1] as any) - (a[1] as any)
        );
        return (
          <div>
            <Typography variant="subtitle2">Most {type} searched</Typography>
            {items.length > 0 ? (
              <ul>
                {items.map((i) => (
                  <li key={i[0]}>
                    <Link to={`/${type}/${i[0]}`}>
                      {i[0].substring(0, 6)} ({i[1]})
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="caption">No searches</Typography>
            )}
            {items.length > 0 ? (
              <Button
                size="small"
                onClick={() => {
                  doClearSearches.mutate({ type });
                }}
              >
                Clear searches
              </Button>
            ) : null}
          </div>
        );
      }}
    />
  );
};
