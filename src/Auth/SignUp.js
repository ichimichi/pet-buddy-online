import React, { useState } from 'react';
import { useAppState } from '../Provider/AppProvider';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useStyles } from './useStyles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField } from 'formik-material-ui';

export const SignUp = ({ history }) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid e-mail adddress')
      .required('E-mail is required'),
    password: Yup.string()
      .min(8, 'Password too short')
      .required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please enter password again to verify'),
  });

  const onSubmit = async (
    { passwordConfirmation, ...values },
    onSubmitProps
  ) => {
    setIsLoading(true);
    const options = {
      method: 'POST',
      headers: {},
      withCredentials: true,
      data: { ...values },
      url: apis.signup,
    };

    try {
      await axios(options);
      history.push('/');
    } catch (e) {
      console.error(e);
      if (e.response.status === 400) {
        setMessage('User with provided e-mail already exists');
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <Grid
        className={classes.background}
        container
        direction="column"
        justify="center"
        spacing={0}
      >
        <Grid item container direction="row" justify="center">
          <Grid item lg={3} md={6} sm={11} xs={11}>
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
                          <Typography variant="h3">Pet Buddy Online</Typography>
                        </Box>
                        <Typography>
                          Welcome, Please enter the following details in order
                          to sign up
                        </Typography>
                        <Typography color="error">{message}</Typography>
                        <Field
                          component={TextField}
                          name="firstName"
                          type="text"
                          label="First Name"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                        />
                        <Field
                          component={TextField}
                          name="lastName"
                          type="text"
                          label="Last Name"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                        />
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
                        <Field
                          component={TextField}
                          name="passwordConfirmation"
                          type="password"
                          label="Verify password"
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
                            disabled={!formik.isValid || formik.isSubmitting}
                          >
                            Sign Up
                          </Button>
                        </Box>
                        <Divider />
                        <Box my={2}>
                          <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={() => history.push('/signin')}
                          >
                            Already have an account? Login
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
