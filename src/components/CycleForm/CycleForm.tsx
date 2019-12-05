import React, { useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField
} from '@material-ui/core';
import { ToolBar } from '../ToolBar/ToolBar';
import { FieldTemplateForm } from './FieldTemplateForm/FieldTemplateForm';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFieldTemplate,
  fetchById,
  onChange,
  onChangeFieldTemplate,
  removeFieldTemplate,
  upsert
} from '../../actions/cycle';
import { fetch } from '../../actions/cycles';
import AddIcon from '@material-ui/icons/Add';
import { SaveFabButton } from '../SaveFabButton/SaveFabButton';
import { useHistory, useParams } from 'react-router';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'block'
  },
  block: {
    display: 'block'
  },
  createButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90
    }
  }
}));

export const CycleForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const cycle = useSelector((state: any) => state.cycleForm.data);
  const { isLoading, errorMessage } = useSelector((state: any) => state.cycleForm.meta);
  const { cycleId = '' } = useParams();

  console.log(errorMessage);

  const isEditMode = !!cycleId;
  const title = isEditMode ? `Edit Cycle "${cycle.name}"` : 'New Cycle';

  useEffect(() => {
    if (isEditMode && !cycle._id) dispatch(fetchById(cycleId));
  }, [cycleId, cycle, isEditMode, dispatch]);

  return (
    <div>
      <ToolBar title={title} />

      <Container className={classes.container}>
        <TextField
          id="cycle-name-input"
          required
          label="Cycle Name"
          margin="normal"
          className={classes.block}
          value={cycle.name}
          InputLabelProps={{
            shrink: true
          }}
          onChange={({ target }) => dispatch(onChange({ key: 'name', value: target.value }))}
        />

        <FormControl margin="normal" className={classes.block}>
          <FormLabel>Periodicity</FormLabel>
          <RadioGroup
            value={cycle.periodicity}
            onChange={({ target }) =>
              dispatch(onChange({ key: 'periodicity', value: target.value }))
            }
          >
            <FormControlLabel value="day" control={<Radio />} label="Daily" />
            <FormControlLabel value="week" control={<Radio />} label="Weekly" />
            <FormControlLabel value="month" control={<Radio />} label="Monthly" />
          </RadioGroup>
        </FormControl>

        {_.map(cycle.fieldsTemplates, (fieldTemplate, i) => {
          return (
            <FieldTemplateForm
              key={i}
              index={i}
              data={fieldTemplate}
              onRemoveClick={() => dispatch(removeFieldTemplate(i))}
              onNameChange={({ target }) =>
                dispatch(
                  onChangeFieldTemplate({
                    index: i,
                    key: 'name',
                    value: target.value
                  })
                )
              }
            />
          );
        })}

        <Button
          id="new-field-button"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => dispatch(addFieldTemplate())}
        >
          New field
        </Button>

        <SaveFabButton
          isLoading={isLoading}
          onClick={async () => {
            const res: any = await dispatch(upsert(cycle));
            if (!res.err) {
              await dispatch(fetch());
              history.push('/');
            }
          }}
        />

        <ErrorMessage error={errorMessage} />
      </Container>
    </div>
  );
};
