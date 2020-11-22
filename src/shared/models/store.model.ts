import { IAuthState } from './auth.model';

export interface IAppState {
    auth: IAuthState;
}

export declare interface ReduxAction {
    type: string;
    payload: any;
}
