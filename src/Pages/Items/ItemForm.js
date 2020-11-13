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
import { ItemCard } from './ItemCard';

export const ItemForm = ({
  isEdit = false,
  toggleLoading,
  match,
  history,
  showPreview,
}) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [oldItem, setOldItem] = useState(null);
  const [message, setMessage] = useState('');

  const placeHolder = {
    name: 'A cup of Coffee',
    description: 'This is a very nice item to have.',
  };

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
    console.log(values);
    const options = isEdit
      ? {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          data: { ...values },
          withCredentials: true,
          url: `${apis.item}/${match.params.id}`,
        }
      : {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: { ...values },
          withCredentials: true,
          url: apis.item,
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
    if (isEdit) {
      toggleLoading();
    }
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
      } catch (e) {
        console.error(e);
        toggleLoading();
      }
    };
    if (isEdit) {
      getItem();
    }
  }, [apis.item]);

  return (
    <Formik
      initialValues={oldItem || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <>
            <Grid item xs={12} md={6}>
              <Paper elevation={1}>
                <Card>
                  <CardContent className={classes.content}>
                    <Form>
                      <Box my={3}>
                        <Typography variant="h3">
                          {isEdit ? 'Item Edit' : 'Item Registration'}
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
                          {isEdit ? ' Update Item' : 'Register Item'}
                        </Button>
                      </Box>
                    </Form>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            {showPreview && (
              <ItemCard
                name={
                  isEdit
                    ? formik.values.name
                    : formik.values.name || placeHolder.name
                }
                description={
                  isEdit
                    ? formik.values.description
                    : formik.values.description ||
                      placeHolder.description
                }
                disabled
              />
            )}
          </>
        );
      }}
    </Formik>
  );
};
