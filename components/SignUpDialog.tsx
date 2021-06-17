import React, { Component } from 'react';
import '../stylesheets/generaldialog.css';
import {dialogCreator} from '../components/DialogCreator';


interface Props<T extends {} = any> {
    formData: { [key:string] : T}
    setClass: (classObj: object) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


/**
 * Dialog class handles sign up
 */
class SignUpDialog extends Component<Props> {

    constructor(props: Props) {
        super(props);


        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.handleChange(e);
    }

    render() {

        const { name, email, password, emailClass, passwordClass, nameClass } = this.props.formData;

        return <div>
            <span id="signUpIcon" className="fa fa-paper-plane fa-3x"></span>
            <h2>Sign Up</h2>
            <div className="form-group">
                <div>
                    <input name="name" onChange={this.handleChange} value={name} type="text"
                        className={"form-control tbSpacing " + nameClass} id="nameTB" placeholder="Name" required />
                    <div className="valid-feedback">
                        Looks good!
                        </div>
                    <div className="invalid-feedback">
                        Enter a valid name.
                        </div>
                </div>
                <div>
                    <input name="email" onChange={this.handleChange} value={email} type="email"
                        className={"form-control tbSpacing " + emailClass} id="emailTB" placeholder="Email Address" required />
                    <div className="valid-feedback">
                        Looks good!
                        </div>
                    <div className="invalid-feedback">
                        Enter a valid email.
                        </div>
                </div>
                <div>
                    <input name="password" onChange={this.handleChange} value={password} type="password"
                        className={"form-control tbSpacing " + passwordClass} id="passwordTB" placeholder="Password" required />
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


export default dialogCreator(true,SignUpDialog);
