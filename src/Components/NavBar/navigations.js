import React from 'react';
import {
  AddBox as AddBoxIcon,
  Home as HomeIcon,
  AmpStories as AmpStoriesIcon,
  ViewList as ViewListIcon,
  AccountBox as AccountBoxIcon,
} from '@material-ui/icons';

export const navigations = [
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
  {
    path: '/user/profile',
    icon: <AccountBoxIcon />,
    name: 'Profile',
  },
];
