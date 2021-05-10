import {base64ToArrayBuffer} from '../../bin/Utilites';

export function fetchNotes(pageName) {

    return async function (dispatch) {

        dispatch({
            type: 'FETCH_NOTES',
            loading: true
        });

        const noteArr = [];

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
                    let array = base64ToArrayBuffer(fileBuffer);
                    let b = new Blob([array], { type: n.file.type });
                    noteArr.unshift({ title: n.title, desc: n.desc, file: b, id: n._id });
                }
    
        } catch (err) {
            console.log('Error: ' + err);
            return dispatch({
                type: 'FETCH_NOTES_FAILURE',
                error: err
            });
        }

        return dispatch({
            type: 'FETCH_NOTES_SUCCESS',
            loading: false,
            notes : noteArr
        });

    };

}

export function addNote(title, desc, fileInput, user, page) {

    return async function (dispatch) {

        dispatch({
            type: 'ADD_NOTE',
            loading : true
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
                        type: 'ADD_NOTE_SUCCESS',
                        loading : false,
                        note: { title: title, desc: desc, file: fileInput, id: noteId }
                    });
                }
                else {
                    return dispatch({
                        type: 'ADD_NOTE_FAILURE',
                        error: noteId
                    });
                }
    
            } catch (err) {
                console.log('Error: ' + err);
                dispatch({
                    type: 'ADD_NOTE_FAILURE',
                    error: err
                });
            }

    };
};

export function deleteNote(id) {

    return async function (dispatch) {

        dispatch({
            type: 'DELETE_NOTE',
            loading : true
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
                type: 'DELETE_NOTE_FAILURE',
                error: err
            });
        }

        return dispatch({
            type: 'DELETE_NOTE_SUCCESS',
            noteId : id,
            loading : false
        });

    };
};