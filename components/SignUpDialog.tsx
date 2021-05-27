import React, { Component } from 'react';
import GeneralDialog from './GeneralDialog';
import '../stylesheets/generaldialog.css';
import OkButton from './OkButton';
import CancelButton from './CancelButton';


interface Props {
    formData: { [key: string]: string }
    setClass: (classObj: object) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface State {
    [key: string]: string
}

/**
 * Dialog class handles sign up
 */
export default class SignUpDialog extends Component<Props, State> {

    constructor(props: Props) {
        super(props);


        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.handleChange(e);
    }

    render() {

        return <div>
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
        </div>
    }
}
