import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";

export const IndexPage: React.FC = (props) => {
  return (
    <Grid
      container
      style={{
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        height: "100%",
        textAlign: "center",
      }}
    >
      <Grid item md={12}>
        <Typography variant='h3'>What are you searching for?</Typography>
      </Grid>
      <Grid item md={6} sm={6} xs={12}>
        <Typography variant="h4">
          <Link to="/address">Address</Link>
        </Typography>
      </Grid>
      <Grid item md={6} sm={6} xs={12}>
        <Box>
          <Typography variant="h4">
            <Link to="/transaction">Transaction</Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
