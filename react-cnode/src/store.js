import {
    createStore,
    applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk'
import reducer from './reducters';
export default createStore(reducer, {}, applyMiddleware(thunk));