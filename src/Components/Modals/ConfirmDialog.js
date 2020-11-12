import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ConfirmDialog = ({
  title,
  confirmLabel,
  text,
  onConfirm,
  onCancel,
  ...rest
}) => (
  <Dialog
    {...rest}
    onClose={onCancel}
    aria-labelledby="confirm-dialog-slide-title"
    aria-describedby="confirm-dialog-slide-description"
  >
    <DialogTitle id="confirm-dialog-slide-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-slide-description">
        {text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm} color="primary">
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);
