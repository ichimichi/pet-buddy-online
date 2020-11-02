import { createMuiTheme } from '@material-ui/core';
import { common, green } from '@material-ui/core/colors';

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: common.white,
    },
  },
  typography: {
    headline: {
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '0.8125rem',
    },
    button: {
      fontWeight: 400,
      textTransform: 'initial',
    },
    body1: {
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 4,
});
