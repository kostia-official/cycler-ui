import React, { useEffect } from 'react';
import { List } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ToolBar } from '../ToolBar/ToolBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetch, remove, removeClick, removeUndo } from '../../actions/cycles';
import _ from 'lodash';
import { Spinner } from '../Spinner/Spinner';
import { RemoveSnackbar } from '../RemoveSnackbar/RemoveSnackbar';
import { setParentCycle } from '../../actions/iterations';
import { setToEdit } from '../../actions/cycle';
import { Cycle } from './Cycle/Cycle';
import { AddFabButton } from '../AddFabButton/AddFabButton';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const Cycles = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state: any) => state.cycles.data);
  const { isLoading, toRemove, errorMessage } = useSelector((state: any) => state.cycles.meta);

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  return (
    <>
      <ToolBar title="Cycler" />

      {isLoading ? (
        <Spinner />
      ) : (
        <List disablePadding>
          {_.map(data, (item) => (
            <Cycle
              key={item._id}
              cycle={item}
              isHidden={_.find(toRemove, { _id: item._id })}
              onClick={() => {
                dispatch(setParentCycle(item));
                history.push(`/iterations/${item._id}`);
              }}
              onEditClick={() => {
                dispatch(setToEdit(item));
                history.push(`/cycle/edit/${item._id}`);
              }}
              onDeleteClick={() => dispatch(removeClick(item))}
            />
          ))}
        </List>
      )}

      <AddFabButton onClick={() => history.push('/cycle/create')} />

      <ErrorMessage error={errorMessage} />

      {_.map(toRemove, ({ _id, name }) => (
        <RemoveSnackbar
          key={_id}
          text={`Cycle Template "${name}" removed`}
          onRemove={() => dispatch(remove(_id))}
          handleUndo={() => dispatch(removeUndo(_id))}
        />
      ))}
    </>
  );
};
