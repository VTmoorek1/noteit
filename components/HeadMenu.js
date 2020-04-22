import React, { Component } from 'react';
import LogInDialog from './LogInDialog';
import SignUpDialog from './SignUpDialog';

export default class HeadMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLoginDlg: false,
            showSignupDlg : false
        }

        this.loginClicked = this.loginClicked.bind(this);
        this.okLogin = this.okLogin.bind(this);
        this.cancelLogin = this.cancelLogin.bind(this);
        this.hideDialogs = this.hideDialogs.bind(this);

    }

    loginClicked(e) {

        let dlgObj = {showLoginDlg : true};

        if (e.target.name === 'signup')
        {
            dlgObj = {showSignupDlg : true};
        }

        this.setState(dlgObj);
    }

    okLogin(loginData) {
        console.log('email: ' + loginData.email + ' Password: ' + loginData.password);

        this.hideDialogs(!loginData.name);
    }

    hideDialogs(isLogin)
    {
        let dlgObj = {showLoginDlg : false};

        if (!isLogin)
        {
            dlgObj = {showSignupDlg : false};
        }

        this.setState(dlgObj);
    }

    cancelLogin(e) {
        
        console.log(e.target);

        this.hideDialogs(e.target.name !== 'signUpBTN');
    }

    render() {

        let main = <div id="navDiv">
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <span className="fa fa-paper-plane"></span>
                        NoteIt
                </a>
                <div id="loginDiv">
                <button  name = "login" onClick={this.loginClicked} className="btn btn-primary" id="loginBtn" type="button">Log In</button>
                <button  name = "signup" onClick={this.loginClicked} className="btn btn-info" id="signUpBtn" type="button">Sign Up</button>
                </div>
            </nav>

            {this.state.showLoginDlg && <LogInDialog okHandler={this.okLogin} cancelHandler={this.cancelLogin}/>}
            {this.state.showSignupDlg && <SignUpDialog okHandler={this.okLogin} cancelHandler={this.cancelLogin}/>}
        </div>;

        return main;
    }
}