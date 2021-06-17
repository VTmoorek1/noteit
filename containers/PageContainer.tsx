'use strict';

import React, { Component } from 'react';
import Page from '../components/Page';
import {connect} from 'react-redux';
import * as NoteActions from '../redux/actions/noteActions';
import { NoteItem, RemoveNoteItem } from '../interfaces/noteinterface';
import { NoteState } from '../redux/reducers/noteReducer';
import { ThunkDispatch } from 'redux-thunk';

interface PageProps {
    pageName : string,
    removeNoteObj : RemoveNoteItem | null,
    notes : NoteItem[],
    setRemoveNoteObj : (obj : RemoveNoteItem | null) => void,
    deleteNote : (id : string) => void,
    fetchNotes : (pageName : string) => void,
    addNote : (title : string,desc : string,fileInput : Blob,user : string , page : string) => void
}

/**
 * Page component loads and displays notes associated with it. The 
 * notes are loaded from the web server 
 */
class PageContainer extends Component<PageProps> {
    constructor(props : PageProps) {
        super(props);

        this.removeClick = this.removeClick.bind(this);
        this.cancelRemove = this.cancelRemove.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.sendNote = this.sendNote.bind(this);
        this.loadNotes = this.loadNotes.bind(this);

    }

    removeClick(obj : RemoveNoteItem) {
        this.props.setRemoveNoteObj(obj);
    }

    cancelRemove() {
        this.props.setRemoveNoteObj(null);
    }

    removeNote(id : string) {
        this.props.deleteNote(id);
        this.props.setRemoveNoteObj(null);
    }

    sendNote(title : string, desc : string, fileInput : Blob, user : string, page : string) {
        this.props.addNote(title,desc,fileInput,user,page);
    }

    loadNotes() {
        this.props.fetchNotes(this.props.pageName);
    }

    componentDidMount() {
        this.loadNotes();
    }

    componentDidUpdate(prevProps : PageProps) {
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

const mapStateToProps = ({note} : {note : NoteState}) => ({
    notes : note.notes,
    removeNoteObj : note.removeNoteObj
});

const mapDispatchToProps = (dispatch : ThunkDispatch<NoteState,void,NoteActions.NoteAction>) => ({
    setRemoveNoteObj : (obj : RemoveNoteItem | null) => NoteActions.setRemoveNoteObj(obj,dispatch),
    deleteNote : (id : string) => dispatch(NoteActions.deleteNote(id)),
    fetchNotes : (pageName : string) => dispatch(NoteActions.fetchNotes(pageName)),
    addNote : (title : string,desc : string,fileInput : Blob,user : string , page : string) => 
        dispatch(NoteActions.addNote(title,desc,fileInput,user,page))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageContainer);