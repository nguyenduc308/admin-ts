import { ICategory } from './category.model';

export interface IBlog {
    _id: string;
    title: string;
    imageUrl: string;
    slug: string;
    excerpt: string;
    createdAt: string;
    updatedAt: string;
    views: number;
    categories: ICategory[];
    content: string;
}
export interface ICreateBlogRequest {
    title: string;
    content: string;
    categories: any[];
    imageUrl: string;
    description?: string;
}
export interface IBlogMetadata {
    page: number;
    limit: number;
    count: number;
    data: IBlog[];
}
export interface IBlogResponse {
    message: string;
    res: IBlogMetadata;
}
export interface IOneBlogResponse {
    message: string;
    res: IBlog;
}

export interface IBlogState {
    list: IBlogMetadata;
    current: IBlog;
}
