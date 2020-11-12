import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { logout } from '../../Provider/AuthProvider';
import { SideBarWithRouter } from './SideBar';
import { useStyles } from './useStyles';
import clsx from 'clsx';

export const NavBar = ({ history }) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  const handleDrawerToggle = () => {
    setOpened(!opened);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: opened,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Pet Buddy Online
          </Typography>
          <div className={classes.grow} />
          <IconButton
            color="inherit"
            onClick={async () => {
              await logout();
              history.push('/auth');
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideBarWithRouter
        opened={opened}
        toggleDrawer={handleDrawerToggle}
      />
    </>
  );
};

export const NavBarWithRouter = withRouter(NavBar);
