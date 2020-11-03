import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import {
  Menu as MenuIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
} from '@material-ui/icons';
import React from 'react';
import { useStyles } from './useStyles';

export const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Pet Buddy Online
        </Typography>
        <div className={classes.grow} />
        <IconButton aria-label="show 4 new mails" color="inherit">
          <MailIcon />
        </IconButton>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <NotificationsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
