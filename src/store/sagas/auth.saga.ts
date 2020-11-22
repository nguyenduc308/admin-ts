import { loginApi, verifyTokenApi } from 'shared/apis/auth-api';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
    EAuthActionTypes,
    LoginFailAction,
    LoginRequestAction,
    LoginSuccessAction,
    VerifyTokenAction,
} from 'store/actions/auth.action';
import jwt_decode from 'jwt-decode';
import { TOKEN_KEY } from 'constants/global';

function* loginFlow(action: LoginRequestAction) {
    try {
        const { access_token } = yield call(loginApi, action.payload);
        localStorage.setItem(TOKEN_KEY, access_token);
        const user = jwt_decode(access_token);
        yield put({ ...new LoginSuccessAction({ access_token, user }) });
    } catch (error) {
        yield put({ ...new LoginFailAction() });
    }
}

function* verifyToken(action: VerifyTokenAction) {
    try {
        const { access_token } = yield call(verifyTokenApi, action.payload);
        const user = jwt_decode(access_token);
        yield delay(800);
        yield put({ ...new LoginSuccessAction({ access_token, user }) });
    } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        yield put({ ...new LoginFailAction() });
    }
}

export function* authWatcher() {
    yield takeLatest(EAuthActionTypes.LOGIN, loginFlow);
    yield takeLatest(EAuthActionTypes.VERIFY_TOKEN, verifyToken);
}
