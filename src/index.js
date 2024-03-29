import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './Provider/AppProvider';
import { ModalProvider } from 'react-modal-hook';
import { AuthorizedRoute } from './Auth/AuthorizedRoute';
import { UnAuthorizedRoute } from './Auth/UnAuthorizedRoute';
import { NotFound } from './Pages/Errors/NotFound';
import { CssBaseline } from '@material-ui/core';
import { Auth } from './Auth/Auth';
import { TransitionGroup } from 'react-transition-group';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AppProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <ModalProvider rootComponent={TransitionGroup}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/404" component={NotFound} />
              <UnAuthorizedRoute path="/auth" component={Auth} />
              <AuthorizedRoute path="/" component={App} />
              <Redirect to="/" />
            </Switch>
          </BrowserRouter>
        </ModalProvider>
      </SnackbarProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
