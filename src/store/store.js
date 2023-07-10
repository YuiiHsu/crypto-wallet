import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './rootDuck';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger(); // initialize logger
    middlewares.push(loggerMiddleware);
}

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);

export default store;