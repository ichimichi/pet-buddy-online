import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import AppProvider from './Provider/AppProvider';
import AuthorizedRoute from './Auth/AuthorizedRoute';
import UnAuthorizedRoute from './Auth/UnAuthorizedRoute';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import NotFound from './Pages/Errors/NotFound';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <UnAuthorizedRoute exact path="/signin" component={SignIn} />
          <UnAuthorizedRoute exact path="/signup" component={SignUp} />
          <AuthorizedRoute path="/" component={App} />
          <Route component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
