import { IterationsActions } from '../actions/iterations';
import { combineReducers } from 'redux';
import _ from 'lodash';
import { ICyclePopulated, IIterationPopulated } from '../data.types';
import { CycleActions } from '../actions/cycle';

const data = (state: IIterationPopulated[] = [], action: any) => {
  switch (action.type) {
    case IterationsActions.FetchIterationsSuccessful:
      return [...action.data];
    case IterationsActions.CreateIterationSuccessful:
      return [action.data, ...state];
    case IterationsActions.RemoveSuccessful:
      return _.reject(state, { _id: action.iteration._id });
    default:
      return state;
  }
};

const parentCycle = (state: ICyclePopulated | null = null, action: any) => {
  switch (action.type) {
    case IterationsActions.SetParentCycle:
    case CycleActions.FetchByIdSuccessful:
      return action.data;
    default:
      return state;
  }
};

interface IMetaState {
  isLoading: boolean;
  errorMessage: string;
  toRemove: IIterationPopulated[];
}

const meta = (
  state: IMetaState = { isLoading: false, errorMessage: '', toRemove: [] },
  action: any
) => {
  switch (action.type) {
    case IterationsActions.FetchIterationsStart:
      return { ...state, isLoading: true };
    case IterationsActions.FetchIterationsSuccessful:
      return { ...state, isLoading: false };
    case IterationsActions.FetchIterationsFail:
    case CycleActions.FetchByIdFail:
      const errorMessage = action.err.response.data?.message || action.err.message;
      return { ...state, isLoading: false, errorMessage };

    case IterationsActions.RemoveClick:
      return { ...state, toRemove: [...state.toRemove, action.iteration] };
    case IterationsActions.RemoveUndo:
    case IterationsActions.RemoveSuccessful:
      return { ...state, toRemove: _.reject(state.toRemove, { _id: action.iteration._id }) };

    case IterationsActions.OnErrorClose:
      return { ...state, errorMessage: '' };

    default:
      return state;
  }
};

export default combineReducers({ data, parentCycle, meta });