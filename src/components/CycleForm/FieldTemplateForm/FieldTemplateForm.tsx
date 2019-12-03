import React from 'react';
import { TextField, makeStyles, Paper, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  textField: {
    display: 'block'
  },
  fieldsContainer: {
    padding: theme.spacing(3, 2),
    margin: '10px 0 10px 0'
  }
}));

export interface IFieldCreateProps {
  data: any;
  onRemoveClick: () => void;
  onNameChange: (event: any) => any;
  index: string;
}

export const FieldTemplateForm: React.FC<IFieldCreateProps> = ({
  onRemoveClick,
  data,
  onNameChange,
  index
}) => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.fieldsContainer}>
        <Grid container alignItems="center">
          <Grid item xs>
            <TextField
              id={`field-name-input-${index}`}
              required
              label="Field Name"
              InputLabelProps={{
                shrink: true
              }}
              value={data.name}
              onChange={onNameChange}
              className={classes.textField}
            />
          </Grid>
          <Grid item>
            <IconButton id={`field-remove-${index}`} aria-label="remove" onClick={onRemoveClick}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
