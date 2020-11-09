import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  background: {
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  root: {},
  description: {
    minHeight: 50,
  },
  media: {
    height: 140,
  },
}));
