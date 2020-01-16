import React, { Component } from 'react';


/**
 * Dialog class represents the input of media (video,audio,image), title 
 * and decription
 */
export default class Dialog extends Component {

    constructor(props)
    {
        super(props);

        this.state = {title : '' ,
                        desc : '',
                        file : undefined};

        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.addAction = this.addAction.bind(this);
        this.fileInput = React.createRef();

    }

    handleChange(e)
    {
        this.setState({[e.target.name] : e.target.value});
    }

    handleFileChange(e)
    {
        document.getElementById('fileLabel').innerHTML = this.fileInput.current.files[0].name; 
    }

    addAction () {
        this.props.add(this.state.title,this.state.desc,this.fileInput);
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
                        <textarea name="desc" onChange={this.handleChange} value ={this.state.desc} className="form-control" id="noteDes" rows="4" placeholder="Describe your note.."></textarea>
                    </div>
                    <div className="custom-file">
                        <input accept="audio/*,video/*,image/*" ref={this.fileInput} onChange={this.handleFileChange} type="file" className="custom-file-input" id="noteFile" required />
                        <label id="fileLabel" className="custom-file-label" htmlFor="noteFile">Choose note file...</label>
                    </div>
                    <div id="dBtnDiv">
                        <button onClick={this.addAction} 
                            className="btn btn-success circleButtons" id="okBtn" type="button"><i className="fa fa-check"></i></button>
                        <button onClick={this.props.cancel} className="btn btn-danger circleButtons" id="cancelBtn" type="button"><i className="fa fa-times"></i></button>
                    </div>
                </form>
            </div>
        </div>;
    }
}
