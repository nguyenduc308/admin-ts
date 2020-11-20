import { ILoginRequest, ILoginResponse } from 'models/auth.model';
import { http } from 'services';
export const loginApi = (data: ILoginRequest): Promise<ILoginResponse> =>
    http.post<ILoginResponse>('/auth/login', data);

export const verifyTokenApi = (token: string): Promise<ILoginResponse> =>
    http.post<ILoginResponse>('/auth/verify-token', { token });
