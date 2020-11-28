import { http } from 'shared/libs';
import { IBlogResponse, ICreateBlogRequest } from 'shared/models/blog.model';

export const getBlogsApi = () => http.get<IBlogResponse>('/blogs', {});
export const createBlogApi = (data: ICreateBlogRequest) => http.post('/blogs', data);
export const deleteBlogApi = (id: string) => http.delete('/blogs/' + id);
export const getBlogBySlugApi = (slug: string) => http.get('/blogs/' + slug);
