import React, { useState } from 'react';
import { useAppState } from './AppProvider/AppProvider';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

const App = ({ history }) => {
  const classes = useStyles();
  const { setLogged } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const logout = () => {
    setIsLoading(true);
    setLogged(false);
    localStorage.setItem('logged', false);
    localStorage.removeItem('token');
    history.push('/');
  };
  return (
    <>
      {isLoading && <LinearProgress />}
      <div>
        <Typography variant="h3" color="secondary">
          Hello there
        </Typography>
        <Button variant="outlined" color="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default App;
