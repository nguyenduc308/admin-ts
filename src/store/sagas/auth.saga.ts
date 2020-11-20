import { loginApi, verifyTokenApi } from 'apis/auth-api';
import { ReduxCoreAction } from 'models/store.model';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { EAuthActionTypes, LoginFailAction, LoginSuccessAction } from 'store/actions/auth.action';
import jwt_decode from 'jwt-decode';
import { TOKEN_KEY } from 'constants/globalConstants';

function* loginFlow(action: ReduxCoreAction) {
    try {
        const { access_token } = yield call(loginApi, action.payload);
        localStorage.setItem(TOKEN_KEY, access_token);
        const user = jwt_decode(access_token);
        yield put({ ...new LoginSuccessAction({ access_token, user }) });
    } catch (error) {
        yield put({ ...new LoginFailAction('Đăng nhập thất bại') });
    }
}

function* verifyToken(action: ReduxCoreAction) {
    try {
        const { access_token } = yield call(verifyTokenApi, action.payload);
        const user = jwt_decode(access_token);
        yield delay(800);
        yield put({ ...new LoginSuccessAction({ access_token, user }) });
    } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        yield put({ ...new LoginFailAction('') });
    }
}

export function* authWatcher() {
    yield takeLatest(EAuthActionTypes.LOGIN, loginFlow);
    yield takeLatest(EAuthActionTypes.VERIFY_TOKEN, verifyToken);
}
