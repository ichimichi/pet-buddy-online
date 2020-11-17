import { Box, Button, Typography } from '@material-ui/core';
import Axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';
import { useAppState } from '../../Provider/AppProvider';
import * as Yup from 'yup';
import { useStyles } from './useStyles';
import { useSnackbar } from 'notistack';

export const ItemForm = ({
  id,
  isEdit = false,
  toggleLoading,
  isLoading,
  refresh,
  onCancel,
  history,
  ...rest
}) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [oldItem, setOldItem] = useState(null);
  const [message, setMessage] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { ...values },
      withCredentials: true,
      url: isEdit ? `${apis.item}/${id}` : apis.item,
    };

    try {
      const { data } = await Axios(options);

      console.log(isEdit ? 'updated' : 'added', data);
      if (isEdit) {
        refresh();
        enqueueSnackbar('Item updated!');
        onCancel();
      }
      toggleLoading();
      if (!isEdit) {
        enqueueSnackbar('Item added!');
        history.push('/item/table');
      }
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
        url: `${apis.item}/${id}`,
      };
      try {
        const { data } = await Axios(options);
        console.log('fetched one', data);
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
            <Box mb={3}>
              {message ? (
                <Typography variant="h3" color="error">
                  {message}
                </Typography>
              ) : (
                <Typography variant="h3">
                  {isEdit ? 'Item Edit' : 'Item Registration'}
                </Typography>
              )}
            </Box>
            <Form>
              <div className="pt-3"></div>
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
                    !formik.isValid ||
                    formik.isSubmitting ||
                    isLoading
                  }
                >
                  {isEdit ? ' Update Item' : 'Register Item'}
                </Button>
              </Box>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
