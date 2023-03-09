import { Box, List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import QueriesRenderer from '../components/common/QueriesRenderer';
import { type AddToWatchListProps, useWatchListAll } from "../state/queries";
import * as React from 'react';

export const WatchList: React.FC<{ type: AddToWatchListProps["type"] }> = ({
  type,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1">Watched {type}</Typography>
      <QueriesRenderer
        queries={{ watched: useWatchListAll(type) }}
        render={({ watched }) => {
          return watched.length > 0? (
            <List>
              {watched.map((w) => (
                <ListItem key={w.id}>
                  <Link to={`/${type}/${w.id}`}>{w.id.substring(0, 6)}</Link>
                </ListItem>
              ))}
            </List>
          ) : <Typography>No {type} on watch list</Typography>;
        }}
      />
    </Box>
  );
};
