import React, { Component } from 'react';

import Dialog from './Dialog';
import Note from './Note';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = { showDialog: false,
                        notes : [] };

        this.addClick = this.addClick.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.getDialogData = this.getDialogData.bind(this);
    }

    addClick(e) {
        e.preventDefault();

        this.setState({ showDialog: true });
    }

    hideDialog() 
    {
        this.setState({ showDialog : false});
    }

    getDialogData(title,desc,fileInput)
    {
        let fileName = null;

        if (fileInput.current.files[0])
        {
            fileName = fileInput.current.files[0].name;
        }

        console.log(title + " " + desc + " " + fileName + " abc " + this.state.notes);
        this.hideDialog();
        this.setState({notes : [<Note key={this.state.notes.length+1} mID={this.state.notes.length+1} title={title} desc={desc} file={fileInput} />,...this.state.notes]});
    }

    render() {

        let dialog = <div></div>;

        if (this.state.showDialog) {
            dialog = <Dialog cancel={this.hideDialog} add={this.getDialogData}/>;
        }

        let main = <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div id="buttonDiv" className="col-8">
                        {this.state.notes}
                        <button onClick={this.addClick} id="addBtn" type="button" className="btn btn-primary"><i className="fa fa-plus"></i></button>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>

            {dialog}

        </div>;

        return main;
    }
}