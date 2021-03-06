import React, { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import BlogFormComponent from 'shared/components/blog-form/blog-form.component';
import { ICreateBlogRequest } from 'shared/models/blog.model';
import { CreateBlogRequestAction } from 'store/actions/blog.action';

import blockStyles from 'styles/components/blocks.module.scss';
import createBlogStyles from './create-blog.module.scss';
interface ICreateBlogProps {}

const CreateBlogComponent: React.FunctionComponent<ICreateBlogProps> = () => {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const initialMessage: {
        type: 'SUCCESS' | 'ERROR' | '';
        content: string;
    } = {
        type: '',
        content: '',
    };
    const [message, setMessage] = useState(initialMessage);
    const timeIdRef = useRef<number | null>(null);
    const handleSuccess = function () {
        setMessage({
            type: 'SUCCESS',
            content: 'Đăng bài thành công',
        });
        timeIdRef.current = setTimeout(() => {
            setMessage(initialMessage);
        }, 5000);
    };

    const handleError = function () {
        setMessage({
            type: 'ERROR',
            content: 'Đăng bài thất bại',
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
        [createBlogStyles.success]: message.type === 'SUCCESS',
        [createBlogStyles.warning]: message.type === 'ERROR',
        [createBlogStyles.message_area]: true,
    });
    useEffect(
        () => () => {
            if (timeIdRef.current) {
                clearTimeout(timeIdRef.current);
            }
        },
        [],
    );
    return (
        <>
            <header className={blockStyles.header}>
                <h2>{t('blogs.create.title')}</h2>
            </header>
            <div className={messageClass}>{message.content}</div>
            <BlogFormComponent submit={handleSubmit} />
        </>
    );
};

export default CreateBlogComponent;
