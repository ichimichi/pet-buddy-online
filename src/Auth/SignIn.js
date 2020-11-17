import React, { useEffect, useState } from 'react';
import { useAppState } from '../Provider/AppProvider';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { useStyles } from './useStyles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export const SignIn = ({ history, toggleLoading }) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [message, setMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('email is required'),
    password: Yup.string().required('password is required'),
  });

  const onSubmit = async (values, onSubmitProps) => {
    toggleLoading();

    const options = {
      method: 'POST',
      headers: {},
      withCredentials: true,
      data: { ...values },
      url: apis.signin,
    };

    try {
      await axios(options);
      enqueueSnackbar('Welcome');
      history.push('/');
    } catch (e) {
      console.error(e);
      if (e.response.status === 401) {
        setMessage('Invalid E-mail or password combination!');
        enqueueSnackbar('Invalid E-mail or password combination!');
      }
    }
    toggleLoading();
  };

  useEffect(() => {
    const getCsrf = async () => {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        withCredentials: true,
        data: {},
        url: 'https://127.0.0.1:8089/',
      };
      await axios(options);
    };
    getCsrf();
  }, []);

  return (
    <Grid
      className={classes.background}
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={0}
    >
      <Grid item lg={3} md={6} sm={11} xs={11}>
        <Paper>
          <Card>
            <CardContent className={classes.content}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <Box my={4}>
                        <Typography variant="h3">
                          Pet Buddy Online
                        </Typography>
                      </Box>
                      <Typography>
                        Welcome, Please Login in order to continue
                      </Typography>
                      <Typography color="error">{message}</Typography>
                      <Field
                        component={TextField}
                        name="email"
                        type="email"
                        label="E-mail"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                      <Field
                        component={TextField}
                        name="password"
                        type="password"
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                      <Box my={2}>
                        <Button
                          type="submtit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={
                            !formik.isValid || formik.isSubmitting
                          }
                        >
                          Login
                        </Button>
                      </Box>
                      <Divider />
                      <Box my={2}>
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          onClick={() => history.push('/auth/signup')}
                        >
                          New User? Create new Account
                        </Button>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};
