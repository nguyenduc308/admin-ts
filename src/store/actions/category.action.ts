import { ICategoryMetadata, ICreateCategoryRequest } from 'shared/models/category.model';
import { BaseAction } from 'shared/models/store.model';

export enum ECategoryActionTypes {
    GET_CATEGORIES_REQUEST = '[Categories] Fetch list request',
    GET_CATEGORIES_SUCCESS = '[Categories] Fetch Success',
    GET_CATEGORIES_FAILED = '[Categories] Fetch Failed',
    CREATE_CATEGORY_REQUEST = '[Categories] Create request',
    CREATE_CATEGORY_SUCCESS = '[Categories] Create success',
    CREATE_CATEGORY_FAILED = '[Categories] Create failed',
}

export class FetchCategoriesAction extends BaseAction {
    readonly type = ECategoryActionTypes.GET_CATEGORIES_REQUEST;
}
export class GetCategoriesSuccessAction extends BaseAction<ICategoryMetadata> {
    readonly type = ECategoryActionTypes.GET_CATEGORIES_SUCCESS;
}
export class CreateCategoryRequestAction extends BaseAction<ICreateCategoryRequest> {
    readonly type = ECategoryActionTypes.CREATE_CATEGORY_REQUEST;
}
export class CreateCategorySuccessAction extends BaseAction<ICreateCategoryRequest> {
    readonly type = ECategoryActionTypes.CREATE_CATEGORY_REQUEST;
}
export class CreateCategoryFailedAction extends BaseAction<ICreateCategoryRequest> {
    readonly type = ECategoryActionTypes.CREATE_CATEGORY_REQUEST;
}

export type CategoryActionTypes =
    | FetchCategoriesAction
    | GetCategoriesSuccessAction
    | CreateCategoryRequestAction;
