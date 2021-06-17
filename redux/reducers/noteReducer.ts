import { NoteItem, RemoveNoteItem } from "../../interfaces/noteinterface";
import { NoteActions } from "../actions/noteActions";


export interface NoteState {
    notes: NoteItem[],
    error: string | null,
    removeNoteObj: RemoveNoteItem | null,
    loading: boolean
}

export function reducer(state: NoteState = {
    notes: [], error: null, removeNoteObj: null, loading: false
}
    , action: NoteActions) {

    switch (action.type) {

        case 'FETCH_NOTES': case 'ADD_NOTE': case 'DELETE_NOTE':
            state = { ...state, loading: true };
            break;
        case 'FETCH_NOTES_SUCCESS':
            state = {
                ...state, loading: action.loading,
                notes: action.notes
            };
            break;
        case 'ADD_NOTE_SUCCESS':

            if (action.note) {
                state = {
                    ...state, notes: [{ title: action.note.title, desc: action.note.desc, file: action.note.file, id: action.note.id },
                    ...state.notes], loading: action.loading
                };
                break;
            }
        case 'ADD_NOTE_FAILURE': case 'DELETE_NOTE_FAILURE': case 'FETCH_NOTES_FAILURE':
            state = {
                ...state, error: action.error, loading: action.loading
            };
            break;
        case 'DELETE_NOTE_SUCCESS':

            // Get index of id
            for (var i = 0; i < state.notes.length; i++) {
                if (action.noteId === state.notes[i].id) {
                    break;
                }
            }

            const noteArr = [...state.notes];
            noteArr.splice(i, 1);
            state = { ...state, notes: noteArr, loading: action.loading };
            break;
        case 'SET_REMOVE_NOTE':
            state = { ...state, removeNoteObj: action.removeNote };
            break;

    }

    return state;
};