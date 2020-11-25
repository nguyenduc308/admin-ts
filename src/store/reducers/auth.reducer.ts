import { IAuthState } from 'shared/models/auth.model';
import { AuthActionTypes, EAuthActionTypes } from 'store/actions/auth.action';

const initialState: IAuthState = {
    user: null,
    token: null,
    isAuth: false,
    isLoading: true,
    error: null,
};
const authReducer = (state: IAuthState = initialState, action: AuthActionTypes): IAuthState => {
    switch (action.type) {
        case EAuthActionTypes.NOT_AUTH:
            return {
                ...state,
                isLoading: false,
            };
        case EAuthActionTypes.LOGIN:
            return {
                ...state,
                isLoading: true,
            };
        case EAuthActionTypes.VERIFY_TOKEN:
            return {
                ...state,
                isLoading: true,
            };
        case EAuthActionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                isAuth: true,
                token: action.payload.access_token,
            };
        case EAuthActionTypes.AUTH_FAILED:
            return {
                ...state,
                isLoading: false,
                isAuth: false,
            };
        case EAuthActionTypes.LOGOUT:
            return {
                ...state,
                isAuth: false,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

export default authReducer;
