import React, { Component } from 'react';
import LogInDialog from '../components/LogInDialog';
import * as AuthActions from '../redux/actions/authActions';
import {connect} from 'react-redux';
import { AppState } from '../redux/reducers/appReducer';
import { ThunkDispatch } from 'redux-thunk';


interface LDCProps {
    cancelHandler : (e? :  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    error : (string | null),
    logOn : (email : string, password : string) => void
}

/**
 * Dialog class handles login
 */
 class LoginDialogContainer extends Component<LDCProps> {

    constructor(props : LDCProps) {
        super(props);

        this.login = this.login.bind(this);
    }


    login(email : string, password : string) {
        this.props.logOn(email,password);
    }

    render() {

        const {cancelHandler,error} = this.props;

        return <div id="logInDlgContainer">
            <LogInDialog loginSuccessAction={this.login} errorStr={error} 
                cancelHandler ={cancelHandler} />
        </div>;
    }
}

const mapStateToProps = ({app} : {app : AppState}) => ({
    error : app.login.error
});


const mapDispatchToProps = (dispatch : ThunkDispatch<AppState,void,AuthActions.AuthAction>) => (
    {
        logOn : (email : string, password : string) => dispatch(AuthActions.logOn(email,password))
    }
)

export default connect(
    mapStateToProps,
    mapDispatchToProps    
)(LoginDialogContainer);


