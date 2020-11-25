import { http } from 'shared/libs';
import { ICategoriesResponse, ICreateCategoryRequest } from 'shared/models/category.model';
export const getCategoriesApi = () => http.get<ICategoriesResponse>('/categories');
export const createCategoryApi = (category: ICreateCategoryRequest) =>
    http.post('/categories', category);
