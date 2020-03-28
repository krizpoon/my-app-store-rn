import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import { rootEpic } from './actions';
import rootReducer from './reducers';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk, epicMiddleware));
    epicMiddleware.run(rootEpic);
    return store;
}
