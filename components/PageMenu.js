import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Page Menu will load page items and selected page. Future enhancement.
 */
export default class PageMenu extends Component {

    constructor(props) {
        super(props);

        this.getPageItems = this.getPageItems.bind(this);
    }

    getPageItems() {
        return [<li key="1"><a href="">Main Page</a></li>, <li key="2"><a href="">Second Page</a></li>];
    }

    render() {

        return <div id="pageMenu" className="bg-dark">
            <table id="pageTable">
                <tbody>
                    <tr id="pageTableHeaderRow">
                        <td id="pageTableHeaderCell"x><button id="addPageBtn" type="button" className="btn btn-primary"><i className="fa fa-plus"></i></button></td>
                    </tr>
                    <tr>
                        <td><a>Funny Page</a></td>
                    </tr>
                    <tr>
                        <td><a>News</a></td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }

}