import { Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useStyles } from './useStyles';

export const Footer = () => {
  const classes = useStyles();
  const isXS = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  return (
    <div className={classes.footer}>
      <Typography variant="subtitle1">
        Copyright © 2020 by Ichimichi Inc. All Rights Reserved.
      </Typography>
    </div>
  );
};
