import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUpDialog from '../components/SignUpDialog';

/**
 * Dialog class handles sign up
 */
export default class SignupDialogContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            regMessage: null
        };

        this.registerUser = this.registerUser.bind(this);

    }

    async registerUser(email, name, password) {
        try {

            // Use fetch to try and register user 
            const response = await fetch(window.location.href + 'auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                    'name': name
                })
            });

            const resText = await response.text();

            this.setState({regMessage : resText});

            return resText;
        } catch (err) {
            console.log('Error: ' + err);
        }
    }

    render() {

        const {okHandler,cancelHandler} = this.props;

        return <div id="signUpDlgContainer">
            <SignUpDialog okHandler={okHandler} cancelHandler={cancelHandler} regMessage={this.state.regMessage} 
               registerUser={this.registerUser} />
        </div>;
    }
}

SignUpDialog.propTypes = {
    okHandler: PropTypes.func,
    cancelHandler: PropTypes.func
};