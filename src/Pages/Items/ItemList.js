import React, { useEffect, useState } from 'react';
import { useAppState } from '../../Provider/AppProvider';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { useStyles } from './useStyles';
import Axios from 'axios';

export const ItemList = ({ history, match, toggleLoading }) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [items, setItems] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalDocs, seTotalDocs] = useState(null);
  const [totalPages, seTotalPages] = useState(null);
  let page = match.params.page ? match.params.page : 1;

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
      console.log(data);
      if (!data.docs.length) {
        page = null;
        history.push(`/item/list`);
        getItems();
        return;
      }
      seTotalDocs(data.totalDocs);
      seTotalPages(data.totalPages);
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
  }, []);

  const deleteItem = async (id) => {
    toggleLoading();
    setDeleting(true);
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      url: `${apis.item}/${id}`,
    };

    try {
      const { data } = await Axios(options);
      if (totalDocs % 4 === 1 && page === totalPages) {
        page--;
        history.push(`/item/list/${page}`);
      }
      getItems();
      setDeleting(false);
    } catch (e) {
      console.error(e);
      setDeleting(false);
    }
  };

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
                <Grid item xs={12} sm={4} md={3} key={item._id}>
                  <Paper elevation={1}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image="https://www.gannett-cdn.com/-mm-/b2b05a4ab25f4fca0316459e1c7404c537a89702/c=0-0-1365-768/local/-/media/2019/01/18/USATODAY/usatsports/gettyimages-500740897.jpg"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            className={classes.description}
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {item.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => {
                            history.push(`/item/edit/${item._id}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => {
                            deleteItem(item._id);
                          }}
                          disabled={deleting}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Paper>
                </Grid>
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
