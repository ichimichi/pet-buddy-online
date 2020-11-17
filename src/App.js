import React, { useState } from 'react';
import { useAppState } from './Provider/AppProvider';
import { Box, LinearProgress } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NavBarWithRouter } from './Components/NavBar/NavBar';
import { ItemList } from './Pages/Items/ItemList';
import { ItemFormContainer } from './Pages/Items/ItemFormContainer';
import { Home } from './Pages/Home/Home';
import { useStyles } from './Components/NavBar/useStyles';
import { ItemTable } from './Pages/Items/ItemTable';
import { ProfileContainer } from './Pages/Profile/ProfileContainer';
import { Footer } from './Components/Footer/Footer';

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
        <Box mx={4} my={6}>
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
              render={(props) => (
                <ItemFormContainer {...props} {...extra} />
              )}
            />
            <Route
              exact
              path="/item/edit/:id"
              key="itemEdit"
              render={(props) => (
                <ItemFormContainer isEdit {...props} {...extra} />
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
            <Route
              exact
              path="/user/profile/:id?"
              key="profile"
              render={(props) => (
                <ProfileContainer {...props} {...extra} />
              )}
            />
            <Redirect to="/404" />
          </Switch>
        </Box>
      </main>
      <Footer />
    </div>
  );
};
