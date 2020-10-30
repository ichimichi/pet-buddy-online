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
import { Formik, Form } from 'formik';
import FormikControl from './../../Components/Formik/FormikControl';
import * as Yup from 'yup';
import axios from 'axios';
import { useStyles } from './useStyles';

const ItemRegistration = ({ history }) => {
  const classes = useStyles();
  const { apis } = useAppState();
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

    const options = {
      method: 'POST',
      headers: {},
      data: values,
      withCredentials: true,
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
