import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useStyles } from './useStyles';
import { ItemForm } from './ItemForm';

export const ItemEdit = (props) => {
  const classes = useStyles();

  return (
    <Box my={6} mx={2}>
      <Grid
        className={classes.background}
        container
        direction="row"
        justify="center"
        spacing={4}
      >
        <ItemForm {...props} showPreview />
      </Grid>
    </Box>
  );
};
