import React, { Component } from 'react';

import Page from './Page';
import Dialog from './Dialog';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.hideDialog = this.hideDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.getDialogData = this.getDialogData.bind(this);

        this.state = {
            showDialog: false,
            page : <Page title='Funny Page' showDlg={this.showDialog} hideDlg={this.hideDialog}/>
        }

    }

    showDialog()
    {
        this.setState({showDialog : true});
    }

    hideDialog() {
        this.setState({ showDialog: false });
    }

    getDialogData(title, desc, fileInput, user = 'Kevin') {
        
        console.log('file layout: ' + JSON.stringify(fileInput.current.files[0].name));
        const noteObj = {"noteTitle" : title, "desc" : desc, "file" : fileInput.current.files[0],"user":user};
        this.setState({showDialog : false,
                        page : <Page title='Funny Page' showDlg={this.showDialog} hideDlg={this.hideDialog}
                         {...noteObj} />});

    }

    render() {

        let dialog = <div></div>;

        if (this.state.showDialog) {
            dialog = <Dialog cancel={this.hideDialog} add={this.getDialogData} />;
        }

        let main = <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                    </div>
                    {this.state.page}
                    <div className="col-2">
                    </div>
                </div>

                {dialog}
            </div>
        </div>;

        return main;
    }
}