import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useStyles } from './useStyles';

export const Home = () => {
  const classes = useStyles();

  return (
    <Box my={6} mx={2}>
      <Grid
        className={classes.background}
        container
        direction="row"
        spacing={4}
      >
        <Grid
          container
          item
          direction="column"
          xs={12}
          md={3}
          spacing={2}
        >
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Card>
                <CardContent className={classes.content}>
                  <Typography variant="h3">Welcome</Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Card>
                <CardContent
                  className={classes.content}
                ></CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={1}>
            <Card>
              <CardContent
                className={classes.contentBig}
              ></CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={1}>
            <Card>
              <CardContent className={classes.content}></CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={1}>
            <Card>
              <CardContent className={classes.content}></CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={1}>
            <Card>
              <CardContent className={classes.content}></CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={1}>
            <Card>
              <CardContent className={classes.content}></CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
