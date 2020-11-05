import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { AddBox as AddBoxIcon, Home as HomeIcon } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

const SideBar = ({ opened, toggleDrawer, history }) => {
  return (
    <Drawer anchor="left" open={opened} onClose={toggleDrawer}>
      <List>
        <ListItem>
          <Box my={2}>
            <Typography variant="h4">Pet Buddy Online</Typography>
          </Box>
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            toggleDrawer();
            history.push('/');
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Typography>Home</Typography>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            toggleDrawer();
            history.push('/itemReg');
          }}
        >
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <Typography>Item Registration</Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export const SideBarWithRouter = withRouter(SideBar);
