import { makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { IField, IFieldTemplate } from '../../../../data.types';
import { useDebouncedCallback } from 'use-debounce';

const useStyles = makeStyles(() => ({
  textField: {
    display: 'block'
  }
}));

interface IFieldProps {
  field: Partial<IField>;
  fieldTemplate: IFieldTemplate;
  onWordsChange: (event: any) => any;
}

export const WordsField: React.FC<IFieldProps> = ({ field, fieldTemplate, onWordsChange }) => {
  const classes = useStyles();
  const [text, setText] = useState(field.value?.text);
  const [debouncedOnWordsChange] = useDebouncedCallback(onWordsChange, 500);

  return (
    <React.Fragment>
      <TextField
        margin="normal"
        label={fieldTemplate.name}
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
        onChange={(event: any) => {
          setText(event.target?.value);
          debouncedOnWordsChange(event.target?.value);
        }}
        value={text}
        multiline
        variant="outlined"
        className={classes.textField}
      />
    </React.Fragment>
  );
};
