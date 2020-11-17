import React, { useState } from 'react';
import { useAppState } from './Provider/AppProvider';
import { Box, LinearProgress } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NavBarWithRouter } from './Components/NavBar/NavBar';
import { useStyles } from './Components/NavBar/useStyles';
import { Footer } from './Components/Footer/Footer';
import { routes } from './Routes/routes';

export const App = () => {
  const classes = useStyles();
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
        <Box mx={4} mt={4} mb={6}>
          <Switch>
            {routes.map(
              (
                { component: Component, path, exact, ...route },
                index
              ) => (
                <Route
                  key={index}
                  path={path}
                  exact={exact}
                  render={(props) => (
                    <Component {...route} {...extra} {...props} />
                  )}
                />
              )
            )}
            <Redirect to="/404" />
          </Switch>
        </Box>
      </main>
      <Footer />
    </div>
  );
};
