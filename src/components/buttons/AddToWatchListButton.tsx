import PlusIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import * as React from "react";
import { useDoAddToWatchList } from "../../state/mutations";
import {
  useWatchList, type AddToWatchListProps
} from "../../state/queries";
import QueriesRenderer from "../common/QueriesRenderer";

interface AddToWatchListButtonProps extends AddToWatchListProps {
  onToggle?: (p: AddToWatchListProps) => void;
}

export const AddToWatchListButton: React.FC<AddToWatchListButtonProps> = ({
  type,
  id,
  onToggle,
}) => {

  const watchListQuery = useWatchList({ type, id });

  const addToWatchList = useDoAddToWatchList({
    async onSuccess() {
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
          <Button variant="contained" size="small" endIcon={icon} onClick={handleAddToWatchList}>
            {label}
          </Button>
        );
      }}
    />
  );
};
