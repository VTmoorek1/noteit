import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class GeneralDialog extends Component {

    constructor(props) {
        super(props);

        
    }

    render() {
        return <div className="dialog">
            <div id="gdForm">
                <h4>{this.props.message}</h4>
                <div id="gdBtnDiv">
                        <button onClick={this.props.okAction}
                            className="btn btn-success circleButtons" id="okBtn" type="button"><i className="fa fa-check"></i></button>
                        <button onClick={this.props.cancelAction} className="btn btn-danger circleButtons" id="cancelBtn" type="button"><i className="fa fa-times"></i></button>
                    </div>
            </div>
        </div>;
    }
}

GeneralDialog.propTypes = {
    message: PropTypes.string.isRequired,
    okAction: PropTypes.func,
    cancelAction: PropTypes.func
};