import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpDialog';
import {connect} from 'react-redux';
import {registerUser} from '../redux/actions/authActions';
import {dialogCreator} from '../components/DialogCreator';

const SignUpDialog = dialogCreator(true,<SignUpForm />);

/**
 * Dialog class handles sign up
 */
class SignupDialogContainer extends Component {

    constructor(props) {
        super(props);

        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(email,name,password)
    {
        this.props.dispatch(registerUser(email, name, password));
    }

    render() {

        const {cancelHandler,errorStr} = this.props;

        return <div id="signUpDlgContainer">
            <SignUpDialog cancelHandler={cancelHandler} errorStr={errorStr} 
               loginSuccessAction={this.registerUser} />
        </div>;
    }
}

SignupDialogContainer.propTypes = {
    okHandler: PropTypes.func,
    cancelHandler: PropTypes.func
};

export default connect(store => (
    {
        errorStr : store.app.signup.error
    }
))(SignupDialogContainer);