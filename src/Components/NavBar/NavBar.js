import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';
import { tr } from 'date-fns/locale';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { logout } from '../../Provider/AuthProvider';
import { SideBarWithRouter } from './SideBar';
import { useStyles } from './useStyles';

export const NavBar = ({ history }) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  const handleDrawerToggle = () => {
    setOpened(!opened);
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <SideBarWithRouter opened={opened} toggleDrawer={handleDrawerToggle} />

        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
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
        </Toolbar>
      </AppBar>
    </>
  );
};

export const NavBarWithRouter = withRouter(NavBar);
