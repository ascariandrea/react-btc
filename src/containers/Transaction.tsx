import { Box } from "@mui/system";
import * as React from "react";
import QueriesRenderer from "../components/common/QueriesRenderer";
import { TransactionCard } from "../components/transaction/TransactionCard";
import { useBTCTransaction } from "../state/queries";

interface TransactionProps {
  transaction: string;
}

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  return (
    <QueriesRenderer
      queries={{ transaction: useBTCTransaction(transaction) }}
      render={({ transaction }) => {
        return (
          <Box>
            <TransactionCard transaction={transaction} expanded />
          </Box>
        );
      }}
    />
  );
};
