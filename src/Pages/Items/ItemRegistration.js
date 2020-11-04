import React, { useState } from 'react';
import { useAppState } from '../../Provider/AppProvider';
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
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useStyles } from './useStyles';
import { TextField } from 'formik-material-ui';

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

    const options = {
      method: 'POST',
      headers: {},
      data: { ...values },
      withCredentials: true,
      url: apis.item,
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
                        <Box my={3}>
                          <Typography variant="h3">
                            Item Registration
                          </Typography>
                        </Box>
                        <div className="pt-3">
                          <Typography color="error">{message}</Typography>
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
                            disabled={!formik.isValid || formik.isSubmitting}
                          >
                            Register Item
                          </Button>
                        </Box>
                        <Divider />
                        <Box my={4}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                          >
                            View Items
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

export default ItemRegistration;
