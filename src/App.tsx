import { TOKEN_KEY } from 'constants/globalConstants';
import { IAppState } from 'models/store.model';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from 'routes';
import { LogoutAction, NotAuthAction, VerifyTokenAction } from 'store/actions/auth.action';

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state: IAppState) => state.auth);
    let token = localStorage.getItem(TOKEN_KEY);
    let timmerId: any;
    React.useEffect(() => {
        if (isAuth) {
            const timeToExpired = user.exp * 1000;
            timmerId = setTimeout(() => {
                localStorage.removeItem(TOKEN_KEY);
                dispatch({ ...new LogoutAction(null) });
            }, timeToExpired);
            return;
        }
        if (!!token && !isAuth) {
            dispatch({ ...new VerifyTokenAction(token) });
        }
        if (!token) {
            dispatch({ ...new NotAuthAction(null) });
        }
    }, [token, dispatch, isAuth]);
    return (
        <React.Fragment>
            <AppRoutes />
        </React.Fragment>
    );
};

export default App;
