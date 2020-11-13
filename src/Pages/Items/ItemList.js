import React, { useEffect, useState } from 'react';
import { useAppState } from '../../Provider/AppProvider';
import { Box, Button, Grid } from '@material-ui/core';
import { useStyles } from './useStyles';
import Axios from 'axios';
import { ItemCard } from './ItemCard';

export const ItemList = ({
  history,
  match,
  toggleLoading,
  isLoading,
}) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [items, setItems] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  let page = match.params.page ? match.params.page : 1;

  const [render, setRender] = useState(false);

  const getItems = async () => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      params: {
        page: page,
      },
      url: apis.item,
    };

    try {
      const { data } = await Axios(options);
      if (!data.docs.length) {
        page = null;
        history.push(`/item/list`);
        getItems();
        return;
      }
      setPrevPage(data.prevPage);
      setNextPage(data.nextPage);
      setItems(data.docs);
      setFetched(true);
      toggleLoading();
    } catch (e) {
      console.error(e);
    }
  };

  const handleNext = () => {
    toggleLoading();
    page++;
    history.push(`/item/list/${page}`);
    getItems();
  };

  const handlePrevious = () => {
    toggleLoading();
    page--;
    history.push(`/item/list/${page}`);
    getItems();
  };

  useEffect(() => {
    toggleLoading();
    getItems();
  }, [render]);

  const refresh = () => setRender((render) => !render);

  return (
    <Grid
      className={classes.background}
      container
      direction="column"
      justify="center"
      spacing={0}
    >
      {fetched && (
        <Box m={4}>
          <Grid item container direction="row" spacing={3}>
            {items.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  {...item}
                  {...{
                    refresh,
                    history,
                    toggleLoading,
                    isLoading,
                  }}
                />
              );
            })}
          </Grid>
          <Box m={8}>
            <Grid item container spacing={4} xs={12} justify="center">
              {prevPage && (
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handlePrevious}
                    color="primary"
                  >
                    Previous
                  </Button>
                </Grid>
              )}
              {nextPage && (
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </Grid>
  );
};
