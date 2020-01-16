import React, { Component } from 'react';
import Page from './Page';
import PageMenu from './PageMenu';

export default class App extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        
        {/* Load the page with media posts here */}
        let page = <Page title="Funny Page" />

        {/* Use bootstrap for 3 columns, first column to be Page menu,
            second column to be the media page, third column is spacing */}
        let main = <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        { // future enhanchement
                            <PageMenu />
                        }
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