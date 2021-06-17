import React,{ Component } from 'react';
import HeadMenu from '../components/HeadMenu';
import {connect} from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as AuthActions from '../redux/actions/authActions';
import {AppState} from '../redux/reducers/appReducer';

interface HMCProps {
    showLoginDlg : boolean,
    showSignupDlg : boolean,
    loggedOn : (string | null),
    logOff : () => void,
    cancelAuth : () => void,
    initiateAuth : (dlgObj : object) => void
}

class HeadMenuContainer extends Component<HMCProps> {

    constructor(props : HMCProps) {
        super(props);

        this.signoutClicked = this.signoutClicked.bind(this);
        this.cancelAuth = this.cancelAuth.bind(this);
        this.initiateAuth = this.initiateAuth.bind(this);

    }

    signoutClicked()
    {
        this.props.logOff();
    }

    cancelAuth() {
        this.props.cancelAuth();
    }

    initiateAuth(dlgObj : object) {
        this.props.initiateAuth(dlgObj);
    }

    render() {

        const {showLoginDlg,showSignupDlg,loggedOn} = this.props;

        return <HeadMenu loggedOn={loggedOn} signoutClicked={this.signoutClicked} showLoginDlg={showLoginDlg}
            showSignupDlg={showSignupDlg} cancelAuth={this.cancelAuth} initiateAuth={this.initiateAuth} />
    }


}

const mapStateToProps = ({app} : {app : AppState}) => {
    return {
        loggedOn : app.loggedOn,
        showLoginDlg : app.login.showLoginDlg,
        showSignupDlg : app.signup.showSignupDlg
    }
}

const mapDispatchToProps = (dispatch : ThunkDispatch<AppState,void,AuthActions.AuthAction>) => ({
    logOff : () => dispatch((AuthActions.logOff())),
    cancelAuth : () => dispatch(AuthActions.cancelAuth()),
    initiateAuth : (dlgObj : object) => dispatch(AuthActions.initiateAuth(dlgObj))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadMenuContainer);