import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import AppProvider from './AppProvider/AppProvider';
import AuthorizedRoute from './Auth/Auth';
import SignIn from './Auth/SignIn';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <AuthorizedRoute path="/" component={App} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
