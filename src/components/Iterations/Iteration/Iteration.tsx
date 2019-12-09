import { Card, CardContent, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { ICyclePopulated, IField, IIterationPopulated } from '../../../data.types';
import { WordsField } from './WordsField/WordsField';
import DeleteIcon from '@material-ui/icons/Delete';
import cn from 'classnames';

const useStyles = makeStyles(() => ({
  container: {
    margin: '6px'
  },
  hidden: {
    display: 'none'
  },
  header: {
    padding: '10px 16px 0 16px'
  },
  fields: {
    padding: '0 10px 0 10px',
    '&:last-child': {
      paddingBottom: '10px'
    }
  }
}));

interface IIterationProps {
  isHidden?: boolean;
  iteration: IIterationPopulated;
  parentCycle: ICyclePopulated;
  onIterationRemove: (event: any) => any;
  onFieldUpdate: (field: Partial<IField>) => any;
}

export const Iteration: React.FC<IIterationProps> = ({
  iteration,
  parentCycle,
  onIterationRemove,
  onFieldUpdate,
  isHidden = false
}) => {
  const classes = useStyles();

  return (
    <Card className={cn(classes.container, { [classes.hidden]: isHidden })}>
      <CardHeader
        title={moment(iteration.date).format('DD.MM.YYYY')}
        classes={{ root: classes.header }}
        action={
          <IconButton aria-label="delete" onClick={onIterationRemove}>
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardContent classes={{ root: classes.fields }}>
        {_.map(parentCycle?.fieldsTemplates, (fieldTemplate) => {
          const field = _.find(iteration.fields, {
            fieldTemplateId: fieldTemplate._id
          });

          if (!field) return;

          return (
            <WordsField
              key={fieldTemplate._id}
              fieldTemplate={fieldTemplate}
              field={field}
              onWordsChange={(words) => {
                onFieldUpdate({ ...field, value: { text: words } });
              }}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};
