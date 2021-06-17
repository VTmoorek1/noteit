import { Action, Dispatch } from "redux";


export enum ActionTypes {
    LOGOUT = 'LOGOUT',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE = 'LOGOUT_FAILURE',
    LOGON = 'LOGON',
    LOGON_REJECTION = 'LOGON_REJECTION',
    LOGON_SUCCESS = 'LOGON_SUCCESS',
    LOGON_FAILURE = 'LOGON_FAILURE',
    SIGNUP= 'SIGNUP',
    SIGNUP_REJECTION = 'SIGNUP_REJECTION',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNUP_FAILURE = 'SIGNUP_FAILURE',
    CANCEL_AUTH = 'CANCEL_AUTH',
    INITIATE_AUTH = 'INITIATE_AUTH',
    FETCH_LOGIN = 'FETCH_LOGIN',
    FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE',
    FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'
}

export type AuthActions = FetchISAction | LogOnAction | LogOffAction | RegisterUserAction |
    CancelAuthAction | InitAuthAction;

export interface AuthAction extends Action<ActionTypes> {
    loading: boolean,
    loggedOn: (null | string),
    error : (string | null)
}

interface FetchISAction extends AuthAction {
    type : ActionTypes.FETCH_LOGIN | ActionTypes.FETCH_LOGIN_SUCCESS | ActionTypes.FETCH_LOGIN_FAILURE,
    loggedOn : (string | null)
}

export function fetchInitialState() {

    return async function (dispatch : Dispatch<FetchISAction>) {

        dispatch({
            type: ActionTypes.FETCH_LOGIN,
            loading: true,
            loggedOn : null,
            error : null
        });

        let loggedOn = null;

        try {

            // Get if user is logged in
            const response = await fetch(window.location.href + 'auth/user', {
                method: 'GET'
            });

            const userObj = await response.json();
            loggedOn = userObj.name;

        } catch (err) {
            console.log('Error: ' + err);
            return dispatch({
                type: ActionTypes.FETCH_LOGIN_FAILURE,
                loading: true,
                error: err,
                loggedOn : null
            });
        }

        return dispatch({
            type: ActionTypes.FETCH_LOGIN_SUCCESS,
            loading: false,
            loggedOn: loggedOn,
            error : null
        });
    };
};

interface LogOffAction extends AuthAction {
    type : ActionTypes.LOGOUT | ActionTypes.LOGOUT_FAILURE | ActionTypes.LOGOUT_SUCCESS,
    showLoginDlg : boolean
}

export function logOff() {

    return async function (dispatch : Dispatch<LogOffAction>) {

        dispatch({
            type: ActionTypes.LOGOUT,
            loading: true,
            error : null,
            loggedOn : null,
            showLoginDlg : false
        });

        try {

            // First send authentication logout to server
            await fetch(window.location.href + 'auth/logout', {
                method: 'DELETE'
            });

        } catch (err) {
            console.log('Error: ' + err);
            return dispatch({
                type: ActionTypes.LOGOUT_FAILURE,
                loading: true,
                error: err,
                loggedOn : null,
                showLoginDlg : false
            });
        }

        return dispatch({
            type: ActionTypes.LOGOUT_SUCCESS,
            loading: false,
            loggedOn: null,
            showLoginDlg : false,
            error : null
        });
    };
};

interface LogOnAction extends AuthAction {
    type : ActionTypes.LOGON | ActionTypes.LOGON_REJECTION | ActionTypes.LOGON_SUCCESS | 
        ActionTypes.LOGON_FAILURE,
    loginError : (string | null),
    showLoginDlg : boolean
}

export function logOn(email : string, password : string) {

    return async function (dispatch : Dispatch<LogOnAction>) {

        let dispatchObj : LogOnAction;

        dispatch({
            type: ActionTypes.LOGON,
            loading: true,
            loginError : null,
            error : null,
            showLoginDlg : true,
            loggedOn : null
        });

        try {

            // Use fetch to try and logon
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

            const logonResult = await response.json();

            if (logonResult.error) {
                dispatchObj = {
                    type: ActionTypes.LOGON_REJECTION,
                    loading: false,
                    loginError: logonResult.error,
                    showLoginDlg : true,
                    error : null,
                    loggedOn : null
                };
            }
            else {
                dispatchObj = {
                    type: ActionTypes.LOGON_SUCCESS,
                    loading: false,
                    loggedOn: logonResult.userName,
                    showLoginDlg : false,
                    error : null,
                    loginError : null
                };
            }

        } catch (err) {
            console.log('Error: ' + err);
            dispatchObj = {
                type: ActionTypes.LOGON_FAILURE,
                loading: true,
                error: err,
                showLoginDlg : false,
                loginError : null,
                loggedOn : null
            };
        }

        return dispatch(dispatchObj);
    };
};

interface RegisterUserAction extends AuthAction {
    type : ActionTypes.SIGNUP | ActionTypes.SIGNUP_REJECTION | ActionTypes.SIGNUP_SUCCESS | 
        ActionTypes.SIGNUP_FAILURE,
    signupError : (string | null),
    showSignupDlg : boolean
}

export function registerUser(email : string, name : string, password : string) {

    return async function (dispatch : Dispatch<RegisterUserAction>) {

        let dispatchObj : RegisterUserAction;

        dispatch({
            type: ActionTypes.SIGNUP,
            loading: true,
            error : null,
            signupError : null,
            showSignupDlg : true,
            loggedOn : null
        });

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

            const signupRes = await response.json();

            if (signupRes.error) {
                dispatchObj = {
                    type: ActionTypes.SIGNUP_REJECTION,
                    loading: false,
                    signupError: signupRes.error,
                    showSignupDlg : true,
                    loggedOn : null,
                    error : null
                };
            }
            else{
                dispatchObj = {
                    type: ActionTypes.SIGNUP_SUCCESS,
                    loading: false,
                    loggedOn: signupRes.userName,
                    showSignupDlg : false,
                    error : null,
                    signupError : null
                };
            }

        } catch (err) {
            console.log('Error: ' + err);
            dispatchObj = {
                type: ActionTypes.SIGNUP_FAILURE,
                loading: true,
                error: err,
                showSignupDlg : false,
                signupError : null,
                loggedOn : null
            };
        }

        dispatch(dispatchObj);

    };
};

interface CancelAuthAction extends AuthAction {
    type : ActionTypes.CANCEL_AUTH,
    showSignupDlg : boolean,
    showLoginDlg : boolean
}

export function cancelAuth() {

    return function (dispatch : Dispatch<CancelAuthAction>) {

        dispatch({
            type: ActionTypes.CANCEL_AUTH,
            showSignupDlg : false,
            showLoginDlg : false,
            loggedOn : null,
            error : null,
            loading : false
        });

    };
};

interface InitAuthAction extends AuthAction {
    type : ActionTypes.INITIATE_AUTH,
    showSignupDlg : boolean,
    showLoginDlg : boolean
}

export function initiateAuth(dlgObj : object) {

    return function (dispatch : Dispatch<InitAuthAction>) {

        const loginDlg = (Object.getOwnPropertyNames(dlgObj).indexOf('showLoginDlg') > -1);

        dispatch({
            type: ActionTypes.INITIATE_AUTH,
            showLoginDlg : loginDlg,
            showSignupDlg : !loginDlg,
            error : null,
            loading : false,
            loggedOn : null,
        });

    };
};