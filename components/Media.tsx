import React, { Component } from 'react';
import Utilites from'../bin/Utilites'; 
import '../stylesheets/media.css';

interface Props {
    file : Blob,
    mediaID : string
}

/**
 * Container for media which can be a video, audio, or image
 */ 
export default class Media extends Component<Props> {

    constructor(props : Props) {
        super(props);

        this.getFileElement = this.getFileElement.bind(this);
    }

    getFileElement(file : Blob) : JSX.Element {
        const reader = new FileReader();
        const cID = 'media' + this.props.mediaID;

        reader.readAsDataURL(file);

        // Use the file reader to load up media        
        reader.onload = (event) => {

            const element = document.getElementById(cID) as HTMLMediaElement;

            if (element && event.target && typeof event.target.result === 'string')
            {
                element.src = event.target.result;
            }
        };

        const MEDIA_TYPES  = {
            image : <img id={cID} src='#' />,
            video : <video controls id={cID} src='#' />,
            audio : <audio controls id={cID} src='#' />
        }
        
        const fileType = Utilites.getFileType(file.type);

        if (fileType === Utilites.Media.none)
        {
            throw new Error("Could not determine file type");
        }

        return MEDIA_TYPES[fileType];             
    }

    render() {
        return <div id="mediaDiv">
            {this.getFileElement(this.props.file)}
        </div>;
    }

}

