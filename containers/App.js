import React, { Component } from 'react';
import Page from './Page';
import PageMenu from './PageMenu';

export default class App extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        
        let page = <Page title="Funny Page" />

        let main = <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        
                    </div>
                    <div className="col-9">
                        {page}
                    </div>
                    <div className="col-1">
                    </div>
                </div>
            </div>
        </div>;

        return main;
    }
}