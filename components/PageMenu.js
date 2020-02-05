import React, { Component } from 'react';
import GeneralDialog from './GeneralDialog';
import PropTypes from 'prop-types';

/**
 * Page Menu will load page items and selected page. Future enhancement.
 */
export default class PageMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageItems: [],
            showDialog: false,
            showErrorDialog : false
        };

        this.addPageItem = this.addPageItem.bind(this);
        this.addPageClick = this.addPageClick.bind(this);
        this.okAddPage = this.okAddPage.bind(this);
        this.cancelAddPage = this.cancelAddPage.bind(this);
        this.closeErrorPage = this.closeErrorPage.bind(this);
    }

    addPageItem(title, id) {
        this.setState({
            pageItems: [<tr key={id}><td><button type="button" className="btn btn-primary pageCellBtn">{title}</button></td></tr>,
            ...this.state.pageItems]
        });
    }

    addPageClick() {
        this.setState({ showDialog: true });
    }

    closeErrorPage () {
        this.setState({showErrorDialog: false});
    }

    async okAddPage(pageName) {

        // Check first to see if page exists
        const pageRes = await fetch(window.location.href + "findpage/" + pageName, {
            method: 'GET'
        });

        let pageObj = await pageRes.json();

        if (!pageObj.exists) {

            // Add page on server
            const response = await fetch(window.location.href + "addpage/" + pageName, {
                method: 'POST'
            });

            let id = await response.text;

            // Add to GUI
            this.addPageItem(pageName, id);
            this.setState({ showDialog: false });
        }
        else
        {
            this.setState({showErrorDialog : true});
        }

    }

    cancelAddPage() {
        this.setState({ showDialog: false });
    }

    async componentDidMount() {
        try {
            console.log('Calling get page items...');

            // Use fetch to get pages for menu on component loaded 
            const response = await fetch(window.location.href + 'getpages', {
                method: 'GET'
            });

            let pages = await response.json();

            // Add pages returned from API request
            for (let p of pages) {
                this.addPageItem(p.title, p._id);
            }

        } catch (err) {
            console.log('Error: ' + err);
        }
    }

    render() {

        return <div id="pageMenu" className="bg-dark">
            <table id="pageTable">
                <tbody>
                    <tr id="pageTableHeaderRow">
                        <td id="pageTableHeaderCell"><button id="addPageBtn" type="button" onClick={this.addPageClick}
                            className="btn btn-primary"><i className="fa fa-plus"></i></button></td>
                    </tr>
                    {this.state.pageItems}
                </tbody>
            </table>
            {this.state.showDialog && <GeneralDialog textBox={true} message="Enter Page Name:" okAction={this.okAddPage} cancelAction={this.cancelAddPage} />}
            {this.state.showErrorDialog && <GeneralDialog textBox={false} message="Page Already Exists!" cancelAction={this.closeErrorPage} />}
        </div>;
    }

}