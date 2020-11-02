import React, { useState } from 'react';
import { useAppState } from './Provider/AppProvider';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Route, Switch } from 'react-router-dom';
import ItemRegistration from './Pages/Items/ItemRegistration';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({}));

export const App = ({ history }) => {
  const classes = useStyles();
  const {} = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true);
    const cookies = new Cookies();
    cookies.remove('payload');
    cookies.remove('XSRF-TOKEN');
    cookies.remove('_csrf');
    history.push('/signin');
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <div>
        <Button variant="outlined" color="secondary" onClick={logout}>
          Logout
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => history.push('/itemReg')}
        >
          Item Registration
        </Button>
        <Switch>
          <Route exact path="/">
            {(props) => {
              return <Typography variant="h4">Hello there</Typography>;
            }}
          </Route>
          <Route exact path="/itemReg">
            {(props) => {
              return <ItemRegistration {...props} />;
            }}
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>
    </>
  );
};
