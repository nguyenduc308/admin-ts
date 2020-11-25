import { call, put, takeLatest } from 'redux-saga/effects';
import { createCategoryApi, getCategoriesApi } from 'shared/apis/category-api';
import { ICategoriesResponse } from 'shared/models/category.model';
import {
    CreateCategoryRequestAction,
    ECategoryActionTypes,
    FetchCategoriesAction,
    GetCategoriesSuccessAction,
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
        const xhr = yield call(createCategoryApi, action.payload);
        console.log(xhr);
    } catch (error) {}
}

export function* categoriesWatcher() {
    yield takeLatest(ECategoryActionTypes.GET_CATEGORIES_REQUEST, getCategoriesFlow);
    yield takeLatest(ECategoryActionTypes.CREATE_CATEGORY_REQUEST, createCategoryFlow);
}
