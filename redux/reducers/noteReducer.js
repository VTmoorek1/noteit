export default function reducer(state = {notes : [], error : null, removeNoteObj : null}
    , action) {

    switch (action.type) {

        case 'FETCH_NOTES': case 'ADD_NOTE': case 'DELETE_NOTE':
            state = { ...state, loading: true };
            break;
        case 'FETCH_NOTES_SUCCESS':
            state = {
                ...state, loading: action.loading,
                notes : action.notes
            };
            break;
        case 'ADD_NOTE_SUCCESS':
            state = {
                ...state, notes : [{ title: action.note.title, desc: action.note.desc, file: action.note.file, id: action.note.id },
                ...state.notes], loading : action.loading 
            };
            break;
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
            state = {...state, notes : noteArr, loading : action.loading};
            break;
       case 'SET_REMOVE_NOTE':
            state = { ...state, removeNoteObj : action.removeNote};
            break;
        
    }
    
    return state;
};