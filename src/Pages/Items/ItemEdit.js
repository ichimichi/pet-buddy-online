import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';
import { useAppState } from '../../Provider/AppProvider';
import * as Yup from 'yup';
import { useStyles } from './useStyles';

export const ItemEdit = ({ history, match, toggleLoading }) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [oldItem, setOldItem] = useState(null);
  const [message, setMessage] = useState('');
  const [fetched, setFetched] = useState(false);

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
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: { ...values },
      withCredentials: true,
      url: `${apis.item}/${match.params.id}`,
    };

    try {
      const { data } = await Axios(options);
      console.log(data);
      toggleLoading();
      history.push('/item/list');
    } catch (e) {
      console.error(e);
      if (e.response.status === 401) {
        setMessage('Unauthorized');
      }
      toggleLoading();
    }
  };

  useEffect(() => {
    toggleLoading();
    const getItem = async () => {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        url: `${apis.item}/${match.params.id}`,
      };
      try {
        const { data } = await Axios(options);
        console.log(data);
        setOldItem(data);
        toggleLoading();
        setFetched(true);
      } catch (e) {
        console.error(e);
        toggleLoading();
      }
    };
    getItem();
  }, [apis.item]);

  return (
    <Grid className={classes.background} container direction="row">
      <Grid item xs={12}>
        <Box m={12}>
          <Paper elevation={1}>
            <Card>
              <CardContent>
                <Formik
                  initialValues={oldItem || initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                  enableReinitialize
                >
                  {(formik) => {
                    return (
                      <Form>
                        <Box my={3}>
                          <Typography variant="h3">
                            Item Edit
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
                        />
                        <Box my={4}>
                          <Button
                            type="submtit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            disabled={
                              !formik.isValid ||
                              formik.isSubmitting ||
                              !fetched
                            }
                          >
                            Update Item
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>
              </CardContent>
            </Card>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};
