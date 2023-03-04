import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Card,
  CardContent,
  CardHeader,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { type AppError } from "../../errors/AppError";

/**
 * Display errors in an "error" Card
 */
export const ErrorBox: React.FC<{ err: AppError }> = ({ err: e }) => {
  // eslint-disable-next-line no-console
  console.error(e);
  const theme = useTheme();
  return (
    <Box>
      <Card
        variant="outlined"
        style={{
          background: alpha(theme.palette.error.light, 0.2),
        }}
      >
        <CardHeader title={e.name} subheader={<div>{e.message}</div>} />
        <CardContent>
          {e.details.length > 0 ? (
            <Accordion>
              <AccordionSummary>Details ({e.details.length})</AccordionSummary>
              <AccordionDetails>
                <ul>
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ) : null}
        </CardContent>
      </Card>
    </Box>
  );
};
