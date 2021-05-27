import React, { Component } from 'react';
import '../stylesheets/logindialog.css';
import '../stylesheets/generaldialog.css';

interface Props {
    formData : {[key:string]: string}
    setClass: (classObj : object) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Dialog class handles login
 */
export default class LogInDialog extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.handleChange(e);
    }

    render() {

        const { email, password, emailClass, passwordClass } = this.props.formData;

        return <div>
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
        </div>;

    }
}


