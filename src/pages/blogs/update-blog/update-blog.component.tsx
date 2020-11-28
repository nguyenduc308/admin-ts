import React, { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import BlogFormComponent from 'shared/components/blog-form/blog-form.component';
import { ICreateBlogRequest } from 'shared/models/blog.model';
import { CreateBlogRequestAction, GetBlogBySlugRequestAction } from 'store/actions/blog.action';

import blockStyles from 'styles/components/blocks.module.scss';
import updateBlogStyles from './update-blog.module.scss';
import { useParams } from 'react-router-dom';
import { IAppState } from 'shared/models/store.model';
interface ICreateBlogProps {}

const UpdateBlogComponent: React.FunctionComponent<ICreateBlogProps> = () => {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const initialMessage: {
        type: 'SUCCESS' | 'ERROR' | '';
        content: string;
    } = {
        type: '',
        content: '',
    };
    const { current: currentBlog } = useSelector((state: IAppState) => state.blog);
    const [message, setMessage] = useState(initialMessage);
    const timeIdRef = useRef<number | null>(null);
    const handleSuccess = function () {
        setMessage({
            type: 'SUCCESS',
            content: 'Cập nhật thành công',
        });
        timeIdRef.current = setTimeout(() => {
            setMessage(initialMessage);
        }, 5000);
    };

    const handleError = function () {
        setMessage({
            type: 'ERROR',
            content: 'Cập nhật thất bại',
        });
        timeIdRef.current = setTimeout(() => {
            setMessage(initialMessage);
        }, 5000);
    };

    const handleSubmit = (data: ICreateBlogRequest) => {
        const dispatched = dispatch(new CreateBlogRequestAction(data));
        dispatched.onSuccess = handleSuccess;
        dispatched.onError = handleError;
    };
    const messageClass = classNames({
        [updateBlogStyles.success]: message.type === 'SUCCESS',
        [updateBlogStyles.warning]: message.type === 'ERROR',
        [updateBlogStyles.message_area]: true,
    });
    const { slug } = useParams<{ slug: string }>();
    useEffect(() => {
        dispatch(new GetBlogBySlugRequestAction(slug));
        return () => {
            if (timeIdRef.current) {
                clearTimeout(timeIdRef.current);
            }
        };
    }, [slug, dispatch]);
    return (
        <>
            <header className={blockStyles.header}>
                <h2>{t('blogs.update.title')}</h2>
            </header>
            <div className={messageClass}>{message.content}</div>
            {currentBlog && <BlogFormComponent data={currentBlog} submit={handleSubmit} />}
        </>
    );
};

export default UpdateBlogComponent;
