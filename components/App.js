import React, { Component } from 'react';
import Page from './Page';
import PageMenu from './PageMenu';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: null
        }

        this.pageSelected = this.pageSelected.bind(this);
        this.deletePage = this.deletePage.bind(this);
    }

    pageSelected(pageName) {
        this.setState({ page: <Page key={"PG" + pageName} title={pageName} /> });
    }

    async deletePage(pageName){
        // Remove from the server
        const response = await fetch(window.location.href + 'removepage/' + pageName, {
            method: 'DELETE'
        });

        console.log('note removed ' + await response.text());
        this.setState({page : null});
    }

    render() {


        {/* Use bootstrap for 3 columns, first column to be Page menu,
            second column to be the media page, third column is spacing */}
        let main = <div id="mainApp">
            <div id="pageMenuDiv">
                {
                    <PageMenu selectedEvent={this.pageSelected} deletePageEvent={this.deletePage} />
                }
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-11">
                        {this.state.page}
                    </div>
                    <div className="col-1">
                    </div>
                </div>
            </div>
        </div>;

        return main;
    }
}