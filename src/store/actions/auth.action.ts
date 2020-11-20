import { ReduxCoreAction } from 'models/store.model';
import { ILoginRequest, ILoginResponse } from 'models/auth.model';
export enum EAuthActionTypes {
    VERIFY_TOKEN = '[Auth] Verify Token Request',
    LOGIN = '[Auth] Login Request',
    AUTH_SUCCESS = '[Auth] Auth Success',
    AUTH_FAILED = '[Auth] Auth Failed',
    NOT_AUTH = '[Auth] Not Auth',
    LOGOUT = '[Auth] Logout',
    // export const AUTO_LOGIN = 'AUTO_LOGIN';
    // export const AUTO_LOGOUT = 'AUTO_LOGOUT';

    // export const REGISTER = 'REGISTER';
    // export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
    // export const REGISTER_FAILED = 'REGISTER_SUCCESS';
}
export class VerifyTokenAction extends ReduxCoreAction<string> {
    type = EAuthActionTypes.VERIFY_TOKEN;
}
export class LoginRequestAction extends ReduxCoreAction<ILoginRequest> {
    type = EAuthActionTypes.LOGIN;
}

export class LoginSuccessAction extends ReduxCoreAction<ILoginResponse & { user: any }> {
    type = EAuthActionTypes.AUTH_SUCCESS;
}

export class LoginFailAction extends ReduxCoreAction<any> {
    type = EAuthActionTypes.AUTH_FAILED;
}
export class NotAuthAction extends ReduxCoreAction<any> {
    type = EAuthActionTypes.NOT_AUTH;
}

export class LogoutAction extends ReduxCoreAction<any> {
    type = EAuthActionTypes.LOGOUT;
}

export type AuthActionTypes =
    | LoginRequestAction
    | VerifyTokenAction
    | LoginSuccessAction
    | LoginFailAction
    | NotAuthAction;
