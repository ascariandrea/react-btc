import { Box } from "@mui/system";
import * as React from "react";
import QueriesRenderer from "../components/common/QueriesRenderer";
import { TransactionCard } from "../components/transaction/TransactionCard";
import { useLatestTransactions } from "../state/queries";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LatestTransactionProps {
  count: number;
}

export const LatestTransactions: React.FC<LatestTransactionProps> = ({
  count,
}) => {
  return (
    <Box style={{ display: "flex", overflow: "scroll" }}>
      <QueriesRenderer
        queries={{
          block: useLatestTransactions(),
        }}
        render={({ block }) => {
          const txs = block.tx.slice(0, count);
          return (
            <Box>
              {txs.map((t) => (
                <TransactionCard key={t.hash} transaction={t} renderLink />
              ))}
            </Box>
          );
        }}
      />
    </Box>
  );
};
