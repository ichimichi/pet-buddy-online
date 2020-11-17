import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: grey[100],
    color: grey[600],
    borderTop: `1px solid ${grey[300]}`,
    textAlign: 'center',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
  },
}));
