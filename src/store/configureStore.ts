import { applyMiddleware, compose, createStore, Store } from 'redux';
import { rootReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { BaseAction } from 'shared/models/store.model';

const sagaMiddleware = createSagaMiddleware();

const tranformPlainObjectMiddlware = (store: any) => (next: any) => (action: any) => {
    if (!!action && typeof action === 'object') {
        return next({ ...action });
    }
    throw new Error('Action must be plain object');
};

export default function configureStore(initialState = {}): Store<any> {
    const middlewares = [tranformPlainObjectMiddlware, sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                  shouldHotReload: false,
                  name: 'dl',
              })
            : compose;
    /* eslint-enable */

    const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers));
    sagaMiddleware.run(rootSaga);

    return store;
}
