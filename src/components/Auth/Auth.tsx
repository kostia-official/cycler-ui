import React from 'react';
import { Button, makeStyles, Snackbar, SnackbarContent } from '@material-ui/core';
import { config } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  snackbarContent: {
    backgroundColor: theme.palette.error.dark
  }
}));

export const Auth = () => {
  const classes = useStyles();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const error = query?.error_description;
  const { login } = useAuth();

  return (
    <div>
      <div className={classes.container}>
        <Button variant="contained" color="primary" onClick={() => login(config.auth)}>
          Login
        </Button>
      </div>
      {error && (
        <Snackbar open={!!error}>
          <SnackbarContent className={classes.snackbarContent} message={<span>{error}</span>} />
        </Snackbar>
      )}
    </div>
  );
};
