export interface ILoginRequest {
    email: string;
    password: string;
}
export interface ILoginResponse {
    access_token: string;
}

export interface IRegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IAuthState {
    user: any | null;
    token: string | null;
    isAuth: boolean;
    isLoading?: boolean;
    error?: string | null;
}
