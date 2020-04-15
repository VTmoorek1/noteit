import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Each item in the page menu
 */
export default class PageMenuItem extends Component {

    constructor(props) {
        super(props);


        this.onAnyClick = this.onAnyClick.bind(this);

    }

    onAnyClick(e)
    {
        this.props.selectedAction(e);
    }

    render () {

        let style = this.props.selected ? "btn btn-primary pageCellSelected" : "btn btn-primary pageCellBtn";

        return <tr key={this.props.id}><td><button value={this.props.title} onClick={this.onAnyClick} type="button" 
            onContextMenu={this.onAnyClick} className={style}>{this.props.title}</button></td></tr>;
    }

}

PageMenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    id : PropTypes.string.isRequired,
    selected : PropTypes.bool.isRequired,
    selectedAction : PropTypes.func.isRequired
}