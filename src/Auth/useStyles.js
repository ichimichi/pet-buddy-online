import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  background: {
    minHeight: '100vh',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${
      process.env.PUBLIC_URL + '/static/bg2.svg'
    })`,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  ht: {
    minWidth: '100%',
  },
}));
