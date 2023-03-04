import {
  Card,
  CardContent,
  CardHeader
} from "@mui/material";
import { Box } from "@mui/system";
import { RawJSONAccordion } from 'components/RawJSONAccordion';
import * as React from "react";
import { Link } from "react-router-dom";
import { InfoTable } from "../components/common/InfoTable";
import QueriesRenderer from "../components/common/QueriesRenderer";
import { useBTCBlock, useBTCLastBlock } from "../state/queries/block.queries";

interface BlockProps {
  block: number;
  showTxs?: boolean;
}

export const Block: React.FC<BlockProps> = ({ block, showTxs = false }) => {
  return (
    <QueriesRenderer
      queries={{ block: useBTCBlock(block), lastBlock: useBTCLastBlock() }}
      render={({ block, lastBlock }) => {
        const confirmations = lastBlock - block.height + 1;

        return (
          <Box>
            <Card>
              <CardHeader
                title={
                  <a
                    href={`https://www.blockchain.com/explorer/blocks/btc/${block.block_index}`}
                  >
                    {block.height}
                  </a>
                }
                subheader={block.hash}
              />
              <CardContent>
                <InfoTable
                  infos={[
                    {
                      label: "Total Confirmed transactions",
                      value: confirmations,
                    },
                  ]}
                  columns={{
                    label: 4,
                    value: 6,
                  }}
                />
                {showTxs ? (
                  <ul>
                    {block.tx.map((t) => (
                      <li key={t.hash}>
                        <Link to={`/transaction/${t.hash}`}>{t.hash}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
              <RawJSONAccordion src={block} />
            </Card>
          </Box>
        );
      }}
    />
  );
};
