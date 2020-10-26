import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppState } from '../AppProvider/AppProvider';
import { LinearProgress } from '@material-ui/core';

const UnAuthorizedRoute = ({ component, ...rest }) => {
  const { logged } = useAppState();

  if (logged === null) {
    return <LinearProgress />;
  } else if (logged === true) {
    return <Redirect to="/" push />;
  }

  return <Route component={component} {...rest} />;
};

export default UnAuthorizedRoute;
