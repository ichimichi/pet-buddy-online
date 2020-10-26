import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

function Input(props) {
  const classes = useStyles();
  const { label, name, type, ...rest } = props;
  return (
    <Field name={name} {...rest}>
      {(props) => {
        const { field, form, meta } = props;
        return (
          <TextField
            id={name}
            label={label}
            type={type}
            className={classes.textField}
            fullWidth
            margin="normal"
            variant="outlined"
            {...field}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && !!meta.error ? meta.error : ''}
          />
        );
      }}
    </Field>
  );
}

export default Input;
