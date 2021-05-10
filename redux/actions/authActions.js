export function logOff() {

    return async function (dispatch) {

        dispatch({
            type: 'LOGOUT',
            loading: true
        });

        try {

            // First send authentication logout to server
            await fetch(window.location.href + 'auth/logout', {
                method: 'DELETE'
            });

        } catch (err) {
            console.log('Error: ' + err);
            return dispatch({
                type: 'LOGOUT_FAILURE',
                loading: true,
                error: err
            });
        }

        return dispatch({
            type: 'LOGOUT_SUCCESS',
            loading: false,
            loggedOn: null,
            showLoginDlg : false,
            showLoginDlg : false
        });
    };
};

export function logOn(email, password) {

    return async function (dispatch) {

        let dispatchObj = null;

        dispatch({
            type: 'LOGON',
            loading: true
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
                    type: 'LOGON_REJECTION',
                    loading: false,
                    loginError: logonResult.error,
                    showLoginDlg : true
                };
            }
            else {
                dispatchObj = {
                    type: 'LOGON_SUCCESS',
                    loading: false,
                    loggedOn: logonResult.userName,
                    showLoginDlg : false
                };
            }

        } catch (err) {
            console.log('Error: ' + err);
            dispatchObj = {
                type: 'LOGON_FAILURE',
                loading: true,
                error: err,
                showLoginDlg : false
            };
        }

        return dispatch(dispatchObj);
    };
};

export function registerUser(email, name, password) {

    return async function (dispatch) {

        let dispatchObj = null;

        dispatch({
            type: 'SIGNUP',
            loading: true
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
                    type: 'SIGNUP_REJECTION',
                    loading: false,
                    signupError: signupRes.error,
                    showSignupDlg : true
                };
            }
            else{
                dispatchObj = {
                    type: 'SIGNUP_SUCCESS',
                    loading: false,
                    loggedOn: signupRes.userName,
                    showSignupDlg : false
                };
            }

        } catch (err) {
            console.log('Error: ' + err);
            dispatchObj = {
                type: 'SIGNUP_FAILURE',
                loading: true,
                error: err,
                showSignupDlg : false
            };
        }

        dispatch(dispatchObj);

    };
};

export function cancelAuth() {

    return function (dispatch) {

        dispatch({
            type: 'CANCEL_AUTH',
            showSignupDlg : false,
            showLoginDlg : false
        });

    };
};

export function initiateAuth(dlgObj) {

    return function (dispatch) {

        dispatch({
            type: 'INITIATE_AUTH',
            ...dlgObj
        });

    };
};