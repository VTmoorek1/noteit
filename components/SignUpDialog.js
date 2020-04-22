import React, { Component } from 'react';
import GeneralDialog from './GeneralDialog';
import PropTypes from 'prop-types';

/**
 * Dialog class handles sign up
 */
export default class SignUpDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name,
            emailClass: '',
            passwordClass: '',
            nameClass : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.okButtonPressed = this.okButtonPressed.bind(this);

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    okButtonPressed(e) {
        // This can only happen if valid data
        e.preventDefault();

        let emailCls = 'is-valid';
        let passwordCls = 'is-valid';
        let nameCls = 'is-valid';
        let validInput = true;

        if (!GeneralDialog.isValidEmail(this.state.email)) {
            emailCls = 'is-invalid';
            validInput = false;
        }

        if (!GeneralDialog.isValidPassword(this.state.password)) {
            passwordCls = 'is-invalid';
            validInput = false;
        }

        if (!this.isValidName(this.state.name)) {
            nameCls = 'is-invalid';
            validInput = false;
        }

        if (validInput) {
            this.props.okHandler({
                email: this.state.email, password: this.state.password,
                name: this.state.name
            });
        }

        this.setState({ emailClass: emailCls, passwordClass: passwordCls, nameClass : nameCls });

    }

    isValidName(name)
    {
        return name.match(/[A-Za-z]{3,25}/g);
    }

    render() {
        return <div id="signUpDlg" className="dialog">
            <div className="signUpForm">
                <form className="needs-validation" noValidate>
                    <span id="signUpIcon" className="fa fa-paper-plane fa-3x"></span>
                    <h2>Sign Up</h2>
                    <div className="form-group">
                        <div>
                            <input name="name" onChange={this.handleChange} value={this.state.name} type="text"
                                className={"form-control tbSpacing "  + this.state.nameClass} id="nameTB" placeholder="Name" required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                            <div className="invalid-feedback">
                                Enter a valid name.
                        </div>
                        </div>
                        <div>
                            <input name="email" onChange={this.handleChange} value={this.state.email} type="email"
                                className={"form-control tbSpacing " + this.state.emailClass} id="emailTB" placeholder="Email Address" required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                            <div className="invalid-feedback">
                                Enter a valid email.
                        </div>
                        </div>
                        <div>
                            <input name="password" onChange={this.handleChange} value={this.state.password} type="password"
                                className={"form-control tbSpacing " + this.state.passwordClass} id="passwordTB" placeholder="Password" required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                            <div className="invalid-feedback">
                            Enter a password more than 6 characters.
                        </div>
                        </div>
                    </div>
                    <div id="signUpBtnDiv">
                        <button onClick={this.okButtonPressed}
                            className="btn btn-success circleButtons" id="okBtn" type="submit"><i className="fa fa-check"></i></button>
                        <button name="signUpBTN" onClick={this.props.cancelHandler} className="btn btn-danger circleButtons" id="cancelBtn" type="button"><i className="fa fa-times"></i></button>
                    </div>
                </form>
            </div>
        </div>;
    }
}

SignUpDialog.propTypes = {
    okHandler : PropTypes.func,
    cancelHandler : PropTypes.func
};