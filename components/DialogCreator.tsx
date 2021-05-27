import React, { Component } from 'react';
import '../stylesheets/generaldialog.css';
import OkButton from './OkButton';
import CancelButton from './CancelButton';
import GeneralDialog from './GeneralDialog';


export interface DCProps {
    cancelHandler : (e? :  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    errorStr?: (string | null),
    loginSuccessAction : (...params : string[]) => void
}

export interface DCState {
    [key:string] : string
}

export function dialogCreator(hasName : boolean,
    DialogComponent : React.ComponentType<any>)
{
    return class extends Component<DCProps,DCState> {

        constructor(props : DCProps) {
            super(props);
    
            this.state = {
                email: '',
                password: '',
                name : '',
                nameClass : '',
                emailClass: '',
                passwordClass: ''
            };
    
            this.handleChange = this.handleChange.bind(this);
            this.okButtonPressed = this.okButtonPressed.bind(this);
            this.setClass = this.setClass.bind(this);
        }
    
        handleChange(e : React.ChangeEvent<HTMLInputElement>) {
            this.setState({ [e.target.name]: e.target.value });
        }
        
        setClass(classObj : object)
        {
            this.setState(classObj);
        }
    
        okButtonPressed(e? : React.MouseEvent<HTMLButtonElement,MouseEvent>) {
            // This can only happen if valid data
            e?.preventDefault();
    
            let emailCls = 'is-valid';
            let passwordCls = 'is-valid';
            let nameCls = 'is-valid';
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
    
                if (hasName && !this.isValidName(this.state.name)) {
                    nameCls = 'is-invalid';
                    validInput = false;
                }
    
                if (validInput) {
                    this.props.loginSuccessAction(this.state.email,this.state.password,this.state.name);
                }
                else {
                    this.setState({ emailClass: emailCls, passwordClass: passwordCls, nameClass: nameCls});
                }
    
            } catch (err) {
                console.log('Login Error: ' + err);
            }
    
        }

        isValidName(name : string) {
            return name.match(/[A-Za-z]{3,25}/g);
        }
    
        render() { 
    
            const {errorStr,cancelHandler,...otherProps} = this.props;
    
            return <div id="signUpDlg" className="dialog">
                <div className="signUpForm">
                    <form className="needs-validation" noValidate>
                        <DialogComponent {...otherProps} handleChange={this.handleChange} 
                            setClass={this.setClass} formData={this.state}/>
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
    };
    
}

