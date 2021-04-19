'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { base64ToArrayBuffer } from '../bin/Utilites';
import Page from '../components/Page';

/**
 * Page component loads and displays notes associated with it. The 
 * notes are loaded from the web server 
 */
export default class PageContainer extends Component {
    constructor(props) {
        super(props);

        this.removeClick = this.removeClick.bind(this);
        this.cancelRemove = this.cancelRemove.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.sendNote = this.sendNote.bind(this);
        this.loadNotes = this.loadNotes.bind(this);

        this.state = {
            notes: [],
            removeNoteObj: null
        }
    }

    removeClick(obj) {
        this.setState({ removeNoteObj: obj });
    }

    cancelRemove() {
        this.setState({ removeNoteObj: null });
    }

    async removeNote(id) {
        try {

            // Now remove from the server
            const response = await fetch(window.location.href + 'note/removenote/' + id, {
                method: 'DELETE'
            });

            console.log('note removed ' + await response.text());

            // Remove from GUI
            // Get index of id
            for (var i = 0; i < this.state.notes.length; i++) {
                if (id === this.state.notes[i].id) {
                    break;
                }
            }

            let noteArr = [...this.state.notes];
            noteArr.splice(i, 1);
            this.setState({ notes: noteArr, removeNoteObj: null });

        } catch (err) {
            console.error(err);
        }
    }

    async sendNote(title, desc, fileInput, user, page) {
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
                this.setState({
                    notes: [{ title: title, desc: desc, file: fileInput, id: noteId },
                    ...this.state.notes]
                });
            }

        } catch (err) {
            console.log('Error: ' + err);
        }
    }

    async loadNotes() {
        try {

            console.log('Calling get... ' + this.props.pageName);

            // Use fetch to get notes on component loaded 
            const response = await fetch(window.location.href + 'note/getnotes/' + this.props.pageName, {
                method: 'GET'
            });

            let notes = await response.json();
            const noteArr = [];

            // Add notes returned from API request
            for (let n of notes) {
                let fileBuffer = n.file.buffer;
                let array = base64ToArrayBuffer(fileBuffer);
                let b = new Blob([array], { type: n.file.type });
                noteArr.unshift({ title: n.title, desc: n.desc, file: b, id: n._id });
            }

            this.setState({ notes: noteArr });

        } catch (err) {
            console.log('Error: ' + err);
        }
    }

    async componentDidMount() {
        this.loadNotes();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.pageName !== prevProps.pageName) {
            this.loadNotes();
        }
    }
    
    render() {

        const { notes, removeNoteObj } = this.state;

        return <div id="pageContainerDiv">
            <Page notes={notes} removeNote={this.removeNote} sendNote={this.sendNote} cancelRemove={this.cancelRemove}
                removeNoteObj={removeNoteObj} removeClick={this.removeClick} pageName={this.props.pageName} />
        </div>
    }

}

/*Page.propTypes = {
    title: PropTypes.string.isRequired
}*/