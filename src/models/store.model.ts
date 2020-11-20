import { Action } from 'redux';
import { IAuthState } from './auth.model';

export class ReduxCoreAction<T = any> implements Action<string> {
    public readonly type: string;
    constructor(public payload: T) {}
}

export interface IAppState {
    auth: IAuthState;
}

export declare interface ReduxAction {
    type: string;
    payload: any;
}
