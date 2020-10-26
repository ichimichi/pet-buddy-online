import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import AppProvider from './AppProvider/AppProvider';
import AuthorizedRoute from './Auth/AuthorizedRoute';
import UnAuthorizedRoute from './Auth/UnAuthorizedRoute';
import SignIn from './Auth/SignIn';
import NotFound from './Pages/Errors/NotFound';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <UnAuthorizedRoute exact path="/signin" component={SignIn} />
          <AuthorizedRoute exact path="/" component={App} />
          <Route component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
