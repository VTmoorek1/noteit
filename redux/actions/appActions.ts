import { Action, Dispatch } from "redux";
import { PageItem } from "../../interfaces/pageinterface";

export enum ActionTypes {
    FETCH_PAGEITEMS = 'FETCH_PAGEITEMS',
    FETCH_PAGEITEMS_FAILURE = 'FETCH_PAGEITEMS_FAILURE',
    FETCH_PAGEITEMS_SUCCESS = 'FETCH_PAGEITEMS_SUCCESS',
    ADD_PAGE = 'ADD_PAGE',
    ADD_PAGE_SUCCESS = 'ADD_PAGE_SUCCESS',
    ADD_PAGE_FAILURE = 'ADD_PAGE_FAILURE',
    SELECT_PAGE = 'SELECT_PAGE',
    DELETE_PAGE = 'DELETE_PAGE',
    DELETE_PAGE_FAILURE = 'DELETE_PAGE_FAILURE',
    DELETE_PAGE_SUCCESS = 'DELETE_PAGE_SUCCESS'
}

export type AppActions = FetchPageAction | AddPageAction | DeleteSelectPageAction;

export interface AppAction extends Action<ActionTypes> {
    loading : boolean,
    error : (string | null)    
}


interface FetchPageAction extends AppAction {
    type : ActionTypes.FETCH_PAGEITEMS | ActionTypes.FETCH_PAGEITEMS_FAILURE | ActionTypes.FETCH_PAGEITEMS_SUCCESS,
    pageItems : PageItem[]
}

export function fetchPages() {

    return async function (dispatch : Dispatch<FetchPageAction>) {

        const items : PageItem[] = [];

        dispatch({
            type: ActionTypes.FETCH_PAGEITEMS,
            loading: true,
            error : null,
            pageItems : items
        });

        

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
                type: ActionTypes.FETCH_PAGEITEMS_FAILURE,
                loading: true,
                error: err,
                pageItems : []
            });
        }

        return dispatch({
            type: ActionTypes.FETCH_PAGEITEMS_SUCCESS,
            loading: false,
            pageItems: items,
            error : null
        });

    };

}


interface AddPageAction extends AppAction {
    type : ActionTypes.ADD_PAGE | ActionTypes.ADD_PAGE_SUCCESS | ActionTypes.ADD_PAGE_FAILURE,
    page : PageItem | null
}

export function addPage(pageName : string) {

    return async function (dispatch : Dispatch<AddPageAction>) {

        let pageAdded = false;

        dispatch({
            type: ActionTypes.ADD_PAGE,
            page : null,
            error : null,
            loading : true
        });

        try {

            // Add page on server
            const response = await fetch(window.location.href + "page/addpage/" + pageName, {
                method: 'POST'
            });

            let resObj = await response.json();

            dispatch({
                type: ActionTypes.ADD_PAGE_SUCCESS,
                page: { title: pageName, id: resObj.id },
                error : null,
                loading : false
            });

            pageAdded = true;

        } catch (err) {
            dispatch({
                type: ActionTypes.ADD_PAGE_FAILURE,
                error: err,
                loading : true,
                page : null
            });
        }

        return pageAdded;

    };
};

interface DeleteSelectPageAction extends AppAction {
    type : ActionTypes.DELETE_PAGE | ActionTypes.DELETE_PAGE_FAILURE | ActionTypes.DELETE_PAGE_SUCCESS | 
        ActionTypes.SELECT_PAGE,
    pageName : string | null
}

export function deletePage(pageName : string) {

    return async function (dispatch : Dispatch<DeleteSelectPageAction>) {

        dispatch({
            type: ActionTypes.DELETE_PAGE,
            pageName : null,
            error : null, 
            loading : true
        });

        try {

            // Remove from the server
            const response = await fetch(window.location.href + 'page/removepage/' + pageName, {
                method: 'DELETE'
            });

        } catch (err) {
            return dispatch({
                type: ActionTypes.DELETE_PAGE_FAILURE,
                error: err,
                loading : true,
                pageName : null
            });
        }

        return dispatch({
            type: ActionTypes.DELETE_PAGE_SUCCESS,
            pageName: pageName,
            loading : false,
            error : null
        });

    };
};

export function selectPage(pageName : string) {
    return function (dispatch : Dispatch<DeleteSelectPageAction>) {
        dispatch({
            type: ActionTypes.SELECT_PAGE,
            pageName: pageName,
            loading : false,
            error : null
        });
    }
}