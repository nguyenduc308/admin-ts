import { Action } from 'redux';
import { IAuthState } from './auth.model';
import { IBlogState } from './blog.model';
import { ICategoryState } from './category.model';

export interface IAppState {
    auth: IAuthState;
    category: ICategoryState;
    blog: IBlogState;
}

export class BaseAction<T = any> implements Action {
    readonly type: string;
    constructor(public payload?: T, public onSuccess?: Function, public onError?: Function) {}
}
