import { createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

export const theme = () =>
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: teal,
      secondary: teal,
      background: {
        default: '#19161c',
        paper: '#26212a'
      }
    }
  });
