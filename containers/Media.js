import React, { Component } from 'react';

import Utilites from '../bin/Utilites';


export default class Media extends Component {


    constructor(props) {
        super(props);

        //this.state = { showDialog: false };
        this.getFileElement = this.getFileElement.bind(this);
    }

    getFileElement(file) {
        let reader = new FileReader();
        let cID = 'media' + this.props.mediaID;
        let loadFile = file;

        console.log('File type: ' + typeof loadFile);
        console.log(Object.getOwnPropertyNames(loadFile));

        if (loadFile.current) {
            loadFile = file.current.files[0];
        }

        reader.readAsDataURL(loadFile);

        // Use the file reader to load up media        
        reader.onload = (event) => {

            console.log('Loading: ' + event.target.result);
            document.getElementById(cID).src = event.target.result;

        };

        const MEDIA_TYPES = {
            image: <img id={cID} src='#' />,
            video: <video controls id={cID} src='#' />,
            audio: <audio controls id={cID} src='#' />
        }

        return MEDIA_TYPES[Utilites.getFileType(loadFile.type)];
    }

    render() {
        return <div id="mediaDiv">
            {this.getFileElement(this.props.file)}
        </div>;
    }

}