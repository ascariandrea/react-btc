import { Typography } from "@mui/material";
import { formatDistanceToNow } from 'date-fns';
import * as React from 'react';

/**
 * Convert date in human readable format
 */
export const DateValue: React.FC<{ value: Date }> = (props) => {
  return (
    <Typography>
      {formatDistanceToNow(props.value, { addSuffix: true })} ({props.value.toISOString()})
    </Typography>
  );
};
