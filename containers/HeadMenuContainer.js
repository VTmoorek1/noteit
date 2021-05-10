import React,{ Component } from 'react';
import HeadMenu from '../components/HeadMenu';
import {connect} from 'react-redux';
import * as authActions from '../redux/actions/authActions';

class HeadMenuContainer extends Component {

    constructor(props) {
        super(props);

        this.signoutClicked = this.signoutClicked.bind(this);
        this.cancelAuth = this.cancelAuth.bind(this);
        this.initiateAuth = this.initiateAuth.bind(this);

    }

    async signoutClicked()
    {
        this.props.dispatch(authActions.logOff());
    }

    cancelAuth() {
        this.props.dispatch(authActions.cancelAuth());
    }

    initiateAuth(dlgObj) {
        this.props.dispatch(authActions.initiateAuth(dlgObj));
    }

    render() {

        const {showLoginDlg,showSignupDlg} = this.props;

        return <HeadMenu loggedOn={this.props.loggedOn} signoutClicked={this.signoutClicked} showLoginDlg={showLoginDlg}
            showSignupDlg={showSignupDlg} cancelAuth={this.cancelAuth} initiateAuth={this.initiateAuth} />
    }


}

export default connect(store => ({
    loggedOn : store.app.loggedOn,
    showLoginDlg : store.app.login.showLoginDlg,
    showSignupDlg : store.app.signup.showSignupDlg
}))(HeadMenuContainer);