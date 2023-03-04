import {
  AppBar,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme
} from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { a11yProps } from "./components/common/TabPanel";
import { CurrencyContext } from "./components/context/CurrencyContext";
import { NotificationSnackbar } from "./containers/NotificationSnackbar";
import { AddressSearchPage } from "./pages/AddressSearchPage";
import { IndexPage } from "./pages/IndexPage";
import { TransactionSearchPage } from "./pages/TransactionSearchPage";
import { type AddToWatchListProps } from "./state/queries";

export const App: React.FC = () => {
  const tab = React.useMemo(
    () => (window.location.href.includes("transaction") ? 1 : 0),
    [window.location.href]
  );
  const theme = useTheme();

  const { currency, setCurrency } = React.useContext(CurrencyContext);

  const navigateTo = useNavigate();

  const handleAddressWatchToggle = (p: AddToWatchListProps): void => {
    // sendJsonMessage({ op: "addr_sub", addr: p.id }, true);
  };

  return (
    <div style={{ height: "100%" }}>
      <AppBar>
        <Toolbar>
          <Grid container style={{ alignItems: "center" }}>
            <Grid item md={2}>
              <Typography
                variant="h5"
                component="h1"
                style={{ marginBottom: 0, cursor: "pointer" }}
                onClick={() => {
                  navigateTo("/");
                }}
              >
                React APP BTC
              </Typography>
            </Grid>
            <Grid
              item
              md={9}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Tabs value={tab}>
                <Tab
                  label="Address"
                  value={0}
                  {...a11yProps(0)}
                  onClick={() => {
                    navigateTo("/address");
                  }}
                />
                <Tab
                  label="Transaction"
                  value={1}
                  {...a11yProps(1)}
                  onClick={() => {
                    navigateTo("/transaction");
                  }}
                />
              </Tabs>
            </Grid>
            <Grid item md={1}>
              <Select
                labelId="currency-label"
                label="Currency"
                value={currency}
                size="small"
                onChange={(e, c) => {
                  setCurrency(e.target.value);
                }}
                style={{
                  background: theme.palette.common.white,
                }}
              >
                <MenuItem value="BTC">BTC</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Container
        style={{
          marginTop: 64,
          height: "calc(100% - 64px)",
        }}
      >
        <Routes>
          <Route
            path="/address/:address?"
            element={
              <AddressSearchPage onWatchToggle={handleAddressWatchToggle} />
            }
          />
          <Route
            path="/transaction/:transaction?"
            element={<TransactionSearchPage />}
          />
          <Route path="*" element={<IndexPage />} />
        </Routes>
        <NotificationSnackbar />
      </Container>
    </div>
  );
};
