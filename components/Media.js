import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Utilites from '../bin/Utilites';

/**
 * Container for media which can be a video, audio, or image
 */ 
export default class Media extends Component {


    constructor(props) {
        super(props);

        this.getFileElement = this.getFileElement.bind(this);
    }

    getFileElement(file) {
        let reader = new FileReader();
        let cID = 'media' + this.props.mediaID;

        reader.readAsDataURL(file);

        // Use the file reader to load up media        
        reader.onload = (event) => {
            document.getElementById(cID).src = event.target.result;
        };

        const MEDIA_TYPES = {
            image: <img id={cID} src='#' />,
            video: <video controls id={cID} src='#' />,
            audio: <audio controls id={cID} src='#' />
        }

        return MEDIA_TYPES[Utilites.getFileType(file.type)];
    }

    render() {
        return <div id="mediaDiv">
            {this.getFileElement(this.props.file)}
        </div>;
    }

}

Media.propTypes = {
    file : PropTypes.object.isRequired,
    mediaID : PropTypes.string.isRequired
}