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

    getPageItems()
    {
        return [<li><a href="">Main Page</a></li>,<li><a href="">Second Page</a></li>];
    }

    render() {

        return <div id="pageMenu">
            <ul id="pageList">
                {this.getPageItems()}
            </ul>
        </div>;
    }

}