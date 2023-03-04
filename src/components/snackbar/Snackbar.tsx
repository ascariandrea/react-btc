import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  Snackbar as MUISnackbar,
  Stack,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";

/**
 * Notification snackbars
 */
interface SnackbarProps {
  items: Array<{ id: string; message: string }>;
}

export const Snackbar: React.FC<SnackbarProps> = ({ items }) => {
  const [messages, setMessages] = React.useState<
    Record<string, { shown: boolean; message: string }>
  >(
    items.reduce(
      (acc, i) => ({
        ...acc,
        [i.id]: { shown: false, message: i.message },
      }),
      {}
    )
  );
  const qc = useQueryClient();
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }

    void qc.invalidateQueries({ queryKey: [] });
  };

  React.useEffect(() => {
    items.forEach((i) => {
      setTimeout(() => {
        setMessages((mm) => ({
          ...mm,
          [i.id]: { shown: true, message: i.message },
        }));
      }, 2000);
    });
  }, [items]);

  const notifications = React.useMemo(
    () => Object.entries(messages).filter(([k, v]) => !v.shown),
    [messages]
  );

  return (
    <Stack spacing={2}>
      {notifications.map(([key, v]) => (
        <MUISnackbar
          key={key}
          open={true}
          message={v.message}
          action={
            <React.Fragment>
              <Button color="secondary" size="small">
                UNDO
              </Button>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        />
      ))}
    </Stack>
  );
};
