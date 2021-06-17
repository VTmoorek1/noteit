import {combineReducers} from 'redux';
import {reducer as appReducer,AppState} from './appReducer';
import {reducer as noteReducer, NoteState} from './noteReducer';

export interface MainState {
    app: AppState,
    note: NoteState
}

export default combineReducers<MainState>({app : appReducer, note : noteReducer});