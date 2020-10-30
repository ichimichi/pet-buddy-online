import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { appTheme } from './appTheme';
import Cookies from 'universal-cookie';

const Context = createContext();
const { Provider } = Context;

export const AppProvider = ({ children }) => {
  const serverAddress = 'https://127.0.0.1:8089';
  const apis = {
    signin: serverAddress + '/signin',
    signup: serverAddress + '/signup',
    item: serverAddress + '/api/item',
  };
  return (
    <ThemeProvider theme={appTheme}>
      <Provider value={{ apis }}>{children}</Provider>
    </ThemeProvider>
  );
};

export const useAppState = () => useContext(Context);
