import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
  AddBox as AddBoxIcon,
} from '@material-ui/icons';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { logout } from '../../Provider/AuthProvider';
import { useStyles } from './useStyles';

export const NavBar = ({ history }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Pet Buddy Online
        </Typography>
        <div className={classes.grow} />
        <IconButton
          color="inherit"
          onClick={() => {
            logout();
            history.push('/signin');
          }}
        >
          <ExitToAppIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            history.push('/itemReg');
          }}
        >
          <AddBoxIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export const NavBarWithRouter = withRouter(NavBar);
