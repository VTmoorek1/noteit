import React, { Component } from 'react';
import OkButton from './OkButton';
import CancelButton from './CancelButton';
import '../stylesheets/dialog.css'
import '../stylesheets/generaldialog.css';

interface Props {
    add: (title : string,desc : string, fileInput : File | null) => void,
    cancel: (e? : React.MouseEvent<HTMLButtonElement,MouseEvent>) => void
}

interface State {
    [x: string]: any,
    fileInput : (File | null),
}

/**
 * Dialog class represents the input of media (video,audio,image), title 
 * and decription
 */
export default class Dialog extends Component<Props,State> {

    constructor(props : Props)
    {
        super(props);

        this.state = {title : '' ,
                        desc : '',
                        fileLabel : '',
                        fileInput : null};

        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.addAction = this.addAction.bind(this);

    }

    handleChange(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        this.setState({[e.currentTarget.name] : e.currentTarget.value});
    }

    handleFileChange(e : React.ChangeEvent<HTMLInputElement>)
    {
        const files = e.target.files;

        if (files)
        {
            this.setState({fileLabel : files[0].name, fileInput : files[0]});
        }
    }

    addAction () {
        const {title,desc,fileInput} = this.state;
        this.props.add(title,desc,fileInput);
    }

    render() {
        return <div className="dialog">
            <div className="form">
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Note Name</label>
                        <input name="title" onChange={this.handleChange} value ={this.state.title} type="text" className="form-control" id="noteTitle" placeholder="My note.." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteDes">Note Description</label>
                        <textarea name="desc" onChange={this.handleChange} value ={this.state.desc} className="form-control" id="noteDes" rows={4} placeholder="Describe your note.."></textarea>
                    </div>
                    <div className="custom-file">
                        <input accept="audio/*,video/*,image/*" onChange={this.handleFileChange} type="file" className="custom-file-input" id="noteFile" required />
                        <label id="fileLabel" className="custom-file-label" htmlFor="noteFile">{this.state.fileLabel}</label>
                    </div>
                    <div id="dBtnDiv">
                        <OkButton onClick={this.addAction} />
                        <CancelButton onClick={this.props.cancel} />
                    </div>
                </form>
            </div>
        </div>;
    }
}

