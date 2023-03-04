import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Input, InputLabel } from "@mui/material";
import * as React from "react";
import { type AddToWatchListProps } from "../../state/queries";

export const SearchInput: React.FC<{
  type: AddToWatchListProps["type"];
  onSubmit: (q: string) => void;
}> = ({ type, onSubmit }) => {
  const [q, setQ] = React.useState("");

  const handleSubmit = async (qq: string): Promise<void> => {
    onSubmit(qq);
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <InputLabel>Search {type}</InputLabel>
      <Box
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Box style={{ display: "flex", flexGrow: 1, marginBottom: 30 }}>
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
            style={{ width: "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                void handleSubmit(q);
              }
            }}
          />
        </Box>

        <IconButton
          onClick={() => {
            void handleSubmit(q);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
