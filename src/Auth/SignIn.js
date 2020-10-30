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

export const SignIn = ({ history }) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('email is required'),
    password: Yup.string().required('password is required'),
  });
  const onSubmit = async (values, onSubmitProps) => {
    setIsLoading(true);
    const options = {
      method: 'POST',
      headers: {},
      withCredentials: true,
      data: values,
      url: apis.signin,
    };

    try {
      await axios(options);
      history.push('/');
    } catch (e) {
      console.error(e);
      if (e.response.status === 401) {
        setMessage('Invalid E-mail or password combination!');
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
                          Welcome, Please Login in order to continue
                        </Typography>
                      </div>
                      <div className="pt-3">
                        <Typography color="error">{message}</Typography>
                      </div>
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
                      <div className="pt-3 pb-1">
                        <Button
                          type="submtit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={!formik.isValid || formik.isSubmitting}
                        >
                          Login
                        </Button>
                      </div>
                      <Divider />
                      <div className="pt-1">
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          onClick={() => history.push('/signup')}
                        >
                          New User? Create new Account
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
