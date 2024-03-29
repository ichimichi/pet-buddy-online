import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const UnAuthorizedRoute = ({ component, ...rest }) => {
  const payload = new Cookies().get('payload');
  if (payload) return <Redirect push to="/" />;
  return <Route component={component} {...rest} />;
};
