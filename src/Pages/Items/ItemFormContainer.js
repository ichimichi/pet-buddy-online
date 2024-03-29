import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
} from '@material-ui/core';
import React from 'react';
import { useStyles } from './useStyles';
import { ItemForm } from './ItemForm';

export const ItemFormContainer = ({
  toggleLoading,
  isLoading,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.background}
      container
      direction="row"
      justify="center"
      spacing={4}
    >
      <Grid item xs={12} md={6}>
        <Paper elevation={1}>
          <Card>
            <CardContent>
              <ItemForm {...{ toggleLoading, isLoading }} {...rest} />
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};
