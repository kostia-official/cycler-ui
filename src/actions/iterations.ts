import { api } from '../api';
import { Dispatch } from 'redux';
import moment from 'moment';
import { IIterationPopulated } from '../data.types';

export enum IterationsActions {
  FetchIterationsStart = 'FetchIterationsStart',
  FetchIterationsSuccessful = 'FetchIterationsSuccessful',
  FetchIterationsFail = 'FetchIterationsFail',

  SetParentCycle = 'SetParentCycle',

  CreateIterationStart = 'CreateIterationStart',
  CreateIterationSuccessful = 'CreateIterationSuccessful',
  CreateIterationFail = 'CreateIterationFail',

  RemoveStart = 'RemoveIterationStart',
  RemoveSuccessful = 'RemoveIterationSuccessful',
  RemoveFail = 'RemoveIterationFail',
  RemoveClick = 'RemoveIterationClick',
  RemoveUndo = 'RemoveIterationUndo'
}

export const createIteration = (cycleId: string, periodicity: string, date?: Date) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: IterationsActions.CreateIterationStart });

    const currentDate = moment()
      .startOf(periodicity as any)
      .toISOString();
    const { data } = await api.post('/iterations', { date: date || currentDate, cycleId });

    dispatch({ type: IterationsActions.CreateIterationSuccessful, data });
  } catch (err) {
    dispatch({ type: IterationsActions.CreateIterationFail, err });
  }
};

export const fetchIterations = (cycleId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: IterationsActions.FetchIterationsStart });
    const { data } = await api.get('/iterations', {
      params: {
        cycleId,
        $populate: 'fields',
        '$sort[createdAt]': -1
      }
    });
    dispatch({ type: IterationsActions.FetchIterationsSuccessful, data });
  } catch (err) {
    dispatch({ type: IterationsActions.FetchIterationsFail, err });
  }
};

export const setParentCycle = (data: any) => ({
  type: IterationsActions.SetParentCycle,
  data
});

export const removeIteration = (iteration: IIterationPopulated) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: IterationsActions.RemoveStart });
    await api.delete(`/iterations/${iteration._id}`);
    dispatch({ type: IterationsActions.RemoveSuccessful, iteration });
  } catch (err) {
    dispatch({ type: IterationsActions.RemoveFail, err });
  }
};

export const removeIterationClick = (iteration: IIterationPopulated) => {
  return { type: IterationsActions.RemoveClick, iteration };
};

export const removeIterationUndo = (iteration: IIterationPopulated) => {
  return { type: IterationsActions.RemoveUndo, iteration };
};
