import { IconButton, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { useAppState } from '../../Provider/AppProvider';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import { useStyles } from './useStyles';
import Axios from 'axios';
import { useModal } from 'react-modal-hook';
import { ConfirmDialog } from '../../Components/Modals/ConfirmDialog';
import { ItemFormDialog } from './ItemFormDialog';

export const ItemRow = ({
  toggleLoading,
  isLoading,
  refresh,
  ...item
}) => {
  const classes = useStyles();
  const { apis } = useAppState();

  const [showConfirmModal, hideConfirmModal] = useModal(
    ({ in: open, onExited }) => (
      <ConfirmDialog
        open={open}
        onExited={onExited}
        title={`Are you sure you want to Delete ${item.name}?`}
        confirmLabel="Delete"
        onConfirm={() => deleteItem()}
        onCancel={hideConfirmModal}
        text="Deleting is irreversible"
      />
    ),
    [item]
  );

  const [showEditModal, hideEditModal] = useModal(
    ({ in: open, onExited }) => (
      <ItemFormDialog
        open={open}
        onExited={onExited}
        onCancel={hideEditModal}
        id={item._id}
        isEdit
        {...{ toggleLoading, isLoading, refresh }}
      />
    ),
    [item]
  );

  const deleteItem = async () => {
    hideConfirmModal();
    toggleLoading();
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      url: `${apis.item}/${item._id}`,
    };

    try {
      const { data } = await Axios(options);
      console.log('deleted', data);
      refresh();
      toggleLoading();
    } catch (e) {
      console.error(e);
      toggleLoading();
    }
  };

  return (
    <TableRow key={item.name}>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell align="right">{item.description}</TableCell>
      <TableCell align="right">
        <IconButton onClick={showEditModal}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={showConfirmModal}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
