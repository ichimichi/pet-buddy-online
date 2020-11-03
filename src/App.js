import React, { useState } from 'react';
import { useAppState } from './Provider/AppProvider';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Route, Switch } from 'react-router-dom';
import ItemRegistration from './Pages/Items/ItemRegistration';
import Cookies from 'universal-cookie';
import { NavBarWithRouter } from './Components/NavBar/NavBar';

const useStyles = makeStyles((theme) => ({}));

export const App = ({ history }) => {
  const classes = useStyles();
  const {} = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <LinearProgress />}
      <NavBarWithRouter />
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
    </>
  );
};
