import React, { Component } from 'react';
import '../stylesheets/generaldialog.css';
import OkButton from './OkButton';
import CancelButton from './CancelButton';


export interface DCProps {
    cancelHandler : (e? :  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    errorStr?: (string | null)
}

export interface DCState {
    [key:string] : string
}

export function dialogCreator(okAction : (e? : React.MouseEvent<HTMLButtonElement,MouseEvent>) => void,
    DialogComponent : React.ComponentType)
{
    return class extends Component<DCProps,DCState> {

        constructor(props : DCProps) {
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
    
        okButtonPressed(e? : React.MouseEvent<HTMLButtonElement,MouseEvent>) {
            // This can only happen if valid data
            e?.preventDefault();
            
            okAction();
    
        }
    
        render() { 
    
            const {errorStr,cancelHandler,...otherProps} = this.props;
    
            return <div id="signUpDlg" className="dialog">
                <div className="signUpForm">
                    <form className="needs-validation" noValidate>
                        <DialogComponent {...otherProps}/>
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

