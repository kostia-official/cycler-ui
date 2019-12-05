import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { ToolBar } from '../ToolBar/ToolBar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  createIteration,
  fetchIterations,
  removeIteration,
  removeIterationClick,
  removeIterationUndo
} from '../../actions/iterations';
import _ from 'lodash';
import { Spinner } from '../Spinner/Spinner';
import { Iteration } from './Iteration/Iteration';
import { RemoveSnackbar } from '../RemoveSnackbar/RemoveSnackbar';
import moment from 'moment';
import { upsertField } from '../../actions/field';
import { fetchById } from '../../actions/cycle';
import { DatePickerButton } from '../DatePickerButton/DatePickerButton';
import { AddFabButton } from '../AddFabButton/AddFabButton';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

const useStyles = makeStyles(() => ({
  createOnDateButton: {
    position: 'fixed',
    bottom: '90px',
    right: '16px'
  },
  listItem: {
    padding: '16px'
  }
}));

export const Iterations = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isLoading, toRemove, errorMessage } = useSelector((state: any) => state.iterations.meta);
  const parentCycle = useSelector((state: any) => state.iterations.parentCycle);
  const data = useSelector((state: any) => state.iterations.data);

  const { cycleId = '' } = useParams();

  useEffect(() => {
    if (!parentCycle) dispatch(fetchById(cycleId));
  }, [cycleId, parentCycle, dispatch]);

  useEffect(() => {
    dispatch(fetchIterations(cycleId));
  }, [cycleId, dispatch]);

  const title = parentCycle?.name || 'Loading...';

  return (
    <div>
      <ToolBar title={title} />

      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {_.map(data, (item) => (
            <Iteration
              key={item._id}
              iteration={item}
              parentCycle={parentCycle}
              onIterationRemove={() => dispatch(removeIterationClick(item))}
              onFieldUpdate={(field) => dispatch(upsertField(field))}
              isHidden={!!_.find(toRemove, { _id: item._id })}
            />
          ))}
        </div>
      )}

      <DatePickerButton
        className={classes.createOnDateButton}
        onChange={(date) => dispatch(createIteration(cycleId, parentCycle.periodicity, date))}
      />
      <AddFabButton onClick={() => dispatch(createIteration(cycleId, parentCycle.periodicity))} />

      <ErrorMessage error={errorMessage} />

      {_.map(toRemove, (iterationToRemove) => (
        <RemoveSnackbar
          key={iterationToRemove._id}
          text={`Iteration on ${moment(iterationToRemove.date).format('DD.MM.YYYY')} removed`}
          onRemove={() => dispatch(removeIteration(iterationToRemove))}
          handleUndo={() => dispatch(removeIterationUndo(iterationToRemove))}
        />
      ))}
    </div>
  );
};
