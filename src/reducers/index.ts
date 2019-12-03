import { combineReducers } from 'redux';
import cycleForm from './cycleForm';
import cycles from './cycles';
import iterations from './iterations';

export default combineReducers({
  cycleForm,
  cycles,
  iterations
});
