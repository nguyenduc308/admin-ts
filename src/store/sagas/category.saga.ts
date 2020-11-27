import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createCategoryApi,
    deleteCategoryApi,
    getCategoriesApi,
    updateCategoryApi,
} from 'shared/apis/category-api';
import { ICategoriesResponse, ICreateOrUpdateResponse } from 'shared/models/category.model';
import {
    CreateCategoryRequestAction,
    CreateCategorySuccessAction,
    DeleteCategoryRequestAction,
    DeleteCategorySuccessAction,
    ECategoryActionTypes,
    FetchCategoriesAction,
    GetCategoriesSuccessAction,
    UpdateCategoryRequestAction,
    UpdateCategorySuccessAction,
} from 'store/actions/category.action';

function* getCategoriesFlow(action: FetchCategoriesAction) {
    try {
        const {
            res: { categories },
        }: ICategoriesResponse = yield call(getCategoriesApi);

        yield put(new GetCategoriesSuccessAction(categories));
    } catch (error) {}
}
function* createCategoryFlow(action: CreateCategoryRequestAction) {
    try {
        const resp = yield call(createCategoryApi, action.payload);
        yield put(new CreateCategorySuccessAction(resp.res));
        action.onSuccess(resp);
    } catch (error) {
        action.onError(error);
    }
}
function* deleteCategoryFlow(action: DeleteCategoryRequestAction) {
    try {
        yield call(deleteCategoryApi, action.payload);
        yield put(new DeleteCategorySuccessAction(action.payload));
    } catch (error) {
        action.onError(error);
    }
}
function* updateCategoryFlow(action: UpdateCategoryRequestAction) {
    try {
        const resp: ICreateOrUpdateResponse = yield call(updateCategoryApi, action.payload);
        yield put(new UpdateCategorySuccessAction(resp.res));
        action.onSuccess(resp);
    } catch (error) {
        action.onError(error);
    }
}

export function* categoriesWatcher() {
    yield takeLatest(ECategoryActionTypes.GET_CATEGORIES_REQUEST, getCategoriesFlow);
    yield takeLatest(ECategoryActionTypes.CREATE_CATEGORY_REQUEST, createCategoryFlow);
    yield takeLatest(ECategoryActionTypes.DELETE_CATEGORY_REQUEST, deleteCategoryFlow);
    yield takeLatest(ECategoryActionTypes.UPDATE_CATEGORY_REQUEST, updateCategoryFlow);
}
