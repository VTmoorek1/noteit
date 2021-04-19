import React, { Component } from 'react';
import GeneralDialog from './GeneralDialog';
import PropTypes from 'prop-types';
import '../stylesheets/logindialog.css';
import '../stylesheets/generaldialog.css';

/**
 * Dialog class handles login
 */
export default class LogInDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emailClass: '',
            passwordClass: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.okButtonPressed = this.okButtonPressed.bind(this);

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async okButtonPressed(e) {
        // This can only happen if valid data
        e.preventDefault();

        let emailCls = 'is-valid';
        let passwordCls = 'is-valid';
        let validInput = true;
        let loginStr = '';

        try {

            if (!GeneralDialog.isValidEmail(this.state.email)) {
                emailCls = 'is-invalid';
                validInput = false;
            }

            if (!GeneralDialog.isValidPassword(this.state.password)) {
                passwordCls = 'is-invalid';
                validInput = false;
            }

            if (validInput) {
                loginStr = await this.props.login(this.state.email, this.state.password);
            }

            if (loginStr.startsWith('success')) {
                this.props.okHandler({ email: this.state.email, password: this.state.password, name : loginStr.replace('success ',''),
                    isSignup : false });
            }
            else {
                this.setState({ emailClass: emailCls, passwordClass: passwordCls});
            }

        } catch (err) {
            console.log('Login Error: ' + err);
        }

    }

    render() {
        return <div id="logInDlg" className="dialog">
            <div className="loginForm">
                <form className="needs-validation" noValidate>
                    <span id="loginIcon" className="fa fa-paper-plane fa-3x"></span>
                    <h2>Log In</h2>
                    <div className="form-group">
                        <div>
                            <input name="email" onChange={this.handleChange} value={this.state.email} type="email"
                                className={"form-control " + this.state.emailClass + " tbSpacing"} id="emailTB" placeholder="Email Address" required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                            <div className="invalid-feedback">
                                Enter a valid email.
                        </div>
                        </div>
                        <div>
                            <input name="password" onChange={this.handleChange} value={this.state.password} type="password"
                                className={"form-control " + this.state.passwordClass + " tbSpacing"} id="passwordTB" placeholder="Password" required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                            <div className="invalid-feedback">
                                Enter a password more than 6 characters.
                        </div>
                        </div>
                    </div>
                    {this.props.loginStr &&
                        <div className="loginMessage">
                            <h4>{this.props.loginStr}</h4>
                        </div>
                    }
                    <div id="loginBtnDiv">
                        <button onClick={this.okButtonPressed}
                            className="btn btn-success circleButtons" id="okBtn" type="submit"><i className="fa fa-check"></i></button>
                        <button onClick={this.props.cancelHandler} className="btn btn-danger circleButtons" id="cancelBtn" type="button"><i className="fa fa-times"></i></button>
                    </div>
                </form>
            </div>
        </div>;
    }
}

LogInDialog.propTypes = {
    okHandler: PropTypes.func,
    cancelHandler: PropTypes.func
};

