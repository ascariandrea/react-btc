import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader
} from "@mui/material";
import { Box } from "@mui/system";
import { RawJSONAccordion } from '../components/RawJSONAccordion';
import * as React from "react";
import { Link } from "react-router-dom";
import { AddToWatchListButton } from "../components/buttons/AddToWatchListButton";
import { CurrencyValue } from "../components/common/CurrencyValue";
import { InfoTable } from "../components/common/InfoTable";
import QueriesRenderer from "../components/common/QueriesRenderer";
import { toAddressInfo } from "../helpers/address.helper";
import {
  useBTCAddress,
  useWatchList,
  type AddToWatchListProps
} from "../state/queries";
import { AddressInfo } from "./AddressInfo";

export interface AddressProps {
  address: string;
  onWatchToggle?: (p: AddToWatchListProps) => void;
}

export const Address: React.FC<AddressProps> = ({ address, onWatchToggle }) => {
  return (
    <QueriesRenderer
      queries={{
        address: useBTCAddress(address),
        addressWatchList: useWatchList({ type: "address", id: address }),
      }}
      render={({ address, addressWatchList }) => {
        const info = toAddressInfo(address);
        return (
          <Box>
            <Card>
              <CardHeader
                title={address.address}
                subheader={
                  <a
                    href={`https://www.blockchain.com/explorer/address/btc/${address.address}`}
                  >
                    Open in blockchain.info
                  </a>
                }
              />
              <CardActionArea>
                <CardActions>
                  <AddToWatchListButton
                    type="address"
                    id={address.address}
                    onToggle={onWatchToggle}
                  />
                </CardActions>
              </CardActionArea>
              <CardContent>
                <InfoTable
                  infos={[
                    {
                      label: "Total spent",
                      value: <CurrencyValue value={info.totals.spent} />,
                    },
                    {
                      label: "Total received",
                      value: <CurrencyValue value={info.totals.received} />,
                    },
                    {
                      label: "Total unspent",
                      value: <CurrencyValue value={info.totals.unspent} />,
                    },
                    {
                      label: "Total Transactions",
                      value: info.totals.tx,
                    },
                  ]}
                />
                <ul>
                  {address.txs.map((t) => (
                    <li key={t.hash}>
                      <Link to={`/transaction/${t.hash}`}>{t.hash}</Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <RawJSONAccordion src={address} />
            </Card>
            {addressWatchList !== null ? (
              <AddressInfo address={address.address} />
            ) : null}
          </Box>
        );
      }}
    />
  );
};
