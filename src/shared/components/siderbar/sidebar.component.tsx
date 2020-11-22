import { uuid } from 'shared/helpers';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarWrapper, LinkListWrapper, LinkItemWrapper } from './sidebar.styled';
import styles from './sidebar.module.scss';

export interface ISidebarProps {}

const SidebarComponent: React.FC<ISidebarProps> = () => {
    const paths = [
        {
            label: 'HomePage',
            path: '/',
            id: uuid(),
        },
        {
            label: 'List Blogs',
            path: '/blogs',
            id: uuid(),
        },
        {
            label: 'Create new blog',
            path: '/blogs/create',
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
