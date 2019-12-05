import { api } from '../api';
import { Dispatch } from 'redux';
import { ICycle } from '../data.types';

export enum CyclesActions {
  FetchStart = 'CyclesFetchStart',
  FetchSuccessful = 'CyclesFetchSuccessful',
  FetchFail = 'CyclesFetchFail',

  RemoveStart = 'CyclesRemoveStart',
  RemoveSuccessful = 'CyclesRemoveSuccessful',
  RemoveFail = 'CyclesRemoveFail',
  RemoveClick = 'CyclesRemoveClick',
  RemoveUndo = 'CyclesRemoveUndo'
}

export const fetch = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CyclesActions.FetchStart });
    const { data } = await api.get('/cycles', {
      params: {
        '$sort[createdAt]': -1,
        $populate: 'fieldsTemplates'
      }
    });
    dispatch({ type: CyclesActions.FetchSuccessful, data });
  } catch (err) {
    dispatch({ type: CyclesActions.FetchFail, err });
  }
};

export const remove = (_id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CyclesActions.RemoveStart, _id });
    await api.delete(`/cycles/${_id}`);
    dispatch({ type: CyclesActions.RemoveSuccessful, _id });
  } catch (err) {
    dispatch({ type: CyclesActions.RemoveFail, err });
  }
};

export const removeClick = (toRemove: ICycle) => ({
  type: CyclesActions.RemoveClick,
  toRemove
});

export const removeUndo = (_id: string) => ({
  type: CyclesActions.RemoveUndo,
  _id
});
