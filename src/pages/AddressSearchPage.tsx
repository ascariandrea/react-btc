import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { SearchInput } from "../components/common/SearchInput";
import { Address, type AddressProps } from "../containers/Address";
import { WatchList } from "../containers/WatchList";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LatestTransactions } from "../containers/LatestTransactions";
import { useDoUpdateSearch } from "../state/mutations";
import { getLastSearchesKey } from "../state/queries";
import { useQueryClient } from "@tanstack/react-query";
import { MostSearched } from '../containers/MostSearched';

interface AddressSearchPageProps extends Omit<AddressProps, "address"> {}

export const AddressSearchPage: React.FC<AddressSearchPageProps> = ({
  onWatchToggle,
}) => {
  const { address } = useParams();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const doUpdateSearch = useDoUpdateSearch("address", {
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: getLastSearchesKey("address") });
    },
  });
  const handleSubmit = (q: string): void => {
    if (q !== address) {
      doUpdateSearch.mutate({ type: "address", q });
      navigate(`/address/${q}`);
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Grid container style={{ height: "100%" }} spacing={2}>
        <Grid item md={3}>
          <SearchInput type="address" onSubmit={handleSubmit} />
          <WatchList type="address" />
          <MostSearched type="address" />
        </Grid>
        <Grid item md={9}>
          {address !== undefined ? (
            <Address address={address} onWatchToggle={onWatchToggle} />
          ) : (
            <LatestTransactions count={5} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
