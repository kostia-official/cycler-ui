import React from 'react';
import { Toolbar, IconButton, Typography, makeStyles, AppBar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  leftButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export interface IToolBarProps {
  title: string;
}

export const ToolBar: React.FC<IToolBarProps> = ({ title, children }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        {history.location.pathname === '/' ? (
          <React.Fragment />
        ) : (
          <IconButton
            edge="start"
            className={classes.leftButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};
