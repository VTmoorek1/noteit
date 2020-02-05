import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * General use dialog. Can set message and ok and cancel action events
 * from parent
 */
export default class GeneralDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title : ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        return <div className="dialog">
            <div id="gdForm">
                <h4>{this.props.message}</h4>
                {this.props.textBox && <input name="title" onChange={this.handleChange} 
                    value ={this.state.title} type="text" className="form-control" id="gdTextBox" />}
                <div id="gdBtnDiv">
                        {this.props.okAction && <button onClick={()=>{this.props.okAction(this.state.title)}}
                            className="btn btn-success circleButtons" id="okBtn" type="button"><i className="fa fa-check"></i></button>}
                        {this.props.cancelAction && <button onClick={this.props.cancelAction} className="btn btn-danger circleButtons" 
                            id="cancelBtn" type="button"><i className="fa fa-times"></i></button>}
                    </div>
            </div>
        </div>;
    }
}

GeneralDialog.propTypes = {
    message: PropTypes.string.isRequired,
    okAction: PropTypes.func,
    cancelAction: PropTypes.func,
    textBox : PropTypes.bool
};

GeneralDialog.defaultProps = {
    textBox : false
}