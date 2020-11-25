import { Action } from 'redux';
import { IAuthState } from './auth.model';
import { ICategoryState } from './category.model';

export interface IAppState {
    auth: IAuthState;
    category: ICategoryState;
}

export class BaseAction<T = any> implements Action {
    readonly type: string;
    constructor(public payload?: T) {}
}
