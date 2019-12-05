import { Button, createStyles, IconButton, makeStyles, Snackbar, Theme } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { duration } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
    }
  })
);

interface IRemoveSnackbarProps {
  onRemove: () => any;
  handleUndo: () => any;
  text: string;
  autoHideDuration?: number;
}

export const RemoveSnackbar: React.FC<IRemoveSnackbarProps> = ({
  onRemove,
  handleUndo,
  text,
  autoHideDuration = 4000
}) => {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={true}
      autoHideDuration={autoHideDuration}
      onClose={(event, reason) => {
        if (reason === 'clickaway') return;
        // Content can be removed but still on screen
        setTimeout(onRemove, duration.leavingScreen);
      }}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">{text}</span>}
      action={[
        <Button key="undo" color="primary" size="small" onClick={handleUndo}>
          UNDO
        </Button>,
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={onRemove}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};
