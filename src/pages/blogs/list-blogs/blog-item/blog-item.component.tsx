import React from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from 'shared/models/blog.model';
import blogItemStyles from './blog-item.module.scss';

export interface IBlogItemProps {
    blog: IBlog;
    deleteBlog: (id: string) => void;
}
const BlogItemComponent: React.FC<IBlogItemProps> = ({ blog, deleteBlog }) => {
    return (
        <>
            <div className={blogItemStyles.blog_item}>
                <div>{blog.title}</div>
                <div className={blogItemStyles.blog_item_actions}>
                    <Link to={`/blogs/${blog.slug}`} className={blogItemStyles.blog_item_edit}>
                        Edit
                    </Link>
                    <span
                        className={blogItemStyles.blog_item_delete}
                        onClick={() => deleteBlog(blog._id)}
                    >
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
};
export default BlogItemComponent;
