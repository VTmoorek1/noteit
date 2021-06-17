import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from './Media';
import '../stylesheets/note.css';
import { RemoveNoteItem } from '../interfaces/noteinterface';

interface Props {
    title : string,
    mID : string,
    desc : string,
    file : Blob,
    remove : (remObj : RemoveNoteItem) => void
}

/**
 * Note is a container for a user (future enhancement), title, 
 * description, and media component. These will fill the current page
 * loaded
 */
export default class Note extends Component<Props> {

    constructor(props : Props) {
        super(props);
    }

    render() {

        const {mID,title,file,desc,remove} = this.props;
        const remNote = {id : mID, name : title};

        return <div className="note bg-dark">
            <div id="topDiv">
                <img src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13000724/Belgian-Malinois-On-White-01.jpg" className="userImg" />
                <div id="titleDiv">
                    <h3 id="title">{title}</h3>
                </div>
                <div id="topBtnDiv">
                    <button onClick={() => remove(remNote)} 
                    className="btn btn-danger circleButtons" id="cancelNoteBtn" type="button"><i className="fa fa-times"></i></button>
                </div>
            </div>
            <div id="midDiv">
                <Media file={file} mediaID={mID} />
            </div>
            <div id="bottomDiv">
                <h6>{desc}</h6>
            </div>
        </div>;

    }

} 
