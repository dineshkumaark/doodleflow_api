import { createStore } from 'redux';
import rootReducers from './reducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;