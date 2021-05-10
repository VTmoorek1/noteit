export default function reducer(state = {
    pageItems: [],
    loading: true,
    loggedOn: null,
    pageName: null,
    error: null,
    login : {showLoginDlg: false , error : null},
    signup : {showSignupDlg: false ,error : null}
}, action) {

    // reset errors
    state = {...state, error : null,login : {...state.login, error : null}, 
        signup : {...state.signup, error : null}};

    switch (action.type) {

        case 'FETCH_PAGEITEMS': case 'FETCH_LOGIN': case 'LOGON': case 'LOGOUT': case 'SIGNUP':
            state = { ...state, loading: true };
            break;
        case 'FETCH_LOGIN_SUCCESS':
            state = { ...state, loggedOn: action.loggedOn, loading: action.loading };
            break;
        case 'FETCH_PAGEITEMS_SUCCESS':
            state = {
                ...state, loading: action.loading,
                pageItems: action.pageItems
            };
            break;
        case 'ADD_PAGE_SUCCESS':
            state = {
                ...state, pageItems: [{ title: action.page.title, id: action.page.id },
                ...state.pageItems]
            };
            break;
        case 'ADD_PAGE_FAILURE': case 'DELETE_PAGE_FAILURE': case 'FETCH_PAGEITEMS_ERROR': case 'FETCH_LOGIN_FAILURE':
        case 'LOGOUT_FAILURE': case 'LOGON_FAILURE': case 'SIGNUP_FAILURE':
            state = {
                ...state, error: action.error, loading: action.loading, login : {...state.login, showLoginDlg: action.showLoginDlg},
                signup : {...state.signup, showSignupDlg: action.showSignupDlg}
            };
            break;
        case 'DELETE_PAGE_SUCCESS':

            const pgName = action.pageName;
            const pageItems = state.pageItems;

            // Get index of page
            for (var i = 0; i < pageItems.length; i++) {
                if (pgName === pageItems[i].title) {
                    break;
                }
            }

            // Remove from menu
            const pageArr = [...pageItems];
            pageArr.splice(i, 1);
            state = { ...state, pageItems: pageArr, pageName: null };
            break;
        case 'SELECT_PAGE':
            state = { ...state, pageName: action.pageName };
            break;
        case 'LOGOUT_SUCCESS': case 'LOGON_SUCCESS': case 'SIGNUP_SUCCESS':
            state = {
                ...state, loggedOn: action.loggedOn, loading: action.loading, login : {...state.login, showLoginDlg: action.showLoginDlg},
                signup : {...state.signup, showSignupDlg: action.showSignupDlg}
            };
            break;
        case 'LOGON_REJECTION': case 'SIGNUP_REJECTION':
            state = {
                ...state, loading: action.loading, error: action.error, login : {showLoginDlg: action.showLoginDlg, error : action.loginError},
                signup : {showSignupDlg: action.showSignupDlg, error : action.signupError}
            };
            break;
        case 'CANCEL_AUTH': case 'INITIATE_AUTH':
            state = {
                ...state, login : {...state.login, showLoginDlg: action.showLoginDlg},
                signup : {...state.signup, showSignupDlg: action.showSignupDlg}
            };
            break;
    }

    return state;
};