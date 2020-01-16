import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from './Media';

/**
 * Note is a container for a user (future enhancement), title, 
 * description, and media component. These will fill the current page
 * loaded
 */
export default class Note extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const remNote = {id :this.props.mID, name : this.props.title};

        return <div className="note bg-dark">
            <div id="topDiv">
                <img src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13000724/Belgian-Malinois-On-White-01.jpg" id="userImg" />
                <div id="titleDiv">
                    <h3 id="title">{this.props.title}</h3>
                </div>
                <div id="topBtnDiv">
                    <button onClick={() => this.props.remove(remNote)} 
                    className="btn btn-danger circleButtons" id="cancelNoteBtn" type="button"><i className="fa fa-times"></i></button>
                </div>
            </div>
            <div id="midDiv">
                <Media file={this.props.file} mediaID={this.props.mID} />
            </div>
            <div id="bottomDiv">
                <h6>{this.props.desc}</h6>
            </div>
        </div>;

    }

} 

Note.propTypes = {
    title : PropTypes.string.isRequired,
    mID : PropTypes.string.isRequired,
    desc : PropTypes.string.isRequired,
    file : PropTypes.object.isRequired,
    remove : PropTypes.func
}