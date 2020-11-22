import { all } from 'redux-saga/effects';
import { authWatcher } from './auth.saga';
import { blogWatcher } from './blog.saga';

export function* rootSaga() {
    yield all([authWatcher(), blogWatcher()]);
}
