import React from 'react';
import { Fab, makeStyles, Snackbar, SnackbarContent } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  fabProgress: {
    color: green[500],
    zIndex: 1,
    position: 'fixed',
    bottom: '10px',
    right: '10px'
  },
  saveButton: {
    position: 'fixed',
    bottom: '16px',
    right: '16px'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90
    }
  },
  snackbarContent: {
    backgroundColor: theme.palette.error.dark
  }
}));

interface ISaveFabButtonProps {
  isLoading: boolean;
  onClick: (event: any) => any;
  onErrorClose: (event: any) => any;
  errorMessage: string;
}

export const SaveFabButton: React.FC<ISaveFabButtonProps> = ({
  isLoading,
  onClick,
  errorMessage,
  onErrorClose
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
        <Fab
          id="save-cycle-button"
          className={classes.saveButton}
          color="primary"
          onClick={onClick}
        >
          <SaveIcon />
        </Fab>
        {isLoading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>

      <Snackbar
        open={!!errorMessage}
        onClose={onErrorClose}
        autoHideDuration={5000}
        className={classes.snackbar}
      >
        <SnackbarContent
          className={classes.snackbarContent}
          message={<span>{errorMessage}</span>}
        />
      </Snackbar>
    </>
  );
};
