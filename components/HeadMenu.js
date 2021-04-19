import React, { Component } from 'react';
import User from './User';
import '../stylesheets/headmenu.css';
import LoginDialogContainer from '../containers/LoginDialogContainer';
import SignupDialogContainer from '../containers/SignupDialogContainer';

export default class HeadMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLoginDlg: false,
            showSignupDlg: false,
            loggedInName : null
        }

        this.loginClicked = this.loginClicked.bind(this);
        this.okLogin = this.okLogin.bind(this);
        this.cancelLogin = this.cancelLogin.bind(this);
        this.hideDialogs = this.hideDialogs.bind(this);
        this.signoutClicked = this.signoutClicked.bind(this);

    }

    async signoutClicked()
    {
        // First send authentication logout to server
        await fetch(window.location.href + 'auth/logout' , {
            method : 'DELETE'
        });

        this.setState({loggedInName : null});
    }

    loginClicked(e) {   

        let dlgObj = { showLoginDlg: true };    

        if (e.target.name === 'signup') {
            dlgObj = { showSignupDlg: true };
        }

        this.setState(dlgObj);
    }

    okLogin(loginData) {
        console.log('email: ' + loginData.email + ' Password: ' + loginData.password + ' Name: ' + loginData.name );

        this.hideDialogs(loginData.isSignup);
        this.setState({loggedInName : loginData.name});
    }

    hideDialogs(isSignup) {
        let dlgObj = { showLoginDlg: false };

        if (isSignup) {
            dlgObj = { showSignupDlg: false };
        }

        this.setState(dlgObj);
    }

    cancelLogin(e) {
        let buttonName = e.target.id;
        this.hideDialogs(buttonName && buttonName.startsWith('signUp'));
    }

    render() {

        let main = <div id="navDiv">
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <span id="menuIcon" className="fa fa-paper-plane"></span>
                        NoteIt
                </a>
                <div id="loginDiv">
                    {this.state.loggedInName ? 
                    <div>
                        <User name={this.state.loggedInName}/>
                        <button name="signout" onClick={this.signoutClicked} className="btn btn-primary" id="signoutBtn" type="button">Log Out</button> 
                    </div> :
                    <div id="loginBtnDiv">
                        <button name="login" onClick={this.loginClicked} className="btn btn-primary" id="loginBtn" type="button">Log In</button>
                        <button name="signup" onClick={this.loginClicked} className="btn btn-info" id="signUpBtn" type="button">Sign Up</button>
                    </div>}
                </div>
            </nav>

            {this.state.showLoginDlg && <LoginDialogContainer okHandler={this.okLogin} cancelHandler={this.cancelLogin} />}
            {this.state.showSignupDlg && <SignupDialogContainer okHandler={this.okLogin} cancelHandler={this.cancelLogin} />}
        </div>;

        return main;
    }
}