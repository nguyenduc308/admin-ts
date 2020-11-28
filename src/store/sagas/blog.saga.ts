import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createBlogApi,
    deleteBlogApi,
    getBlogBySlugApi,
    getBlogsApi,
    updateBlogApi,
} from 'shared/apis/blog-api';
import { IBlogResponse, IOneBlogResponse } from 'shared/models/blog.model';
import {
    CreateBlogRequestAction,
    DeleteBlogRequestAction,
    DeleteBlogSuccessAction,
    EBlogActionTypes,
    GetBlogBySlugRequestAction,
    GetBlogBySlugSuccessAction,
    GetBlogsRequestAction,
    GetBlogsSuccessAction,
    UpdateBlogRequestAction,
} from 'store/actions/blog.action';
import { DeleteCategorySuccessAction } from 'store/actions/category.action';

function* getBlogsFlow(action: GetBlogsRequestAction) {
    try {
        const { res }: IBlogResponse = yield call(getBlogsApi);
        yield put(new GetBlogsSuccessAction(res));
    } catch (error) {
        console.log(error);
    }
}
function* createBlogFlow(action: CreateBlogRequestAction) {
    try {
        const { res }: IBlogResponse = yield call(createBlogApi, action.payload);
        action.onSuccess();
    } catch (error) {
        console.log(error);
    }
}
function* deleteBlogFlow(action: DeleteBlogRequestAction) {
    try {
        yield call(deleteBlogApi, action.payload);
        yield put(new DeleteBlogSuccessAction(action.payload));
        if (action.onSuccess) {
            action.onSuccess();
        }
    } catch (error) {
        if (action.onError) {
            action.onError();
        }
    }
}
function* getBlogBySlugFlow(action: GetBlogBySlugRequestAction) {
    try {
        const { res }: IOneBlogResponse = yield call(getBlogBySlugApi, action.payload);
        yield put(new GetBlogBySlugSuccessAction(res));
        if (action.onSuccess) {
            action.onSuccess();
        }
    } catch (error) {
        if (action.onError) {
            action.onError();
        }
    }
}
function* updateBlogBySlugFlow(action: UpdateBlogRequestAction) {
    try {
        yield call(updateBlogApi, action.payload);
        if (action.onSuccess) {
            action.onSuccess();
        }
    } catch (error) {
        if (action.onError) {
            action.onError();
        }
    }
}

export function* blogWatcher() {
    yield takeLatest(EBlogActionTypes.GET_LIST_BLOGS_REQUEST, getBlogsFlow);
    yield takeLatest(EBlogActionTypes.CREATE_BLOG_REQUEST, createBlogFlow);
    yield takeLatest(EBlogActionTypes.DELETE_BLOG_REQUEST, deleteBlogFlow);
    yield takeLatest(EBlogActionTypes.GET_BLOG_BY_SLUG_REQUEST, getBlogBySlugFlow);
    yield takeLatest(EBlogActionTypes.UPDATE_BLOG_REQUEST, updateBlogBySlugFlow);
}
