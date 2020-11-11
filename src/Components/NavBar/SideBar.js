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
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { useStyles } from './useStyles';

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
      icon: <AddBoxIcon />,
      name: 'Item List',
    },
  ];

  const getRoutes = (routes) => {
    return routes.map((route, index) => {
      return (
        <ListItem
          button
          onClick={() => {
            toggleDrawer();
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
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
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
      )}
    </nav>
  );
};

export const SideBarWithRouter = withRouter(SideBar);
