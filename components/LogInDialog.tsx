import React, { Component } from 'react';
import GeneralDialog from './GeneralDialog';
import '../stylesheets/logindialog.css';
import '../stylesheets/generaldialog.css';
import OkButton from './OkButton';
import CancelButton from './CancelButton';

interface Props {
    okHandler? : () => void,
    cancelHandler : (e? :  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    login: (name: string, password: string) => void,
    loginStr?: (string | null),
    errorStr?: (string | null)
}

interface State {
    [key:string] : string
}

/**
 * Dialog class handles login
 */
export default class LogInDialog extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emailClass: '',
            passwordClass: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.okButtonPressed = this.okButtonPressed.bind(this);

    }

    handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        this.setState({ [e.target.name]: e.target.value });
    }

    okButtonPressed(e? : React.MouseEvent<HTMLButtonElement>) {

        // This can only happen if valid data
        e?.preventDefault();

        let emailCls = 'is-valid';
        let passwordCls = 'is-valid';
        let validInput = true;
        const {email,password} = this.state;

        try {

            if (!GeneralDialog.isValidEmail(email)) {
                emailCls = 'is-invalid';
                validInput = false;
            }

            if (!GeneralDialog.isValidPassword(password)) {
                passwordCls = 'is-invalid';
                validInput = false;
            }

            if (validInput) {
                this.props.login(email, password);
            }
            else {
                this.setState({ emailClass: emailCls, passwordClass: passwordCls });
            }

        } catch (err) {
            console.log('Login Error: ' + err);
        }

    }

    render() {

        const { errorStr, cancelHandler } = this.props;
        const {email,password,emailClass,passwordClass} = this.state;

        return <div id="logInDlg" className="dialog">
            <div className="loginForm">
                <form className="needs-validation" noValidate>
                    <span id="loginIcon" className="fa fa-paper-plane fa-3x"></span>
                    <h2>Log In</h2>
                    <div className="form-group">
                        <div>
                            <input name="email" onChange={this.handleChange} value={email} type="email"
                                className={"form-control " + emailClass + " tbSpacing"} id="emailTB" placeholder="Email Address" required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                            <div className="invalid-feedback">
                                Enter a valid email.
                        </div>
                        </div>
                        <div>
                            <input name="password" onChange={this.handleChange} value={password} type="password"
                                className={"form-control " + passwordClass + " tbSpacing"} id="passwordTB" placeholder="Password" required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                            <div className="invalid-feedback">
                                Enter a password more than 6 characters.
                        </div>
                        </div>
                    </div>
                    {errorStr &&
                        <div className="loginMessage">
                            <h4>{errorStr}</h4>
                        </div>
                    }
                    <div id="loginBtnDiv">
                        <OkButton onClick={this.okButtonPressed} />
                        <CancelButton onClick={cancelHandler} />
                    </div>
                </form>
            </div>
        </div>;
    }
}


