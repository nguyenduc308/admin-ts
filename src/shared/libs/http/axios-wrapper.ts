import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import config from 'env';
class HttpService {
    private service: AxiosInstance;
    constructor() {
        this.service = axios.create({
            baseURL: config.baseURL,
        });
        this.interceptor();
    }
    public registerBearerToken(token: string) {
        this.service.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    private interceptor() {
        this.service.interceptors.response.use(this.handleSuccess, this.handleError);
    }
    private handleSuccess(response: AxiosResponse) {
        return response.data;
    }
    private handleError(error: AxiosError) {
        return Promise.reject(error);
    }
    get<T = any>(endpoint: string, queryParams?: Object): Promise<T> {
        return this.service.get(endpoint, {
            params: queryParams,
        });
    }
    post<T = any>(endpoint: string, data: any): Promise<T> {
        return this.service.post(endpoint, data);
    }
    put<T = any>(endpoint: string, data: any): Promise<T> {
        return this.service.put(endpoint, data);
    }
    patch<T = any>(endpoint: string, data: any): Promise<T> {
        return this.service.patch(endpoint, data);
    }
    delete<T = any>(endpoint: string): Promise<T> {
        return this.service.delete(endpoint);
    }
}

export default new HttpService();
