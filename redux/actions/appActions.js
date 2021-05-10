export function fetchInitialState() {

    return async function (dispatch) {

        dispatch({
            type: 'FETCH_LOGIN',
            loading: true
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
                type: 'FETCH_LOGIN_FAILURE',
                loading: true,
                error: err
            });
        }

        return dispatch({
            type: 'FETCH_LOGIN_SUCCESS',
            loading: false,
            loggedOn: loggedOn
        });
    };
};

export function fetchPages() {

    return async function (dispatch) {

        dispatch({
            type: 'FETCH_PAGEITEMS',
            loading: true
        });

        const items = [];
        try {

            // Use fetch to get pages for menu on component loaded 
            const response = await fetch(window.location.href + 'page/getpages', {
                method: 'GET'
            });

            const pages = await response.json();


            // Add pages returned from API request
            for (let p of pages) {
                items.unshift({ title: p.title, id: p._id });
            }

        } catch (err) {
            console.log('Error: ' + err);
            return dispatch({
                type: 'FETCH_PAGEITEMS_FAILURE',
                loading: true,
                error: err
            });
        }

        return dispatch({
            type: 'FETCH_PAGEITEMS_SUCCESS',
            loading: false,
            pageItems: items
        });

    };

}



export function addPage(pageName) {

    return async function (dispatch) {

        let pageAdded = false;

        dispatch({
            type: 'ADD_PAGE'
        });

        try {

            // Add page on server
            const response = await fetch(window.location.href + "page/addpage/" + pageName, {
                method: 'POST'
            });

            let resObj = await response.json();

            dispatch({
                type: 'ADD_PAGE_SUCCESS',
                page: { title: pageName, id: resObj.id }
            });

            pageAdded = true;

        } catch (err) {
            dispatch({
                type: 'ADD_PAGE_FAILURE',
                error: err
            });
        }

        return pageAdded;

    };
};

export function deletePage(pageName) {

    return async function (dispatch) {

        dispatch({
            type: 'DELETE_PAGE'
        });

        try {

            // Remove from the server
            const response = await fetch(window.location.href + 'page/removepage/' + pageName, {
                method: 'DELETE'
            });

        } catch (err) {
            return dispatch({
                type: 'DELETE_PAGE_FAILURE',
                error: err
            });
        }

        return dispatch({
            type: 'DELETE_PAGE_SUCCESS',
            pageName: pageName
        });

    };
};

export function selectPage(pageName) {
    return function (dispatch) {
        dispatch({
            type: 'SELECT_PAGE',
            pageName: pageName
        });
    }
}