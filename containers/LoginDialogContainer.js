import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogInDialog from '../components/LogInDialog';

/**
 * Dialog class handles login
 */
export default class LoginDialogContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginStr: null
        };

        this.login = this.login.bind(this);
    }


    async login(email, password) {
        try {

            console.log('hererererere'); 

            // Use fetch to try and register user 
            const response = await fetch(window.location.href + 'auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password
                })
            });

            const lStr = await response.text()

           this.setState( {loginStr : lStr});

          console.log(lStr);
            return lStr;
        } catch (err) {
            console.log('Error: ' + err);
        }
    }

    render() {

        const {okHandler,cancelHandler} = this.props;

        return <div id="logInDlgContainer">
            <LogInDialog login={this.login} loginStr={this.state.loginStr} okHandler={okHandler} 
                cancelHandler ={cancelHandler}/>
        </div>;
    }
}


