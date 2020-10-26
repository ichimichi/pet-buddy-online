import React from 'react';
import Input from './Input';

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
