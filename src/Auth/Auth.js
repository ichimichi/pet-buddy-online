import { LinearProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLoading = () => {
    setIsLoading((isLoading) => !isLoading);
  };
  return (
    <>
      {isLoading && <LinearProgress />}
      <Switch>
        <Route
          exact
          path="/auth/signup"
          render={(props) => (
            <SignUp toggleLoading={handleToggleLoading} {...props} />
          )}
        />
        <Route
          exact
          path="/auth"
          render={(props) => (
            <SignIn toggleLoading={handleToggleLoading} {...props} />
          )}
        />
      </Switch>
    </>
  );
};
