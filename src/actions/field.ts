import { api } from '../api';
import { Dispatch } from 'redux';
import { IField } from '../data.types';

export enum FieldActions {
  UpsertStart = 'UpsertFieldStart',
  UpsertSuccessful = 'UpsertFieldSuccessful',
  UpsertFail = 'UpsertFieldFail'
}

export const upsertField = (field: Partial<IField>) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FieldActions.UpsertStart });
    const { data } = field._id
      ? await api.patch(`/fields/${field._id}`, field)
      : await api.post('/fields', field);
    dispatch({ type: FieldActions.UpsertSuccessful, data });
  } catch (err) {
    dispatch({ type: FieldActions.UpsertFail, err });
  }
};
