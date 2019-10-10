import React, { Component } from 'react';

import Utilites from '../bin/Utilites';


export default class Media extends Component {
 

    constructor(props) {
        super(props);

        //this.state = { showDialog: false };
        this.getFileElement = this.getFileElement.bind(this);
    }

    getFileElement(file)
    {
        let reader = new FileReader();
        let cID = 'media' + this.props.mediaID;

        // Use the file reader to load up media
        reader.readAsDataURL(file.current.files[0]);
        reader.onload = (event) => {
            document.getElementById(cID).src = event.target.result;
        };

        const MEDIA_TYPES = {
            image : <img id={cID} src='#' />,
            video : <video controls id={cID} src='#' />,
            audio : <audio controls id={cID} src='#' />
        }

        console.log('type:   ' + Utilites.getFileType(file.current.files[0].type));
        
        return MEDIA_TYPES[Utilites.getFileType(file.current.files[0].type)];
    }

    render()
    {
        return <div id="mediaDiv">
            {this.getFileElement(this.props.file)}
        </div>;
    }

}