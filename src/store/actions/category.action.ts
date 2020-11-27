import {
    ICategory,
    ICategoryMetadata,
    ICreateCategoryRequest,
    IUpdateCategoryRequest,
} from 'shared/models/category.model';
import { BaseAction } from 'shared/models/store.model';

export enum ECategoryActionTypes {
    GET_CATEGORIES_REQUEST = '[Categories] Fetch list request',
    GET_CATEGORIES_SUCCESS = '[Categories] Fetch Success',
    GET_CATEGORIES_FAILED = '[Categories] Fetch Failed',
    CREATE_CATEGORY_REQUEST = '[Categories] Create request',
    CREATE_CATEGORY_SUCCESS = '[Categories] Create success',
    CREATE_CATEGORY_FAILED = '[Categories] Create failed',
    DELETE_CATEGORY_REQUEST = '[Categories] DELETE request',
    DELETE_CATEGORY_SUCCESS = '[Categories] DELETE success',
    DELETE_CATEGORY_FAILED = '[Categories] DELETE failed',
    UPDATE_CATEGORY_REQUEST = '[Categories] UPDATE request',
    UPDATE_CATEGORY_SUCCESS = '[Categories] UPDATE success',
    UPDATE_CATEGORY_FAILED = '[Categories] UPDATE failed',
}

export class FetchCategoriesAction extends BaseAction {
    readonly type = ECategoryActionTypes.GET_CATEGORIES_REQUEST;
}
export class GetCategoriesSuccessAction extends BaseAction<ICategoryMetadata> {
    readonly type = ECategoryActionTypes.GET_CATEGORIES_SUCCESS;
}
// Create
export class CreateCategoryRequestAction extends BaseAction<ICreateCategoryRequest> {
    readonly type = ECategoryActionTypes.CREATE_CATEGORY_REQUEST;
}
export class CreateCategorySuccessAction extends BaseAction<ICategory> {
    readonly type = ECategoryActionTypes.CREATE_CATEGORY_SUCCESS;
}

// Delete
export class DeleteCategoryRequestAction extends BaseAction<string> {
    readonly type = ECategoryActionTypes.DELETE_CATEGORY_REQUEST;
}
export class DeleteCategorySuccessAction extends BaseAction<string> {
    readonly type = ECategoryActionTypes.DELETE_CATEGORY_SUCCESS;
}
export class DeleteCategoryFailedAction extends BaseAction<ICreateCategoryRequest> {
    readonly type = ECategoryActionTypes.DELETE_CATEGORY_FAILED;
}

// Update
export class UpdateCategoryRequestAction extends BaseAction<IUpdateCategoryRequest> {
    readonly type = ECategoryActionTypes.UPDATE_CATEGORY_REQUEST;
}
export class UpdateCategorySuccessAction extends BaseAction<ICategory> {
    readonly type = ECategoryActionTypes.UPDATE_CATEGORY_SUCCESS;
}

export type CategoryActionTypes =
    | FetchCategoriesAction
    | GetCategoriesSuccessAction
    | CreateCategoryRequestAction
    | CreateCategorySuccessAction
    | DeleteCategoryRequestAction
    | DeleteCategorySuccessAction
    | DeleteCategoryFailedAction
    | UpdateCategoryRequestAction
    | UpdateCategorySuccessAction;
