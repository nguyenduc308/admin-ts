import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from 'shared/models/store.model';
import { DeleteBlogRequestAction, GetBlogsRequestAction } from 'store/actions/blog.action';
import BlogItemComponent from './blog-item/blog-item.component';
import btnStyles from 'styles/util-modules/button.module.scss';
import blockStyles from 'styles/components/blocks.module.scss';
import { BLOG_CREATE_PATH } from 'constants/paths';

interface IListBlogsProps {}

const ListBlogsComponent: React.FC<IListBlogsProps> = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state: IAppState) => state.blog);
    React.useEffect(() => {
        dispatch(new GetBlogsRequestAction());
    }, [dispatch]);
    const deleteBlog = (id: string) => {
        dispatch(new DeleteBlogRequestAction(id));
    };
    return (
        <>
            <header className={blockStyles.header}>
                <h2>Blogs</h2>
            </header>
            <div>
                <Link to={BLOG_CREATE_PATH} className={btnStyles.btn_primary}>
                    Add New
                </Link>
            </div>
            {list &&
                list.data &&
                list.data.map((blog) => {
                    return <BlogItemComponent key={blog._id} blog={blog} deleteBlog={deleteBlog} />;
                })}
        </>
    );
};
export default ListBlogsComponent;
