export interface ICategory {
    name: string;
    slug: string;
    updatedAt: string;
    createAt: string;
    _id: string;
}
export interface ICreateCategoryRequest {
    name: string;
}
export interface ICategoryMetadata {
    count: number;
    data: ICategory[];
    limit: number;
    page: number;
}
export interface ICategoriesResponse {
    message: string;
    res: {
        categories: ICategoryMetadata;
    };
}
export interface ICategoryState {
    list: ICategoryMetadata;
}
