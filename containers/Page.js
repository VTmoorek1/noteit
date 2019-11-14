'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Dialog from './Dialog';
import RemoveDialog from './GeneralDialog'
import { base64ToArrayBuffer } from '../bin/Utilites'
import { strict } from 'assert';

export default class Page extends Component {
    constructor(props) {
        super(props);

        this.addNote = this.addNote.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.cancelRemove = this.cancelRemove.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.getDialogData = this.getDialogData.bind(this);

        this.state = {
            notes: [],
            showDialog : false,
            removeObj : null
        }
    }

    showDialog()
    {
        this.setState({showDialog : true});
    }

    hideDialog() {
        this.setState({ showDialog: false });
    }

    getDialogData(title, desc, fileInput, user = 'Kevin') {
        const file = fileInput.current.files[0];
        let noteId = Page.sendNote(title, desc, file, user, this.props.title);
        this.addNote(title, desc,file , noteId);
        this.hideDialog();
    }

    addClick(e) {
        e.preventDefault();

        this.showDialog();
    }

    removeClick(obj) {
        console.log('remove click: ' + obj)
        this.setState({removeObj : obj});
    }

    cancelRemove()
    {
        this.setState({removeObj : null});
    }

    async removeNote(id) {
        try {

            console.log('remove id: ' + id);

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

            this.setState({removeObj : null});

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

        let dialog = <div></div>;
        let remDialog = <div></div>;

        if (this.state.showDialog) {
            dialog = <Dialog cancel={this.hideDialog} add={this.getDialogData} />;
        }

        if (this.state.removeObj) {
            const noteMsg = `Are you sure you want to remove ${this.state.removeObj.name}?`;
            remDialog = <RemoveDialog okAction={()=>this.removeNote(this.state.removeObj.id)} cancelAction={this.cancelRemove}
             message={noteMsg} />;
        }
        
        return <div id="pageDiv">
            <button onClick={this.addClick} id="addBtn" type="button" className="btn btn-primary"><i className="fa fa-plus"></i></button>
            <h4 id="pageTitle">{this.props.title}</h4>
            {this.state.notes}
            {dialog}
            {remDialog}
        </div>
    }

}

Page.propTypes = {
    title: PropTypes.string.isRequired
}