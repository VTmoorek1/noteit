import React, { Component } from 'react';
import SignUpDialog from '../components/SignUpDialog';
import {connect} from 'react-redux';
import {registerUser, AuthAction} from '../redux/actions/authActions';
import { AppState } from '../redux/reducers/appReducer';
import { ThunkDispatch } from 'redux-thunk';


interface SDCProps {
    cancelHandler : (e? :  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    error : (string | null),
    registerUser : (email : string, name : string, password : string) => void
}

/**
 * Dialog class handles sign up
 */
class SignupDialogContainer extends Component<SDCProps> {

    constructor(props : SDCProps) {
        super(props);

        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(email : string,name : string, password : string)
    {
        this.props.registerUser(email, name, password);
    }

    render() { 

        const {cancelHandler,error} = this.props; 

        return <div id="signUpDlgContainer">
            <SignUpDialog cancelHandler={cancelHandler} errorStr={error} 
               loginSuccessAction={this.registerUser} />
        </div>;
    }
}

const mapStateToProps = ({app} : {app : AppState}) => ({
    error : app.signup.error
});


const mapDispatchToProps = (dispatch : ThunkDispatch<AppState,void,AuthAction>) => (
    {
        registerUser : (email : string, name : string, password : string) => 
            dispatch(registerUser(email,name,password))
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupDialogContainer);