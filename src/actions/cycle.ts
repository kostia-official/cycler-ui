import { api } from '../api';
import { Dispatch } from 'redux';
import { ICyclePopulated } from '../data.types';

export enum CycleActions {
  SetToEdit = 'SetCycleToEdit',

  UpsertStart = 'UpsertCycleStart',
  UpsertSuccessful = 'UpsertCycleSuccessful',
  UpsertFail = 'UpsertCycleFail',

  FetchByIdStart = 'FetchCycleByIdStart',
  FetchByIdSuccessful = 'FetchCycleByIdSuccessful',
  FetchByIdFail = 'FetchCycleByIdFail',

  RemoveFieldTemplate = 'RemoveFieldTemplate',
  AddFieldTemplate = 'AddFieldTemplate',

  OnChangeFieldTemplate = 'OnChangeFieldTemplate',
  OnChange = 'OnCycleChange'
}

export const fetchById = (cycleId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CycleActions.FetchByIdStart });
    const { data } = await api.get(`/cycles/${cycleId}`, {
      params: { $populate: 'fieldsTemplates' }
    });
    dispatch({ type: CycleActions.FetchByIdSuccessful, data });
  } catch (err) {
    dispatch({ type: CycleActions.FetchByIdFail, err });
  }
};

export const upsert = (cycle: ICyclePopulated) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CycleActions.UpsertStart });
    const { data } = cycle._id
      ? await api.patch(`/cycles/${cycle._id}`, cycle)
      : await api.post('/cycles', cycle);
    return dispatch({ type: CycleActions.UpsertSuccessful, data });
  } catch (err) {
    return dispatch({ type: CycleActions.UpsertFail, err });
  }
};

export const removeFieldTemplate = (index: string) => ({
  type: CycleActions.RemoveFieldTemplate,
  index
});

export const addFieldTemplate = () => ({
  type: CycleActions.AddFieldTemplate
});

export const onChange = ({ key, value }: { key: string; value: string }) => ({
  type: CycleActions.OnChange,
  key,
  value
});

export const onChangeFieldTemplate = ({
  key,
  value,
  index
}: {
  key: string;
  value: string;
  index: string;
}) => ({
  type: CycleActions.OnChangeFieldTemplate,
  index,
  key,
  value
});

export const setToEdit = (cycle: ICyclePopulated) => ({
  type: CycleActions.SetToEdit,
  cycle
});
