import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogInDialog from '../components/LogInDialog';
import * as authActions from '../redux/actions/authActions';
import {connect} from 'react-redux';

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

        const {okHandler,cancelHandler,error} = this.props;

        return <div id="logInDlgContainer">
            <LogInDialog login={this.login} errorStr={error} okHandler={okHandler} 
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


