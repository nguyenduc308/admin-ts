import { LOGIN } from 'constants/paths';
import { IAppState } from 'models/store.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
interface IPrivateRoute {
    component: React.ComponentType<any>;
}
const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component, ...rest }) => {
    const { isAuth, isLoading } = useSelector((state: IAppState) => state.auth);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isLoading) {
                    return <div>Verifing....</div>;
                }
                if (isAuth) {
                    return <Component {...props} />;
                }
                return <Redirect to={LOGIN} />;
            }}
        />
    );
};
export default PrivateRoute;
