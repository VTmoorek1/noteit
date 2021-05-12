'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import {connect} from 'react-redux';
import * as noteActions from '../redux/actions/noteActions';

/**
 * Page component loads and displays notes associated with it. The 
 * notes are loaded from the web server 
 */
class PageContainer extends Component {
    constructor(props) {
        super(props);

        this.removeClick = this.removeClick.bind(this);
        this.cancelRemove = this.cancelRemove.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.sendNote = this.sendNote.bind(this);
        this.loadNotes = this.loadNotes.bind(this);

    }

    removeClick(obj) {
        noteActions.setRemoveNoteObj(obj,this.props.dispatch);
    }

    cancelRemove() {
        noteActions.setRemoveNoteObj(null,this.props.dispatch);
    }

    removeNote(id) {
        this.props.dispatch(noteActions.deleteNote(id));
        noteActions.setRemoveNoteObj(null,this.props.dispatch);
    }

    sendNote(title, desc, fileInput, user, page) {
        this.props.dispatch(noteActions.addNote(title,desc,fileInput,user,page));
    }

    loadNotes() {
        this.props.dispatch(noteActions.fetchNotes(this.props.pageName));
    }

    componentDidMount() {
        this.loadNotes();
    }

    componentDidUpdate(prevProps) {
        if (this.props.pageName !== prevProps.pageName) {
            this.loadNotes();
        }
    }
    
    render() {

        const {notes,removeNoteObj } = this.props;

        return <div id="pageContainerDiv">
            <Page notes={notes} removeNote={this.removeNote} sendNote={this.sendNote} cancelRemove={this.cancelRemove}
                removeNoteObj={removeNoteObj} removeClick={this.removeClick} pageName={this.props.pageName} />
        </div>
    }

}

PageContainer.propTypes = {
    pageName : PropTypes.string.isRequired
}

export default connect(store => ({
    notes : store.note.notes,
    removeNoteObj : store.note.removeNoteObj
}))(PageContainer);