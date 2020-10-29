import React, { useState } from 'react';
import { useAppState } from '../../Provider/AppProvider';
import classNames from 'classnames';
import {
  Button,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import FormikControl from './../../Components/Formik/FormikControl';
import * as Yup from 'yup';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  background: {
    position: 'relative',
    zIndex: 4000,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 0 auto',
    flexDirection: 'column',
    minHeight: '100%',
    textAlign: 'center',
  },
  wrapper: {
    flex: 'none',
    maxWidth: '400px',
    width: '100%',
    margin: '0 auto',
  },
  root: {
    minWidth: 275,
  },
}));

const ItemRegistration = ({ history }) => {
  const classes = useStyles();
  const { accessToken, apis } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const url = apis.item;
    axios.interceptors.request.use(
      (req) => {
        if (accessToken) {
          req.headers.authorization = `Bearer ${accessToken}`;
        }
        return req;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const options = {
      method: 'POST',
      headers: {},
      data: values,
      url,
    };

    try {
      const { data } = await axios(options);
      console.log(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      if (e.response.status === 401) {
        setMessage('Unauthorized');
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
                        <Typography variant="h3">Item Registration</Typography>
                      </div>
                      <div className="pt-3">
                        <Typography color="error">{message}</Typography>
                      </div>
                      <FormikControl
                        control="input"
                        name="name"
                        label="Item Name"
                      />
                      <FormikControl
                        control="input"
                        name="description"
                        label="Description"
                      />
                      <div className="pt-3 pb-1">
                        <Button
                          type="submtit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={!formik.isValid || formik.isSubmitting}
                        >
                          Register Item
                        </Button>
                      </div>
                      <Divider />
                      <div className="pt-1">
                        <Button variant="outlined" color="primary" fullWidth>
                          View Items
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

export default ItemRegistration;
