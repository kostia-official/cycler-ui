import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

export const Spinner: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress disableShrink />
    </div>
  );
};
