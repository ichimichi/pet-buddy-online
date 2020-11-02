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
import { Formik, Form } from 'formik';
import FormikControl from '../Components/Formik/FormikControl';
import * as Yup from 'yup';
import axios from 'axios';

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
          <Grid item l={4} md={5} sm={8} xs={11}>
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
                        <FormikControl
                          control="input"
                          name="firstName"
                          label="First Name"
                        />
                        <FormikControl
                          control="input"
                          name="lastName"
                          label="Last Name"
                        />
                        <FormikControl
                          control="input"
                          name="email"
                          label="E-mail"
                        />
                        <FormikControl
                          control="input"
                          name="password"
                          label="Password"
                          type="password"
                        />
                        <FormikControl
                          control="input"
                          name="passwordConfirmation"
                          label="Verify password"
                          type="password"
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
