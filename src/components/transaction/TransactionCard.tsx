import {
  Card,
  CardContent,
  CardHeader,
  Chip
} from "@mui/material";
import { Box } from "@mui/system";
import { RawJSONAccordion } from '../RawJSONAccordion';
import { pipe } from "fp-ts/lib/function";
import * as React from "react";
import { Link } from "react-router-dom";
import { CurrencyContext } from "../context/CurrencyContext";
import { Block } from "../../containers/Block";
import { type BTCTransaction } from "../../io/BTCTransaction";
import { CurrencyValue } from "../common/CurrencyValue";
import { DateValue } from "../common/DateValue";
import { InfoTable } from "../common/InfoTable";

export const TransactionCard: React.FC<{
  transaction: BTCTransaction;
  renderLink?: boolean;
  expanded?: boolean;
}> = ({ transaction, renderLink = false, expanded = false }) => {
  const { currency } = React.useContext(CurrencyContext);

  const infos = [
    {
      label: "From",
      value: transaction.inputs.flatMap((i) =>
        i.prev_out?.addr !== undefined ? (
          <Box key={i.prev_out.addr}>
            <Link key={i.sequence} to={`/address/${i.prev_out.addr}`}>
              {i.prev_out?.addr}
            </Link>
          </Box>
        ) : null
      ),
    },
    {
      label: `Total ${currency} input`,
      value: pipe(
        transaction.inputs
          .flatMap((i) => i.prev_out?.value ?? 0)
          .reduce((acc, v) => acc + v, 0),
        (v) => <CurrencyValue value={v} />
      ),
    },
    {
      label: "To",
      value: transaction.out.flatMap((i) =>
        i.addr !== undefined ? (
          <Box key={i.addr}>
            <Link to={`/address/${i.addr}`}>
              {i.addr}
            </Link>
          </Box>
        ) : null
      ),
    },
    {
      label: `Total ${currency} Output`,
      value: pipe(
        transaction.out.flatMap((i) => i.value).reduce((acc, v) => acc + v, 0),
        (v) => <CurrencyValue  value={v} />
      ),
    },
    {
      label: `Total ${currency} Fees`,
      value: <CurrencyValue value={transaction.fee} digits={5} />,
    },
    {
      label: "Status",
      value:
        transaction.block_height !== null ? (
          <Chip label="Confirmed" color="success" size="small" />
        ) : (
          <Chip label="Pending" color="warning" size="small" />
        ),
    },
  ];

  if (expanded) {
    infos.push(
      {
        label: "Received Time",
        value: (
          <DateValue
            value={new Date(new Date().getTime() - transaction.time)}
          />
        ),
      },
      {
        label: "Size",
        value: <span>{transaction.size} bytes</span>,
      },
      {
        label: "Block height",
        value:
          transaction.block_height !== null ? (
            <Block block={transaction.block_height} />
          ) : (
            <div />
          ),
      }
    );
  }
  return (
    <Card variant="outlined" style={{ marginTop: 30 }}>
      <CardHeader
        title={
          renderLink ? (
            <Link to={`/transaction/${transaction.hash}`}>
              {transaction.hash}
            </Link>
          ) : (
            transaction.hash
          )
        }
        subheader={
          <a
            href={`https://www.blockchain.com/explorer/transactions/btc/${transaction.hash}`}
          >
            Open in blockchain.info
          </a>
        }
      />
      <CardContent>
        <InfoTable infos={infos} />
        <RawJSONAccordion src={transaction} />
      </CardContent>
    </Card>
  );
};
