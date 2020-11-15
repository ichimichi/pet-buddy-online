import { Box, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppState } from '../../Provider/AppProvider';

export const ProfileContainer = ({ toggleLoading, isLoading }) => {
  const { apis } = useAppState();
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    toggleLoading();
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      url: apis.user,
    };
    try {
      const { data } = await Axios(options);
      console.log('fetched profile', data);
      setUser(data);
      setFetched(true);
      toggleLoading();
    } catch (e) {
      console.error(e);
      toggleLoading();
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      {fetched && (
        <Box m={4}>
          <Typography variant="h4">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
        </Box>
      )}
    </>
  );
};
