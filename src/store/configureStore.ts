import { applyMiddleware, compose, createStore, Store } from 'redux';
import { rootReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const transformPlainObjectMiddlware = (store: any) => (next: any) => (action: any) => {
    if (!!action && typeof action === 'object') {
        const { onSuccess, onError, ...plainObject } = action;
        return next({ ...plainObject });
    }
    throw new Error('Action must be plain object');
};

export default function configureStore(initialState = {}): Store<any> {
    const middlewares = [transformPlainObjectMiddlware, sagaMiddleware];
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

    const store = createStore<any, any, any, any>(
        rootReducer,
        initialState,
        composeEnhancers(...enhancers),
    );
    sagaMiddleware.run(rootSaga);

    return store;
}
