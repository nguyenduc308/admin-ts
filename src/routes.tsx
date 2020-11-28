import React, { Fragment } from 'react';
import { IRoute } from 'shared/models/router.model';
import * as paths from 'constants/paths';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from 'shared/HOC/private-route.component';
import { uuid } from 'shared/helpers';

const routes: IRoute[] = [
    {
        path: paths.REGISTER,
        exact: true,
        component: React.lazy(() => import('./pages/auth/register/register.component')),
        isPrivate: false,
        uuid: uuid(),
    },
    {
        path: paths.LOGIN,
        exact: false,
        component: React.lazy(() => import('./pages/auth/login/login.component')),
        isPrivate: false,
        uuid: uuid(),
    },
    {
        path: paths.HOMEPAGE_PATH,
        exact: true,
        component: React.lazy(() => import('./pages/home/home.component')),
        isPrivate: true,
        uuid: uuid(),
    },
    {
        path: paths.LIST_BLOGS_PATH,
        exact: true,
        component: React.lazy(() => import('./pages/blogs/list-blogs/list-blogs.component')),
        isPrivate: true,
        uuid: uuid(),
    },
    {
        path: paths.BLOG_CREATE_PATH,
        exact: false,
        component: React.lazy(() => import('./pages/blogs/create-blog/create-blog.component')),
        isPrivate: true,
        uuid: uuid(),
    },
    {
        path: paths.UPDATE_CREATE_PATH,
        exact: false,
        component: React.lazy(() => import('./pages/blogs/update-blog/update-blog.component')),
        isPrivate: true,
        uuid: uuid(),
    },
    {
        path: paths.CATEGORIES_PATH,
        exact: false,
        component: React.lazy(() => import('./pages/categories/categories.component')),
        isPrivate: true,
        uuid: uuid(),
    },
];

const AppRoutes: React.FC = () => {
    return (
        <Fragment>
            <Switch>
                {routes.map(({ isPrivate, uuid, ...rest }: IRoute) => {
                    if (!isPrivate) {
                        return <Route key={uuid} {...rest} />;
                    }
                    return <PrivateRoute key={uuid} {...rest} />;
                })}
            </Switch>
        </Fragment>
    );
};

export default AppRoutes;
