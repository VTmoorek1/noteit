'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import { base64ToArrayBuffer } from '../bin/Utilites'
import { strict } from 'assert';

export default class Page extends Component {
    constructor(props) {
        super(props);

        this.addNote = this.addNote.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.removeNote = this.removeNote.bind(this);

        this.state = {
            notes: [],
            removeHandler: this.removeClick
        }
    }

    addClick(e) {
        e.preventDefault();

        this.props.showDlg();
    }

    removeClick(id) {
        this.removeNote(id);
    }

    async removeNote(id) {
        try {
            // Get index of id
            for (var i = 0; i < this.state.notes.length; i++) {
                if (id === this.state.notes[i].props.mID) {
                    break;
                }
            }

            // Remove from GUI
            let noteArr = [...this.state.notes];
            noteArr.splice(i, 1);
            this.setState({ notes: noteArr });

            // Now remove from the server
            const response = await fetch(window.location.href + 'removenote/' + id, {
                method: 'DELETE'
            });

            console.log('note removed ' + await response.text());

        } catch (err) {
            console.error(err);
        }
    }

    addNote(title, desc, file, id) {
        this.setState({ notes: [<Note remove={this.removeClick} key={id} mID={id} title={title} desc={desc} file={file} />, ...this.state.notes] });
    }

    static async sendNote(title, desc, fileInput, user, page) {
        try {

            let fd = new FormData();
            fd.append('file', fileInput);
            fd.append('title', title);
            fd.append('desc', desc);
            fd.append('user', user);
            fd.append('page', page);

            const response = await fetch(window.location.href + 'addnote', {
                method: 'POST',
                body: fd
            });

            return await response.text();
        } catch (err) {
            console.log('Error: ' + err);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('get derived state: ' + nextProps);

        if (nextProps.noteTitle) {
            let noteId = Page.sendNote(nextProps.noteTitle, nextProps.desc, nextProps.file, nextProps.user, nextProps.title);

            let prevNotes = prevState.notes;
            return { notes: [<Note remove={prevState.removeHandler} key={noteId} mID={noteId} title={nextProps.noteTitle} desc={nextProps.desc} file={nextProps.file} />, ...prevNotes] }

        }

        return null;
    }


    async componentDidMount() {
        try {
            console.log('Calling get...');

            const response = await fetch(window.location.href + 'getnotes/' + this.props.title, {
                method: 'GET'
            });


            let notes = await response.json();

            for (let n of notes) {

                let fileBuffer = n.file.buffer;

                let array = base64ToArrayBuffer(fileBuffer);
                console.log('file: ' + n.file.name + ' file length: ' + array.length);

                let b = new Blob([array], { type: n.file.type });
                console.log('Blob: ' + b);
                this.addNote(n.title, n.desc, b, n._id);
            }

        } catch (err) {
            console.log('Error: ' + err);
        }
    }


    render() {

        return <div id="pageDiv" className="col-8">
            <button onClick={this.addClick} id="addBtn" type="button" className="btn btn-primary"><i className="fa fa-plus"></i></button>
            <h4 id="pageTitle">{this.props.title}</h4>
            {this.state.notes}
        </div>
    }

}

Page.propTypes = {
    title: PropTypes.string.isRequired,
    showDlg: PropTypes.func.isRequired
}