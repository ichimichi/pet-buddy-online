import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { logout } from '../../Provider/AuthProvider';
import { SideBarWithRouter } from './SideBar';
import { useStyles } from './useStyles';
import clsx from 'clsx';
import { useAppState } from '../../Provider/AppProvider';
import Axios from 'axios';

export const NavBar = ({ history }) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);
  const { apis } = useAppState();
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState(null);
  const handleDrawerToggle = () => {
    setOpened(!opened);
  };

  const getProfile = async () => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      url: apis.user,
    };
    try {
      const { data } = await Axios(options);
      console.log('fetched profile', data);
      setUser(data);
      setFetched(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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
          <Typography variant="h7" color="inherit" noWrap>
            {fetched && `${user.firstName} ${user.lastName}`}
          </Typography>
          <Tooltip arrow title="Logout">
            <IconButton
              color="inherit"
              onClick={async () => {
                await logout();
                history.push('/auth');
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
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
