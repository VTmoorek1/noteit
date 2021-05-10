import {applyMiddleware,createStore} from 'redux';
import {createLogger} from 'redux-logger';
import reducer from './reducers';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk,createLogger());

export default createStore(reducer,middleware);