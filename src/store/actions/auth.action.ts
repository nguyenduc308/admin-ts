import { ILoginRequest, ILoginResponse } from 'shared/models/auth.model';
import { BaseAction } from 'shared/models/store.model';
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
export class VerifyTokenAction extends BaseAction<string> {
    readonly type = EAuthActionTypes.VERIFY_TOKEN;
}
export class LoginRequestAction extends BaseAction<ILoginRequest> {
    readonly type = EAuthActionTypes.LOGIN;
}

export class LoginSuccessAction extends BaseAction<ILoginResponse & { user: any }> {
    readonly type = EAuthActionTypes.AUTH_SUCCESS;
}

export class LoginFailAction extends BaseAction {
    readonly type = EAuthActionTypes.AUTH_FAILED;
}
export class NotAuthAction extends BaseAction {
    readonly type = EAuthActionTypes.NOT_AUTH;
}

export class LogoutAction extends BaseAction {
    readonly type = EAuthActionTypes.LOGOUT;
}

export type AuthActionTypes =
    | LoginRequestAction
    | VerifyTokenAction
    | LoginSuccessAction
    | LoginFailAction
    | NotAuthAction
    | LogoutAction;
