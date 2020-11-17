import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { useStyles } from './useStyles';
import clsx from 'clsx';
import { navigations } from './navigations';
import { Cancel as CancelIcon } from '@material-ui/icons';

const SideBar = ({ opened, toggleDrawer, history, window }) => {
  const classes = useStyles();
  const isXS = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const getNavigation = (routes) => {
    return routes.map((navigation, index) => {
      return (
        <ListItem
          button
          onClick={() => {
            if (isXS) {
              toggleDrawer();
            }
            history.push(navigation.path);
          }}
          key={index}
        >
          <Tooltip title={navigation.name} placement="right">
            <ListItemIcon>{navigation.icon}</ListItemIcon>
          </Tooltip>
          <ListItemText primary={navigation.name} />
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
            <ListItem className={classes.root}>
              <Box my={2}>
                <Typography variant="h4" noWrap>
                  Pet Buddy Online
                </Typography>
              </Box>
              <div className={classes.grow} />
              <IconButton onClick={toggleDrawer}>
                <CancelIcon />
              </IconButton>
            </ListItem>
            <Divider />
            {getNavigation(navigations)}
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
          <List>{getNavigation(navigations)}</List>
        </Drawer>
      )}
    </nav>
  );
};

export const SideBarWithRouter = withRouter(SideBar);
