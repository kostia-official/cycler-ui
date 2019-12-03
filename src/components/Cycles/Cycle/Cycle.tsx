import { IconButton, ListItem, ListItemSecondaryAction, makeStyles } from '@material-ui/core';
import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ICyclePopulated } from '../../../data.types';
import cn from 'classnames';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: '16px'
  },
  hidden: {
    display: 'none'
  }
}));

interface ICycleProps {
  onClick: (event: any) => any;
  onEditClick: (event: any) => any;
  onDeleteClick: (event: any) => any;
  cycle: ICyclePopulated;
  isHidden?: boolean;
}

export const Cycle: React.FC<ICycleProps> = ({
  onClick,
  cycle,
  onEditClick,
  onDeleteClick,
  isHidden = false
}) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      divider
      className={cn(classes.listItem, { [classes.hidden]: isHidden })}
      onClick={onClick}
    >
      <ListItemText primary={cycle.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={onEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
