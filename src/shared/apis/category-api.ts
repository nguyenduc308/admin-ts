import { http } from 'shared/libs';
import {
    ICategoriesResponse,
    ICreateCategoryRequest,
    ICreateOrUpdateResponse,
    IUpdateCategoryRequest,
} from 'shared/models/category.model';
export const getCategoriesApi = () => http.get<ICategoriesResponse>('/categories');
export const createCategoryApi = (category: ICreateCategoryRequest) =>
    http.post<ICreateOrUpdateResponse>('/categories', category);
export const deleteCategoryApi = (id: string) => http.delete('/categories/' + id);
export const updateCategoryApi = (req: IUpdateCategoryRequest) =>
    http.patch<ICreateOrUpdateResponse>(`/categories/${req.id}`, req.data);
