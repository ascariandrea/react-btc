import { Grid, Typography } from "@mui/material";
import * as React from "react";

/**
 * Display any infos
 */
interface InfoTableProps {
  infos: Array<{ label: string; value: React.ReactNode }>;
  columns?: {
    label: number;
    value: number;
  };
}
export const InfoTable: React.FC<InfoTableProps> = ({ infos, columns }) => {
  const labelColumn = columns?.label ?? 2;
  const valueColumn = columns?.label ?? 10;
  return (
    <Grid container>
      {infos.map((i, n) => [
        <Grid key={`${i.label}-${n}`} item md={labelColumn} style={{ marginBottom: 20 }}>
          <Typography variant="subtitle2">{i.label}</Typography>
        </Grid>,
        <Grid
          key={`${i.label}-value`}
          item
          md={valueColumn}
          style={{ marginBottom: 20 }}
        >
          {i.value}
        </Grid>,
      ])}
    </Grid>
  );
};
