import React from 'react';
import { IField, IFieldTemplate } from '../../../../data.types';
import { useDebouncedCallback } from 'use-debounce';
import RichTextEditor from './RichTextEditor';
import { makeStyles, Typography } from '@material-ui/core';

interface IFieldProps {
  field: Partial<IField>;
  fieldTemplate: IFieldTemplate;
  onWordsChange: (event: any) => any;
}

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 14
  }
}));

export const WordsField: React.FC<IFieldProps> = ({ field, fieldTemplate, onWordsChange }) => {
  const classes = useStyles();
  const [debouncedOnWordsChange] = useDebouncedCallback(onWordsChange, 500);

  return (
    <div>
      <Typography className={classes.label}>{fieldTemplate?.name}:</Typography>
      <RichTextEditor
        text={field?.value?.text}
        onChange={(value: string) => {
          debouncedOnWordsChange(value);
        }}
      />
    </div>
  );
};
