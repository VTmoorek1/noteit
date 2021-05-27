import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogInForm from '../components/LogInDialog';
import * as authActions from '../redux/actions/authActions';
import {connect} from 'react-redux';
import {dialogCreator} from '../components/DialogCreator';

// Create Login Dialog
const LogInDialog = dialogCreator(false,LogInForm);

/**
 * Dialog class handles login
 */
 class LoginDialogContainer extends Component {

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }


    login(email, password) {
        this.props.dispatch(authActions.logOn(email,password));
    }

    render() {

        const {cancelHandler,error} = this.props;

        return <div id="logInDlgContainer">
            <LogInDialog loginSuccessAction={this.login} errorStr={error} 
                cancelHandler ={cancelHandler} />
        </div>;
    }
}

LoginDialogContainer.propTypes = {
    okHandler: PropTypes.func,
    cancelHandler: PropTypes.func
};

export default connect(
    store => ({
        loggedOn : store.app.loggedOn,
        error : store.app.login.error
    }))(LoginDialogContainer);


