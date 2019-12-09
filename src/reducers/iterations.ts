import { IterationsActions } from '../actions/iterations';
import { FieldActions } from '../actions/field';
import { combineReducers } from 'redux';
import _ from 'lodash';
import { ICyclePopulated, IIterationPopulated } from '../data.types';
import { CycleActions } from '../actions/cycle';
import { getErrorMessage } from '../helpers/getErrorMessage';

interface IDataState {
  parentCycle?: ICyclePopulated;
  iterations: IIterationPopulated[];
}

const data = (state: IDataState = { iterations: [] }, action: any) => {
  switch (action.type) {
    case IterationsActions.FetchIterationsSuccessful:
      return {
        ...state,
        iterations: _.map(action.data, (iteration: IIterationPopulated) => {
          return {
            ...iteration,
            fields: generateFields(iteration, state.parentCycle)
          };
        })
      };
    case IterationsActions.CreateIterationSuccessful:
      const newIteration = {
        ...action.data,
        fields: generateFields(action.data, state.parentCycle)
      };
      return { ...state, iterations: [newIteration, ...state.iterations] };
    case IterationsActions.RemoveSuccessful:
      return { ...state, iterations: _.reject(state.iterations, { _id: action.iteration._id }) };
    case FieldActions.UpsertSuccessful:
      return {
        ...state,
        iterations: _.map(state.iterations, (item) => {
          const index = _.findIndex(item.fields, {
            fieldTemplateId: action.data.fieldTemplateId,
            iterationId: action.data.iterationId
          });

          if (index !== -1) {
            item.fields[index] = action.data;
          }
          return item;
        })
      };
    case IterationsActions.SetParentCycle:
    case CycleActions.FetchByIdSuccessful:
      return { ...state, parentCycle: action.data };
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
      return { ...state, isLoading: true, errorMessage: '' };
    case IterationsActions.FetchIterationsSuccessful:
      return { ...state, isLoading: false };
    case IterationsActions.FetchIterationsFail:
    case CycleActions.FetchByIdFail:
      return { ...state, isLoading: false, errorMessage: getErrorMessage(action.err) };

    case IterationsActions.RemoveClick:
      return { ...state, toRemove: [...state.toRemove, action.iteration] };
    case IterationsActions.RemoveUndo:
    case IterationsActions.RemoveSuccessful:
      return { ...state, toRemove: _.reject(state.toRemove, { _id: action.iteration._id }) };

    default:
      return state;
  }
};

function generateFields(iteration: IIterationPopulated, parentCycle?: ICyclePopulated) {
  if (!parentCycle) return [];

  return _.map(parentCycle.fieldsTemplates, (fieldTemplate) => {
    return (
      _.find(iteration.fields, {
        fieldTemplateId: fieldTemplate._id
      }) || {
        fieldTemplateId: fieldTemplate._id,
        iterationId: iteration._id
      }
    );
  });
}

export default combineReducers({ data, meta });
