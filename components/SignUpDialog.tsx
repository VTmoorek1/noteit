import React, { Component } from 'react';
import GeneralDialog from './GeneralDialog';
import '../stylesheets/generaldialog.css';
import OkButton from './OkButton';
import CancelButton from './CancelButton';


interface Props {
    cancelHandler : (e? :  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    errorStr?: (string | null),
    registerUser : (email : string, password : string, name : string) => void
}

interface State {
    [key:string] : string
}

/**
 * Dialog class handles sign up
 */
export default class SignUpDialog extends Component<Props,State> {

    constructor(props : Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name : '',
            emailClass: '',
            passwordClass: '',
            nameClass: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.okButtonPressed = this.okButtonPressed.bind(this);

    }

    handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async okButtonPressed(e? : React.MouseEvent<HTMLButtonElement,MouseEvent>) {
        // This can only happen if valid data
        e?.preventDefault();

        let emailCls = 'is-valid';
        let passwordCls = 'is-valid';
        let nameCls = 'is-valid';
        let resStr = '';
        let validInput = true;

        try {

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

            console.log("Register response: " + resStr);

            if (validInput) {
                this.props.registerUser(this.state.email, this.state.name, this.state.password);
            }
            else {
                this.setState({ emailClass: emailCls, passwordClass: passwordCls, nameClass: nameCls});
            }

        } catch (err) {
            console.log('Register Error: ' + err);
        }

    }

    isValidName(name : string) {
        return name.match(/[A-Za-z]{3,25}/g);
    }

    render() { 

        const {errorStr,cancelHandler} = this.props;

        return <div id="signUpDlg" className="dialog">
            <div className="signUpForm">
                <form className="needs-validation" noValidate>
                    <span id="signUpIcon" className="fa fa-paper-plane fa-3x"></span>
                    <h2>Sign Up</h2>
                    <div className="form-group">
                        <div>
                            <input name="name" onChange={this.handleChange} value={this.state.name} type="text"
                                className={"form-control tbSpacing " + this.state.nameClass} id="nameTB" placeholder="Name" required />
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
                    {errorStr &&
                        <div className="registerMessage">
                            <h4>{errorStr}</h4>
                        </div>
                    }
                    <div id="signUpBtnDiv">
                        <OkButton onClick={this.okButtonPressed} />
                        <CancelButton id="signUpCancelBtn" onClick={cancelHandler} />
                    </div>
                </form>
            </div>
        </div>;
    }
}
