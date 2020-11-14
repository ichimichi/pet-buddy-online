import React from 'react';
import { useStyles } from './useStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ItemForm } from './ItemForm';

export const ItemFormDialog = ({
  id,
  isEdit,
  toggleLoading,
  isLoading,
  refresh,
  onCancel,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Dialog {...rest} onClose={onCancel}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <ItemForm
          {...{
            id,
            isEdit,
            toggleLoading,
            isLoading,
            refresh,
            onCancel,
          }}
          {...rest}
        />
      </DialogContent>
    </Dialog>
  );
};
