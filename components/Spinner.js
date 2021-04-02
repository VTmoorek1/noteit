import React, { Component } from 'react';
import '../stylesheets/spinner.css';
import '../stylesheets/generaldialog.css';

export default class Spinner extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        let main = <div className="dialog">

            <div id="loader">

            </div>

        </div>;

        return main;
    }
}