import React, { useState } from 'react';
import { useAppState } from './Provider/AppProvider';
import { LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ItemRegistration } from './Pages/Items/ItemRegistration';
import { NavBarWithRouter } from './Components/NavBar/NavBar';
import { ItemList } from './Pages/Items/ItemList';
import { ItemEdit } from './Pages/Items/ItemEdit';
import { Home } from './Pages/Home/Home';

const useStyles = makeStyles((theme) => ({}));

export const App = ({ history }) => {
  const classes = useStyles();
  const {} = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLoading = () => {
    setIsLoading((isLoading) => !isLoading);
  };

  return (
    <>
      <NavBarWithRouter />
      {isLoading && <LinearProgress />}
      <Switch>
        <Route exact path="/">
          {(props) => {
            return (
              <Home {...props} toggleLoading={handleToggleLoading} />
            );
          }}
        </Route>
        <Route exact path="/item/add">
          {(props) => {
            return (
              <ItemRegistration
                {...props}
                toggleLoading={handleToggleLoading}
              />
            );
          }}
        </Route>
        <Route exact path="/item/list/:page?">
          {(props) => {
            return (
              <ItemList
                {...props}
                toggleLoading={handleToggleLoading}
              />
            );
          }}
        </Route>
        <Route exact path="/item/edit/:id">
          {(props) => {
            return (
              <ItemEdit
                {...props}
                toggleLoading={handleToggleLoading}
              />
            );
          }}
        </Route>
        <Redirect to="/404" />
      </Switch>
    </>
  );
};
