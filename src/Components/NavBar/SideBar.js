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

const SideBar = ({ opened, toggleDrawer, history }) => {
  const isXS = useMediaQuery((theme) => theme.breakpoints.down('xs'));

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
    <Drawer
      anchor={isXS ? 'top' : 'left'}
      open={opened}
      onClose={toggleDrawer}
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
  );
};

export const SideBarWithRouter = withRouter(SideBar);
