import { TOKEN_KEY } from 'constants/global';
import { IAppState } from 'shared/models/store.model';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from '../routes';
import { LogoutAction, NotAuthAction, VerifyTokenAction } from 'store/actions/auth.action';
import { http } from 'shared/libs';

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state: IAppState) => state.auth);
    let token = localStorage.getItem(TOKEN_KEY);
    let timerId = useRef<undefined | number>();
    React.useEffect(() => {
        if (isAuth && user) {
            http.registerBearerToken(token);
            const timeToExpired = user.exp * 1000 - Date.now() - 30000;
            timerId.current = setTimeout(() => {
                localStorage.removeItem(TOKEN_KEY);
                dispatch(new LogoutAction());
                console.log('%c Auto Logout!', 'color: red');
            }, timeToExpired);
            return;
        }
        if (!!token && !isAuth) {
            dispatch(new VerifyTokenAction(token));
        }
        if (!token) {
            dispatch(new NotAuthAction());
        }
        if (!isAuth && timerId) {
            clearTimeout(timerId.current);
        }
        return () => {
            if (timerId) {
                clearTimeout(timerId.current);
            }
        };
    }, [token, dispatch, isAuth, user]);
    return (
        <React.Fragment>
            <AppRoutes />
        </React.Fragment>
    );
};

export default App;
