import React, { useState } from 'react';
import { useAppState } from '../Provider/AppProvider';
import classNames from 'classnames';
import {
  Button,
  Card,
  CardContent,
  Divider,
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
      data: values,
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
    <div className={classes.background}>
      {isLoading && <LinearProgress />}
      <div className={classNames(classes.content)}>
        <div className={classNames(classes.wrapper)}>
          <Card className={classes.root}>
            <CardContent>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <div>
                        <Typography variant="h3">Pet Buddy Online</Typography>
                        <Typography>
                          Welcome, Please enter the following details in order
                          to sign up
                        </Typography>
                      </div>
                      <div className="pt-3">
                        <Typography color="error">{message}</Typography>
                      </div>
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
                      <div className="pt-3 pb-1">
                        <Button
                          type="submtit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={!formik.isValid || formik.isSubmitting}
                        >
                          Sign Up
                        </Button>
                      </div>
                      <Divider />
                      <div className="pt-1">
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          onClick={() => history.push('/signin')}
                        >
                          Already have an account? Login
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
