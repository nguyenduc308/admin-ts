import { uuid } from 'shared/helpers';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarWrapper, LinkListWrapper, LinkItemWrapper } from './sidebar.styled';
import styles from './sidebar.module.scss';
import { BLOG_CREATE_PATH, CATEGORIES_PATH, HOMEPAGE_PATH, LIST_BLOGS_PATH } from 'constants/paths';

export interface ISidebarProps {}

const SidebarComponent: React.FC<ISidebarProps> = () => {
    const paths = [
        {
            label: 'HomePage',
            path: HOMEPAGE_PATH,
            id: uuid(),
        },
        {
            label: 'List Blogs',
            path: LIST_BLOGS_PATH,
            id: uuid(),
        },
        {
            label: 'Create new blog',
            path: BLOG_CREATE_PATH,
            id: uuid(),
        },
        {
            label: 'Categories',
            path: CATEGORIES_PATH,
            id: uuid(),
        },
    ];
    return (
        <SidebarWrapper>
            <LinkListWrapper>
                {paths.map((path) => {
                    return (
                        <LinkItemWrapper key={path.id}>
                            <NavLink exact activeClassName={styles.linkActive} to={path.path}>
                                {path.label}
                            </NavLink>
                        </LinkItemWrapper>
                    );
                })}
            </LinkListWrapper>
        </SidebarWrapper>
    );
};
export default SidebarComponent;
