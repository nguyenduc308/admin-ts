import {
    IBlog,
    IBlogMetadata,
    ICreateBlogRequest,
    IUpdateBlogRequest,
} from 'shared/models/blog.model';
import { BaseAction } from 'shared/models/store.model';

export enum EBlogActionTypes {
    GET_LIST_BLOGS_REQUEST = '[Blog] GET list',
    GET_LIST_BLOGS_SUCCESS = '[Blog] GET list success',
    CREATE_BLOG_REQUEST = '[Blog] POST request',
    DELETE_BLOG_REQUEST = '[BLOG] DELETE request',
    DELETE_BLOG_SUCCESS = '[BLOG] DELETE success',
    DELETE_BLOG_FAILED = '[BLOG] DELETE failed',
    GET_BLOG_BY_SLUG_REQUEST = '[Blog] GET one request',
    GET_BLOG_BY_SLUG_SUCCESS = '[Blog] GET one success',
    UPDATE_BLOG_REQUEST = '[Blog] UPDATE request',
    UPDATE_BLOG_SUCCESS = '[Blog] UPDATE success',
}
// Get
export class GetBlogsRequestAction extends BaseAction {
    readonly type = EBlogActionTypes.GET_LIST_BLOGS_REQUEST;
}
export class GetBlogsSuccessAction extends BaseAction<IBlogMetadata> {
    readonly type = EBlogActionTypes.GET_LIST_BLOGS_SUCCESS;
}
// Get One Blog
export class GetBlogBySlugRequestAction extends BaseAction<string> {
    readonly type = EBlogActionTypes.GET_BLOG_BY_SLUG_REQUEST;
}
export class GetBlogBySlugSuccessAction extends BaseAction<IBlog> {
    readonly type = EBlogActionTypes.GET_BLOG_BY_SLUG_SUCCESS;
}
// Create
export class CreateBlogRequestAction extends BaseAction<ICreateBlogRequest> {
    readonly type = EBlogActionTypes.CREATE_BLOG_REQUEST;
}
// Delete
export class DeleteBlogRequestAction extends BaseAction<string> {
    readonly type = EBlogActionTypes.DELETE_BLOG_REQUEST;
}
export class DeleteBlogSuccessAction extends BaseAction<string> {
    readonly type = EBlogActionTypes.DELETE_BLOG_SUCCESS;
}
export class UpdateBlogRequestAction extends BaseAction<IUpdateBlogRequest> {
    readonly type = EBlogActionTypes.UPDATE_BLOG_REQUEST;
}

export type BlogActions =
    | GetBlogsRequestAction
    | GetBlogsSuccessAction
    | CreateBlogRequestAction
    | DeleteBlogSuccessAction
    | GetBlogBySlugRequestAction
    | GetBlogBySlugSuccessAction
    | UpdateBlogRequestAction;
