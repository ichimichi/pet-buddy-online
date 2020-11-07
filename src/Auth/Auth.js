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
        <Route exact path="/auth/signup">
          {(props) => {
            return <SignUp toggleLoading={handleToggleLoading} {...props} />;
          }}
        </Route>
        <Route exact path="/auth">
          {(props) => {
            return <SignIn toggleLoading={handleToggleLoading} {...props} />;
          }}
        </Route>
      </Switch>
    </>
  );
};
