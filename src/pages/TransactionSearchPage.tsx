import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchInput } from "../components/common/SearchInput";
import { LatestTransactions } from "../containers/LatestTransactions";
import { MostSearched } from "../containers/MostSearched";
import { Transaction } from "../containers/Transaction";
import { useDoUpdateSearch } from "../state/mutations";
import { getLastSearchesKey } from "../state/queries";

export const TransactionSearchPage: React.FC = (props) => {
  const { transaction } = useParams();
  const navigateTo = useNavigate();
  const qc = useQueryClient();
  const doUpdateSearch = useDoUpdateSearch("transaction", {
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: getLastSearchesKey("transaction"),
      });
    },
  });
  const handleSubmit = (q: string): void => {
    if (q !== transaction) {
      doUpdateSearch.mutate({ type: "transaction", q });
      navigateTo(`/transaction/${q}`);
    }
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Grid container style={{ height: "100%" }} spacing={2}>
        <Grid item md={3}>
          <SearchInput type="transaction" onSubmit={handleSubmit} />
          <MostSearched type="transaction" />
        </Grid>
        <Grid item md={9} style={{ height: "100%", overflow: "scroll" }}>
          {transaction !== undefined ? (
            <Transaction transaction={transaction} />
          ) : (
            <LatestTransactions count={5} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
