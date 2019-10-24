import React, { Component } from 'react';

import Dialog from './Dialog';
import Note from './Note';
import { networkInterfaces } from 'os';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
            notes: []
        };

        this.addClick = this.addClick.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.getDialogData = this.getDialogData.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    addClick(e) {
        e.preventDefault();

        this.setState({ showDialog: true });
    }

    hideDialog() {
        this.setState({ showDialog: false });
    }

    getDialogData(title, desc, fileInput, user = 'Kevin') {
        let fileName = null;

        if (fileInput.current.files[0]) {
            fileName = fileInput.current.files[0].name;
        }

        console.log('file layout: ' + JSON.stringify(fileInput.current.files[0]));
        this.hideDialog();
        this.addNote(title, desc, fileInput);

        // Send to server
        App.sendNote(title, desc, fileInput, user);

    }

    addNote(title, desc, file) {
        this.setState({ notes: [<Note key={this.state.notes.length + 1} mID={this.state.notes.length + 1} title={title} desc={desc} file={file} />, ...this.state.notes] });
    }

    static async sendNote(title, desc, fileInput, user) {
        try {

            const obj = {
                lastModified: fileInput.current.files[0].lastModified,
                name: fileInput.current.files[0].name,
                size: fileInput.current.files[0].size,
                type: fileInput.current.files[0].type,
                webkitRelativePath: fileInput.current.files[0].webkitRelativePath,
            }
            console.log('oImage size2: ' + JSON.stringify(obj));
            let fd = new FormData();
            fd.append('file', fileInput.current.files[0]);
            fd.append('title', title);
            fd.append('desc', desc);
            fd.append('user', user);

            const response = await fetch(window.location.href + 'addnote', {
                method: 'POST',
                body: fd
            });
            console.log('Send Note Response: ' + await response.text());
        } catch (err) {
            console.log('Error: ' + err);
        }
    }

    async componentDidMount() {
        try {
            console.log('Calling get...');

            const response = await fetch(window.location.href + 'getnotes/page1', {
                method: 'GET'
            });

            let notes = await response.json();

            for (let n of notes) {
                console.log(n.title + ' : ' + n.desc + ' : ' + n.file.name + ' : ' + n.file.buffer instanceof Buffer);
              //  console.log('is buffer: ' + Buffer.from(n.file.buffer).toString('base64'));
                let buf = Buffer.from(n.file.buffer);
                //testttt
              //  console.log('size: ' + buf.length);

                let b = new Blob([buf], { type: n.file.type });
                console.log('Blob: ' + b);
                this.addNote(n.title, n.desc, b);
            }

        } catch (err) {
            console.log('Error: ' + err);
        }
    }

    render() {

        let dialog = <div></div>;

        if (this.state.showDialog) {
            dialog = <Dialog cancel={this.hideDialog} add={this.getDialogData} />;
        }

        let main = <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div id="buttonDiv" className="col-8">
                        {this.state.notes}
                        <button onClick={this.addClick} id="addBtn" type="button" className="btn btn-primary"><i className="fa fa-plus"></i></button>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>

            {dialog}

        </div>;

        return main;
    }
}