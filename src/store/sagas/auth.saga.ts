import { loginApi } from 'apis/authApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AUTO_LOGIN,
  AUTO_LOGOUT,
  LOGIN,
  AUTH_SUCCESS,
  AUTH_FAILED,
  VERIFY_TOKEN,
} from 'store/actionTypes/auth';

function* loginFlow(action: ActionRedux) {
  try {
    const { token, user } = yield call(loginApi, action.payload);
    put({
      type: AUTH_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    put({
      type: AUTH_FAILED,
      payload: error,
    });
  }
}
function* autoLoginFlow(action: ActionRedux) {
  try {
    const { token, user } = yield call(loginApi, action.payload);
    put({
      type: AUTH_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    put({
      type: AUTH_FAILED,
      payload: error,
    });
  }
}
function* verifyToken(action: ActionRedux) {
  try {
    const { token, user } = yield call(loginApi, action.payload);
    put({
      type: AUTH_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    put({
      type: AUTH_FAILED,
      payload: error,
    });
  }
}

export function* authWatcher() {
  yield takeLatest(LOGIN, loginFlow);
  yield takeLatest(AUTO_LOGIN, autoLoginFlow);
  yield takeLatest(VERIFY_TOKEN, verifyToken);
}
