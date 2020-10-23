export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ILoginResponse {
  jwt: string;
  user: any;
}
