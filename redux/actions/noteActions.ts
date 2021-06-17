import { Action, Dispatch } from 'redux';
import Utilities from '../../bin/Utilites';
import { NoteItem, RemoveNoteItem } from '../../interfaces/noteinterface';

export enum ActionTypes {
    FETCH_NOTES = 'FETCH_NOTES',
    FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE',
    FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS',
    ADD_NOTE = 'ADD_NOTE',
    ADD_NOTE_FAILURE = 'ADD_NOTE_FAILURE',
    ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS',
    DELETE_NOTE = 'DELETE_NOTE',
    DELETE_NOTE_FAILURE = 'DELETE_NOTE_FAILURE',
    DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS',
    SET_REMOVE_NOTE = 'SET_REMOVE_NOTE'
}

export type NoteActions = FetchNoteAction | AddNoteAction | DeleteNoteAction | SetRemoveNoteAction;

export interface NoteAction extends Action<ActionTypes>
{
    loading : boolean,
    error : (string | null)
}

interface FetchNoteAction extends NoteAction {
    type : ActionTypes.FETCH_NOTES | ActionTypes.FETCH_NOTES_SUCCESS | ActionTypes.FETCH_NOTES_FAILURE
    notes : NoteItem[]
}

export function fetchNotes(pageName : string) {

    return async function (dispatch : Dispatch<FetchNoteAction>) {

        const noteArr : NoteItem[] = [];

        dispatch({
            type: ActionTypes.FETCH_NOTES,
            loading: true,
            notes : noteArr,
            error : null
        });

        try {

                console.log('Calling get... ' + pageName);
    
                // Use fetch to get notes on component loaded 
                const response = await fetch(window.location.href + 'note/getnotes/' + pageName, {
                    method: 'GET'
                });
    
                let notes = await response.json();
                
    
                // Add notes returned from API request
                for (let n of notes) {
                    let fileBuffer = n.file.buffer;
                    let array = Utilities.base64ToArrayBuffer(fileBuffer);
                    let b = new Blob([array], { type: n.file.type });
                    noteArr.unshift({ title: n.title, desc: n.desc, file: b, id: n._id });
                }
    
        } catch (err) {
            console.log('Error: ' + err);
            return dispatch({
                type: ActionTypes.FETCH_NOTES_FAILURE,
                error: err,
                loading : true,
                notes : []
            });
        }

        return dispatch({
            type: ActionTypes.FETCH_NOTES_SUCCESS,
            loading: false,
            notes : noteArr,
            error : null
        });

    };

}

interface AddNoteAction extends NoteAction {
    type : ActionTypes.ADD_NOTE | ActionTypes.ADD_NOTE_FAILURE | ActionTypes.ADD_NOTE_SUCCESS
    note : NoteItem | null
}

export function addNote(title : string, desc : string, fileInput : Blob, user : string, 
    page : string) {

    return async function (dispatch : Dispatch<AddNoteAction>) {

        dispatch({
            type: ActionTypes.ADD_NOTE,
            loading : true,
            error : null,
            note : null
        });

            try {
    
                let fd = new FormData();
                fd.append('file', fileInput);
                fd.append('title', title);
                fd.append('desc', desc);
                fd.append('user', user);
                fd.append('page', page);
    
                // Use fetch and multipart Form Data object to add node to server
                const response = await fetch(window.location.href + 'note/addnote', {
                    method: 'POST',
                    body: fd
                });
    
                const noteId = await response.text();
    
                if (noteId.match(/^[0-9a-z]{24}$/)) {
                    return dispatch({
                        type: ActionTypes.ADD_NOTE_SUCCESS,
                        loading : false,
                        note: { title: title, desc: desc, file: fileInput, id: noteId },
                        error : null
                    });
                }
                else {
                    return dispatch({
                        type: ActionTypes.ADD_NOTE_FAILURE,
                        error: noteId,
                        loading : true,
                        note : null
                    });
                }
    
            } catch (err) {
                console.log('Error: ' + err);
                dispatch({
                    type: ActionTypes.ADD_NOTE_FAILURE,
                    error: err,
                    loading : true,
                    note : null
                });
            }

    };
};

interface DeleteNoteAction extends NoteAction {
    type : ActionTypes.DELETE_NOTE | ActionTypes.DELETE_NOTE_FAILURE | ActionTypes.DELETE_NOTE_SUCCESS
    noteId : string | null
}

export function deleteNote(id : string) {

    return async function (dispatch : Dispatch<DeleteNoteAction>) {

        dispatch({
            type: ActionTypes.DELETE_NOTE,
            loading : true,
            error : null,
            noteId : null
        });

        try {

            // Now remove from the server
            const response = await fetch(window.location.href + 'note/removenote/' + id, {
                method: 'DELETE'
            });

            console.log('note removed ' + await response.text());

        } catch (err) {
            console.error(err);
            return dispatch({
                type: ActionTypes.DELETE_NOTE_FAILURE,
                error: err,
                noteId : null,
                loading : true
            });
        }

        return dispatch({
            type: ActionTypes.DELETE_NOTE_SUCCESS,
            noteId : id,
            loading : false,
            error : null
        });

    };
};

interface SetRemoveNoteAction extends NoteAction {
    type : ActionTypes.SET_REMOVE_NOTE,
    removeNote : RemoveNoteItem | null
}

export function setRemoveNoteObj(noteObj : RemoveNoteItem | null ,dispatch : Dispatch<SetRemoveNoteAction>)
{
    dispatch({
        type: ActionTypes.SET_REMOVE_NOTE,
        removeNote : noteObj,
        error : null,
        loading : false
    });

}