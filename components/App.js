import React, { Component } from 'react';
import Page from './Page';
import PageMenu from './PageMenu';
import HeadMenu from './HeadMenu';
import Spinner from './Spinner';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: null,
            loading: true
        }

        this.pageSelected = this.pageSelected.bind(this);
        this.deletePage = this.deletePage.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    pageSelected(pageName) {
        this.setState({ page: <Page key={"PG" + pageName} title={pageName} /> });
    }

    async deletePage(pageName) {
        // Remove from the server
        const response = await fetch(window.location.href + 'page/removepage/' + pageName, {
            method: 'DELETE'
        });

        console.log('note removed ' + await response.text());
        this.setState({ page: null });
    }

    handleLoad()
    {
        this.setState({loading : false});
    }

    render() {


        {/* Use bootstrap for 3 columns, first column to be Page menu,
            second column to be the media page, third column is spacing */}
        let main = <div id="mainApp">
            <HeadMenu />
            <div id="pageMenuDiv">
                {
                    <PageMenu pageLoad={this.handleLoad} 
                        selectedEvent={this.pageSelected} deletePageEvent={this.deletePage} />
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

            {this.state.loading && <Spinner />}
                
        </div>;

        return main;
    }
}