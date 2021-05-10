import {combineReducers} from 'redux';
import appReducer from './appReducer';
import noteReducer from './noteReducer';

export default combineReducers({app : appReducer, note : noteReducer});