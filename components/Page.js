'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Dialog from './Dialog';
import RemoveDialog from './GeneralDialog';
import '../stylesheets/page.css';

/**
 * Page component loads and displays notes associated with it. The 
 * notes are loaded from the web server 
 */
export default class Page extends Component {
    constructor(props) {
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

    async getDialogData(title, desc, fileInput, user = 'Kevin') {
        const file = fileInput.current.files[0];
        this.props.sendNote(title, desc, file, user, this.props.pageName);
        this.hideDialog();
    }

    addClick(e) {
        e.preventDefault();

        this.showDialog();
    }

    async removeNote(id) {
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

/*
Page.propTypes = {
    title: PropTypes.string.isRequired
}*/