import QueriesRenderer from "../components/common/QueriesRenderer";
import * as React from "react";
import { useWatchListNew } from "../state/queries";
import { Snackbar } from "../components/snackbar/Snackbar";

export const NotificationSnackbar: React.FC = () => {
  return (
    <QueriesRenderer
      queries={{ watchListNew: useWatchListNew() }}
      render={({ watchListNew }) => {
        return (
          <Snackbar
            items={watchListNew.map((w) => ({
              id: `${w.type}-${w.id}`,
              message: `Added ${w.type}: ${w.id.substring(0, 6)}`,
            }))}
          />
        );
      }}
    />
  );
};
