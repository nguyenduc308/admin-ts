import LayoutWithSidebarComponent from 'shared/components/layout/layout-with-sidebar.component';
import { LOGIN } from 'constants/paths';
import { IAppState } from 'shared/models/store.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { CircleSpinner } from 'shared/components/spinner';
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
                    return <CircleSpinner />;
                }
                if (isAuth) {
                    return (
                        <LayoutWithSidebarComponent
                            component={Component}
                            {...props}
                        ></LayoutWithSidebarComponent>
                    );
                }
                return <Redirect to={LOGIN} />;
            }}
        />
    );
};
export default PrivateRoute;
