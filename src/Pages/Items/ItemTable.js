import React, { useEffect, useState } from 'react';
import { useAppState } from '../../Provider/AppProvider';
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useStyles } from './useStyles';
import Axios from 'axios';
import { ItemRow } from './ItemRow';
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  LastPage as LastPageIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
function TablePaginationActions(props) {
  const classes = useStyles1();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(
      event,
      Math.max(0, Math.ceil(count / rowsPerPage) - 1)
    );
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRightIcon />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const ItemTable = ({ toggleLoading, isLoading, ...rest }) => {
  const classes = useStyles();
  const { apis } = useAppState();
  const [items, setItems] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  const [render, setRender] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getItems = async () => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      params: {
        page: page,
        perpage: rowsPerPage,
      },
      url: apis.item,
    };

    try {
      const { data } = await Axios(options);
      console.log('fetched many', data);
      if (!data.docs.length && data.offset === 0) {
        setEmpty(true);
        toggleLoading();
        return;
      }
      setCount(data.totalDocs);
      setItems(data.docs);
      setFetched(true);
      toggleLoading();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    toggleLoading();
    getItems();
  }, [page, render, rowsPerPage]);

  const refresh = () => setRender((render) => !render);

  return (
    <Grid
      className={classes.background}
      container
      direction="column"
      justify="center"
      spacing={0}
      {...rest}
    >
      {empty && (
        <Box m={4}>
          <Grid item spacing={3}>
            <Typography variant="h4">Empty</Typography>
            <Typography variant="subtitle1">
              There are no Items yet
            </Typography>
          </Grid>
        </Box>
      )}
      {fetched && (
        <Box m={4}>
          <Grid item container direction="row" spacing={3}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => {
                    return (
                      <ItemRow
                        key={item._id}
                        {...item}
                        {...{
                          toggleLoading,
                          isLoading,
                          refresh,
                        }}
                      />
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: count },
                      ]}
                      colSpan={3}
                      count={count}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      )}
    </Grid>
  );
};
