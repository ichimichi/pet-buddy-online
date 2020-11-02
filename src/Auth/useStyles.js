import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  background: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${process.env.PUBLIC_URL + '/static/bg.svg'})`,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));
