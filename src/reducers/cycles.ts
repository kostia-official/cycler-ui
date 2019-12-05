import { CyclesActions as Actions } from '../actions/cycles';
import _ from 'lodash';
import { combineReducers } from 'redux';
import { ICycle } from '../data.types';
import { getErrorMessage } from '../helpers/getErrorMessage';

const data = (state: any[] = [], action: any) => {
  switch (action.type) {
    case Actions.FetchSuccessful:
      return [...action.data];
    case Actions.RemoveSuccessful:
      return _.reject(state, { _id: action._id });
    default:
      return state;
  }
};

interface IMetaState {
  isLoading: boolean;
  errorMessage: string;
  toRemove: ICycle[];
}

const meta = (
  state: IMetaState = { isLoading: false, errorMessage: '', toRemove: [] },
  action: any
) => {
  switch (action.type) {
    case Actions.FetchStart:
      return { ...state, isLoading: true, errorMessage: '' };
    case Actions.FetchSuccessful:
      return { ...state, isLoading: false };
    case Actions.FetchFail:
      return { ...state, isLoading: false, errorMessage: getErrorMessage(action.err) };

    case Actions.RemoveClick:
      return { ...state, toRemove: [...state.toRemove, action.toRemove] };
    case Actions.RemoveSuccessful:
    case Actions.RemoveUndo:
      return { ...state, toRemove: _.reject(state.toRemove, { _id: action._id }) };

    default:
      return state;
  }
};

export default combineReducers({ data, meta });
