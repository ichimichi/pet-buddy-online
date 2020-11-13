import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import {
  AddBox as AddBoxIcon,
  Home as HomeIcon,
  AmpStories as AmpStoriesIcon,
  ViewList as ViewListIcon,
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { useStyles } from './useStyles';
import clsx from 'clsx';

const SideBar = ({ opened, toggleDrawer, history, window }) => {
  const classes = useStyles();
  const isXS = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const routes = [
    { path: '/', icon: <HomeIcon />, name: 'Home' },
    {
      path: '/item/add',
      icon: <AddBoxIcon />,
      name: 'Item Registration',
    },
    {
      path: '/item/list',
      icon: <AmpStoriesIcon />,
      name: 'Item List',
    },
    {
      path: '/item/table',
      icon: <ViewListIcon />,
      name: 'Item Table',
    },
  ];

  const getRoutes = (routes) => {
    return routes.map((route, index) => {
      return (
        <ListItem
          button
          onClick={() => {
            if (isXS) {
              toggleDrawer();
            }
            history.push(route.path);
          }}
          key={index}
        >
          <ListItemIcon>{route.icon}</ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItem>
      );
    });
  };

  return (
    <nav className={classes.drawer}>
      {isXS ? (
        <Drawer
          container={container}
          variant="temporary"
          anchor="top"
          open={opened}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <List>
            <ListItem>
              <Box my={2}>
                <Typography variant="h4">Pet Buddy Online</Typography>
              </Box>
            </ListItem>
            <Divider />
            {getRoutes(routes)}
          </List>
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: opened,
            [classes.drawerClose]: !opened,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: opened,
              [classes.drawerClose]: !opened,
            }),
          }}
        >
          <div className={classes.toolbar} />
          <List>{getRoutes(routes)}</List>
        </Drawer>
      )}
    </nav>
  );
};

export const SideBarWithRouter = withRouter(SideBar);
