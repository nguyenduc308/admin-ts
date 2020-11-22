import { call, takeLatest } from 'redux-saga/effects';
import { getBlogsApi } from 'shared/apis/blog-api';

function* getBlogsFlow(action: any) {
    try {
        const { access_token } = yield call(getBlogsApi, action.payload);
    } catch (error) {}
}

export function* blogWatcher() {
    yield takeLatest('', getBlogsFlow);
}
