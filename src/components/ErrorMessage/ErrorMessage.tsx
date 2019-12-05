import React, { useEffect, useState } from 'react';
import { makeStyles, Snackbar, SnackbarContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  snackbarContent: {
    backgroundColor: theme.palette.error.dark
  }
}));

interface IErrorMessageProps {
  error: string | null | undefined;
  autoHideDuration?: number;
}

export const ErrorMessage: React.FC<IErrorMessageProps> = ({ error, autoHideDuration = 4000 }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(!!error);

  useEffect(() => {
    setIsOpen(!!error);
  }, [error]);

  return error ? (
    <Snackbar open={isOpen} autoHideDuration={autoHideDuration} onClose={() => setIsOpen(false)}>
      <SnackbarContent className={classes.snackbarContent} message={<span>{error}</span>} />
    </Snackbar>
  ) : (
    <React.Fragment />
  );
};
