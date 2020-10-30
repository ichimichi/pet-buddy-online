import React, { useState } from 'react';
import { useAppState } from './Provider/AppProvider';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Route, Switch } from 'react-router-dom';
import ItemRegistration from './Pages/Items/ItemRegistration';
import Cookies from 'universal-cookie';
import { NotFound } from './Pages/Errors/NotFound';

const useStyles = makeStyles((theme) => ({}));

export const App = ({ history }) => {
  const classes = useStyles();
  const { setLogged } = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true);
    setLogged(false);
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
