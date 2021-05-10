import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/generaldialog.css';
import OkButton from './OkButton';
import CancelButton from './CancelButton';

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
                        {this.props.okAction && <OkButton onClick={()=>{this.props.okAction(this.state.title)}} />}
                        {this.props.cancelAction && <CancelButton onClick={this.props.cancelAction} />}
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

GeneralDialog.isValidEmail = (email) => {
    return email.match(/[A-Za-z0-9]+@{1}[A-Za-z]+\.{1}[A-Za-z]{3}/g);
}

GeneralDialog.isValidPassword = (password) => {
    return password.length > 6;
}

GeneralDialog.validationListener = () =>
{
    window.addEventListener('load',() => {

        let forms = document.getElementsByClassName('needs-validation');

        forms.filter((form) => {
            form.addEventListener('submit', (event) => {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                  }

                  form.classList.add('was-validated');
            });
        });
    });
}