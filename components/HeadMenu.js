import React, { Component } from 'react';
import User from './User';
import '../stylesheets/headmenu.css';
import LoginDialogContainer from '../containers/LoginDialogContainer';
import SignupDialogContainer from '../containers/SignupDialogContainer';
import PropTypes from 'prop-types';

export default class HeadMenu extends Component {

    constructor(props) {
        super(props);

        this.loginClicked = this.loginClicked.bind(this);
        this.cancelLogin = this.cancelLogin.bind(this);
    }

    loginClicked(e) {   

        let dlgObj = { showLoginDlg: true };    

        if (e.target.name === 'signup') {
            dlgObj = { showSignupDlg: true };
        }

        this.props.initiateAuth(dlgObj);

    }

    cancelLogin(e) {
        this.props.cancelAuth();
    }	

    render() {

        const {loggedOn,signoutClicked,showLoginDlg,showSignupDlg} = this.props;

        let main = <div id="navDiv">
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <span id="menuIcon" className="fa fa-paper-plane"></span>
                        NoteIt
                </a>
                <div id="loginDiv">
                    {loggedOn ? 
                    <div>
                        <User name={loggedOn}/>
                        <button name="signout" onClick={signoutClicked} className="btn btn-primary" id="signoutBtn" type="button"
                            onMouseDown={(event) => event.preventDefault()}>Log Out</button> 
                    </div> :
                    <div id="loginBtnDiv">
                        <button name="login" onClick={this.loginClicked} onMouseDown={(event) => event.preventDefault()} className="btn btn-primary" 
                            id="loginBtn" type="button">Log In</button>
                        <button name="signup" onClick={this.loginClicked} className="btn btn-info" onMouseDown={(event) => event.preventDefault()}
                            id="signUpBtn" type="button">Sign Up</button>
                    </div>}
                </div>
            </nav>

            {showLoginDlg && <LoginDialogContainer cancelHandler={this.cancelLogin} />}
            {showSignupDlg && <SignupDialogContainer cancelHandler={this.cancelLogin} />}
        </div>;

        return main;
    }
}

HeadMenu.propTypes = {
    loggedOn : PropTypes.string,
    showLoginDlg : PropTypes.bool,
    showSignupDlg: PropTypes.bool
}