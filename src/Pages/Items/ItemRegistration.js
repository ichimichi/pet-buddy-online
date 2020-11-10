import React, { useState } from 'react';
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
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useStyles } from './useStyles';
import { TextField } from 'formik-material-ui';

export const ItemRegistration = ({ history, toggleLoading }) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [placeHolder, setPlaceHolder] = useState({
    name: 'A cup of Coffee',
    description: 'This is a very nice item to have.',
  });
  const [message, setMessage] = useState('');

  const initialValues = {
    name: '',
    description: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
  });

  const onSubmit = async (values, onSubmitProps) => {
    toggleLoading();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: { ...values },
      withCredentials: true,
      url: apis.item,
    };

    try {
      const { data } = await axios(options);
      console.log(data);
      history.push('/item/list');
    } catch (e) {
      console.error(e);
      if (e.response.status === 401) {
        setMessage('Unauthorized');
      }
    }
    toggleLoading();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Box my={6} mx={2}>
            <Grid
              className={classes.background}
              container
              direction="row"
              justify="center"
              spacing={4}
            >
              <Grid item xs={12} md={6}>
                <Paper elevation={1}>
                  <Card>
                    <CardContent className={classes.content}>
                      <Form>
                        <Box my={3}>
                          <Typography variant="h3">
                            Item Registration
                          </Typography>
                        </Box>
                        <div className="pt-3">
                          <Typography color="error">
                            {message}
                          </Typography>
                        </div>
                        <Field
                          component={TextField}
                          name="name"
                          type="text"
                          label="Item Name"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                        />
                        <Field
                          component={TextField}
                          name="description"
                          type="text"
                          label="Description"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                        />
                        <Box my={4}>
                          <Button
                            type="submtit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            disabled={
                              !formik.isValid || formik.isSubmitting
                            }
                          >
                            Register Item
                          </Button>
                        </Box>
                      </Form>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
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
                          {formik.values.name || placeHolder.name}
                        </Typography>
                        <Typography
                          className={classes.description}
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {formik.values.description ||
                            placeHolder.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="secondary" disabled>
                        Edit
                      </Button>
                      <Button size="small" color="secondary" disabled>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      }}
    </Formik>
  );
};
