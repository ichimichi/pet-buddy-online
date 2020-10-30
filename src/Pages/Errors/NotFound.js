import { Link } from 'react-router-dom';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './useStyles';

export const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <div className={classes.content}>
        <Typography className={classes.title}>404</Typography>
        <Typography className={classes.subtitle}>Page not found!</Typography>
        <Typography variant="caption">
          Sorry, but the page you were trying to view does not exist.{' '}
          <Link to="/">Report this error?</Link>
        </Typography>
      </div>
    </div>
  );
};
