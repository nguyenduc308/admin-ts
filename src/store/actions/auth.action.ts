import { ILoginRequest, ILoginResponse } from 'shared/models/auth.model';
import { Action } from 'redux';
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
export class VerifyTokenAction implements Action<string> {
    type = EAuthActionTypes.VERIFY_TOKEN;
    constructor(public payload: string) {}
}
export class LoginRequestAction implements Action<string> {
    type = EAuthActionTypes.LOGIN;
    constructor(public payload: ILoginRequest) {}
}

export class LoginSuccessAction implements Action<string> {
    type = EAuthActionTypes.AUTH_SUCCESS;
    constructor(public payload: ILoginResponse & { user: any }) {}
}

export class LoginFailAction implements Action<string> {
    type = EAuthActionTypes.AUTH_FAILED;
}
export class NotAuthAction implements Action<string> {
    type = EAuthActionTypes.NOT_AUTH;
}

export class LogoutAction implements Action<string> {
    type = EAuthActionTypes.LOGOUT;
}

export type AuthActionTypes =
    | LoginRequestAction
    | VerifyTokenAction
    | LoginSuccessAction
    | LoginFailAction
    | NotAuthAction
    | LogoutAction;
