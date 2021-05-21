'use strict';

import React, { Component } from 'react';
import Note from './Note';
import Dialog from './Dialog';
import RemoveDialog from './GeneralDialog';
import '../stylesheets/page.css';
import {NoteItem, RemoveNoteItem} from '../interfaces/noteinterface';



interface Props {
    pageName : (string | null),
    removeNoteObj : (RemoveNoteItem | null),
    notes : NoteItem[],
    cancelRemove : () => void,
    removeClick : (obj : object) => void,
    removeNote : (id :string) => void,
    sendNote : (title: string, desc : string, file : (File | null), 
        user : string, pageName : (string | null)) => void
}

interface State {
    showDialog : boolean
}

/**
 * Page component loads and displays notes associated with it. The 
 * notes are loaded from the web server
 */
export default class Page extends Component<Props,State> {
    constructor(props : Props) {
        super(props);

        this.addClick = this.addClick.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.getDialogData = this.getDialogData.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);

        this.state = {
            showDialog : false
        }
    }

    showDialog()
    {
        this.setState({showDialog : true});
    }

    hideDialog() {
        this.setState({ showDialog: false });
    }

    getDialogData(title : string, desc : string, file : (File | null), user = 'Kevin') {
        this.props.sendNote(title, desc, file, user, this.props.pageName);
        this.hideDialog();
    }

    addClick(e : React.MouseEvent<HTMLButtonElement,MouseEvent>) {
        e.preventDefault();

        this.showDialog();
    }

    removeNote(id :string) {
        try {
            this.props.removeNote(id);
        } catch (err) {
            console.error(err);
        }
    }

    render() {

        const {removeNoteObj,notes,cancelRemove,removeClick,pageName} = this.props;
        
        return <div id="pageDiv">
            <button onClick={this.addClick} id="addBtn" type="button" className="btn btn-primary"><i className="fa fa-plus"></i></button>
            <h4 id="pageTitle">{pageName}</h4>
            {notes.map(note => 
                <Note remove={removeClick} key={note.id} mID={note.id} title={note.title} desc={note.desc} file={note.file} />
            )}
            {this.state.showDialog && <Dialog cancel={this.hideDialog} add={this.getDialogData} />}
            {removeNoteObj && <RemoveDialog okAction={()=>{this.removeNote(removeNoteObj.id)}} cancelAction={cancelRemove}
                message={`Are you sure you want to remove ${removeNoteObj.name}?`} />}
        </div>
    }

}
