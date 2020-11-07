import React, { useState } from 'react';
import { useAppState } from '../../Provider/AppProvider';
import { Grid, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import { useStyles } from './useStyles';

export const ItemList = ({ history }) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Grid
        className={classes.background}
        container
        direction="column"
        justify="center"
        spacing={0}
      >
        <Grid item container direction="row" justify="center">
          <Grid item lg={3} md={6} sm={11} xs={11}></Grid>
        </Grid>
      </Grid>
    </>
  );
};
