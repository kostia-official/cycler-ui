import { CycleActions as Actions } from '../actions/cycle';
import _ from 'lodash';
import { combineReducers } from 'redux';
import { getErrorMessage } from '../helpers/getErrorMessage';

const emptyFieldTemplate = {
  name: '',
  type: 'text'
};

const emptyCycle = {
  name: '',
  periodicity: '',
  fieldsTemplates: [emptyFieldTemplate]
};

const data = (state = emptyCycle, action: any) => {
  switch (action.type) {
    case Actions.FetchByIdSuccessful:
      return action.data;

    case Actions.SetToEdit:
      return action.cycle;

    case Actions.OnChange:
      return { ...state, [action.key]: action.value };

    case Actions.AddFieldTemplate:
      return { ...state, fieldsTemplates: [...state.fieldsTemplates, emptyFieldTemplate] };

    case Actions.RemoveFieldTemplate:
      return {
        ...state,
        fieldsTemplates: _.filter(state.fieldsTemplates, (value, index) => index !== action.index)
      };

    case Actions.OnChangeFieldTemplate:
      return {
        ...state,
        fieldsTemplates: _.map(state.fieldsTemplates, (value, index) => {
          if (index === action.index) {
            return {
              ...value,
              [action.key]: action.value
            };
          }
          return value;
        })
      };

    default:
      return state;
  }
};

const meta = (state = { isLoading: false, errorMessage: '' }, action: any) => {
  switch (action.type) {
    case Actions.UpsertStart:
      return { ...state, isLoading: true, errorMessage: '' };
    case Actions.UpsertSuccessful:
      return { ...state, isLoading: false };
    case Actions.FetchByIdFail:
    case Actions.UpsertFail:
      return { ...state, isLoading: false, errorMessage: getErrorMessage(action.err) };
    default:
      return state;
  }
};

export default combineReducers({ data, meta });
