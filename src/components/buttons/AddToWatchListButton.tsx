import PlusIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import QueriesRenderer from "../common/QueriesRenderer";
import * as React from "react";
import { useDoAddToWatchList } from "../../state/mutations";
import {
  type AddToWatchListProps,
  getWatchListAllQueryKey,
  getWatchListNewQueryKey,
  getWatchListQueryKey,
  useWatchList,
} from "../../state/queries";

interface AddToWatchListButtonProps extends AddToWatchListProps {
  onToggle?: (p: AddToWatchListProps) => void;
}

export const AddToWatchListButton: React.FC<AddToWatchListButtonProps> = ({
  type,
  id,
  onToggle,
}) => {
  const qc = useQueryClient();
  const watchListQuery = useWatchList({ type, id });

  const addToWatchList = useDoAddToWatchList({
    async onSuccess(data, variables, context) {
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
      onToggle?.({ type, id });
    },
  });

  const handleAddToWatchList = (): void => {
    addToWatchList.mutate({ type, id });
  };

  return (
    <QueriesRenderer
      queries={{
        watchlist: watchListQuery,
      }}
      render={({ watchlist }) => {
        const label =
          watchlist === null ? "Add to watchlist" : "Remove from watchlist";
        const icon = watchlist === null ? <PlusIcon /> : <RemoveIcon />;

        return (
          <Button variant="contained" endIcon={icon} onClick={handleAddToWatchList}>
            {label}
          </Button>
        );
      }}
    />
  );
};
