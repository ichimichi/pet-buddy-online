import React from 'react';
import { useAppState } from '../Provider/AppProvider';

import { Redirect, Route } from 'react-router-dom';

export const UnAuthorizedRoute = ({ component, ...rest }) => {
  const { logged } = useAppState();

  if (logged === null) return <div>Loading...</div>;
  if (logged) return <Redirect push to="/" />;
  return <Route component={component} {...rest} />;
};
