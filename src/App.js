import React, { useState } from 'react';
import { useAppState } from './Provider/AppProvider';
import { LinearProgress } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NavBarWithRouter } from './Components/NavBar/NavBar';
import { ItemList } from './Pages/Items/ItemList';
import { ItemEdit } from './Pages/Items/ItemEdit';
import { Home } from './Pages/Home/Home';
import { useStyles } from './Components/NavBar/useStyles';
import { ItemTable } from './Pages/Items/ItemTable';

export const App = ({ history }) => {
  const classes = useStyles();
  const {} = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLoading = () => {
    setIsLoading((isLoading) => !isLoading);
  };

  const extra = {
    toggleLoading: handleToggleLoading,
    isLoading: isLoading,
  };

  return (
    <div className={classes.root}>
      <NavBarWithRouter />

      <main className={classes.grow}>
        <div className={classes.toolbar} />
        {isLoading && <LinearProgress />}
        <Switch>
          <Route
            exact
            path="/"
            key="dashboard"
            render={(props) => <Home {...props} {...extra} />}
          />
          <Route
            exact
            path="/item/add"
            key="itemAdd"
            render={(props) => <ItemEdit {...props} {...extra} />}
          />
          <Route
            exact
            path="/item/edit/:id"
            key="itemEdit"
            render={(props) => (
              <ItemEdit isEdit {...props} {...extra} />
            )}
          />
          <Route
            exact
            path="/item/list/:page?"
            key="itemList"
            render={(props) => <ItemList {...props} {...extra} />}
          />
          <Route
            exact
            path="/item/table/:page?"
            key="itemTable"
            render={(props) => <ItemTable {...props} {...extra} />}
          />
          <Redirect to="/404" />
        </Switch>
      </main>
    </div>
  );
};
