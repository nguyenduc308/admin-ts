import { http } from 'shared/libs';
export const getBlogsApi: any = () => http.get<any>('/blogs', {});
