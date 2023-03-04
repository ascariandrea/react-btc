import { BLOCKCHAIN_INFO_WS } from "../constants";
import * as React from "react";
import useWebSocket from "react-use-websocket";
import { Box, Typography } from "@mui/material";
import { type BTCTransaction } from "../io/BTCTransaction";
import { Link } from "react-router-dom";

export const AddressInfo: React.FC<{ address: string }> = ({ address }) => {
  const [infos, setInfos] = React.useState<BTCTransaction[]>([]);
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(BLOCKCHAIN_INFO_WS);
  React.useEffect(() => {
    if (lastJsonMessage !== null) {
      const j: any = lastJsonMessage;
      if (j.op === "utx") {
        setInfos((infos) => {
          const exists = infos.some((i) => i.hash === j.x.hash);
          if (!exists) {
            return [j.x].concat(infos);
          }
          return infos;
        });
      }
    }
  }, [lastJsonMessage]);

  React.useEffect(() => {
    sendJsonMessage({ op: "addr_sub", address });
    sendJsonMessage({ op: "ping_tx" });
    return () => {
      sendJsonMessage({ op: "address_unsub", address });
    };
  }, []);

  return (
    <Box style={{ display: "flex", flexDirection: "column", padding: 20 }}>
      <Typography variant="h6">Latest transactions</Typography>
      <ul>
        {infos.map((i) => (
          <li key={i.hash}>
            <Link to={`/transaction/${i.hash}`}>{i.hash}</Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};
