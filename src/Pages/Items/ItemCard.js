import React from 'react';
import { useAppState } from '../../Provider/AppProvider';
import {
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
import { useModal } from 'react-modal-hook';
import { ConfirmDialog } from '../../Components/Modals/ConfirmDialog';

export const ItemCard = ({
  history,
  toggleLoading,
  isLoading,
  refresh,
  ...item
}) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [showConfirmModal, hideConfirmModal] = useModal(
    ({ in: open, onExited }) => (
      <ConfirmDialog
        open={open}
        onExited={onExited}
        title={`Are you sure you want to Delete ${item.name}?`}
        confirmLabel="Delete"
        onConfirm={() => deleteItem()}
        onCancel={hideConfirmModal}
        text="Deleting is irreversible"
      />
    ),
    [item]
  );

  const deleteItem = async () => {
    hideConfirmModal();
    toggleLoading();
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      url: `${apis.item}/${item._id}`,
    };

    try {
      const { data } = await Axios(options);
      refresh();
      toggleLoading();
    } catch (e) {
      console.error(e);
      toggleLoading();
    }
  };

  return (
    <Grid item xs={12} md={3}>
      <Paper elevation={1}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://www.gannett-cdn.com/-mm-/b2b05a4ab25f4fca0316459e1c7404c537a89702/c=0-0-1365-768/local/-/media/2019/01/18/USATODAY/usatsports/gettyimages-500740897.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
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
              disabled={isLoading || item.disabled}
              onClick={() => {
                history.push(`/item/edit/${item._id}`);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="secondary"
              disabled={isLoading || item.disabled}
              onClick={showConfirmModal}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  );
};
