import React, { useCallback, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IBlog, ICreateBlogRequest } from 'shared/models/blog.model';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch, useSelector } from 'react-redux';
import { FetchCategoriesAction } from 'store/actions/category.action';
import { IAppState } from 'shared/models/store.model';
import { ICategory } from 'shared/models/category.model';

import blogFormStyle from './blog-form.module.scss';
import inputStyle from 'styles/util-modules/input.module.scss';
import buttonStyle from 'styles/util-modules/button.module.scss';
import blockStyles from 'styles/components/blocks.module.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export interface IBlogFormProps {
    submit: (data: ICreateBlogRequest) => void;
    data?: IBlog;
}

const BlogFormComponent: React.FC<IBlogFormProps> = ({ submit, data }) => {
    const initialValues: Omit<ICreateBlogRequest, 'content'> = {
        title: '',
        description: '',
        categories: [],
        imageUrl: '',
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string(),
        imageUrl: Yup.string(),
    });
    const { list } = useSelector((state: IAppState) => state.category);

    const [content, setContent] = useState({ editorState: EditorState.createEmpty() });
    const onEditorStateChange = (editorState: EditorState) => {
        setContent({ editorState });
    };
    const convertHTMLtoEditorState = (html: string): EditorState => {
        const contentBlock = htmlToDraft(html);

        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            return editorState;
        }

        return EditorState.createEmpty();
    };
    const convertEditorStateToHTML = (editorState: EditorState) => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    };
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(new FetchCategoriesAction());
    }, [dispatch]);

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

    const [queryCategory, setQueryCategory] = useState('');
    const handleSelectCategory = ({
        target: { checked, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        let newSelectedCategories: string[];
        if (checked) {
            newSelectedCategories = [value, ...categoriesSelected];
        } else {
            newSelectedCategories = categoriesSelected.filter((item) => item !== value);
        }
        setCategoriesSelected([...new Set(newSelectedCategories)]);
    };
    let timeIdRef = useRef<number | null>(null);
    const debounce = (callback: Function, ms: number = 400) => {
        if (!callback || typeof callback !== 'function') {
            return;
        }
        if (timeIdRef.current) {
            clearTimeout(timeIdRef.current);
        }
        timeIdRef.current = setTimeout(() => {
            callback();
        }, ms);
    };
    const handleQueryCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQueryCategory(event.target.value);
    };

    const filteredCategories = useCallback((data: ICategory[], query?: string): ICategory[] => {
        if (query && typeof query === 'string') {
            return data.filter((category) => {
                const regex = new RegExp(query, 'gi');
                return category._id === query || regex.test(category.name);
            });
        }
        return data;
    }, []);
    React.useEffect(() => {
        if (list && list.data && list.data.length) {
            debounce(() => {
                setCategories(filteredCategories(list.data, queryCategory));
            });
        }
    }, [list, queryCategory]);
    const formik = useFormik({
        initialValues,
        validationSchema,
        validate: (e) => {},
        onSubmit: (values, action) => {
            const newBlog: ICreateBlogRequest = {
                ...values,
                content: convertEditorStateToHTML(content.editorState),
                categories: categoriesSelected,
            };
            submit(newBlog);
        },
    });
    React.useEffect(() => {
        if (data) {
            formik.setValues({
                title: data.title,
                imageUrl: data.imageUrl,
                description: data.excerpt,
                categories: data.categories,
            });
            const blocks = convertHTMLtoEditorState(data.content);
            setContent({ editorState: blocks });
            if (data.categories && data.categories.length) {
                const categoriesDefault = data.categories.map((category) => category._id);
                setCategoriesSelected(categoriesDefault);
            }
        }
    }, [data]);
    return (
        <div className={blogFormStyle.wrapper}>
            <div className={blockStyles.content}>
                <form onSubmit={formik.handleSubmit} className={blogFormStyle.form}>
                    <div className={blogFormStyle.formContent}>
                        <div className={blogFormStyle.formLeft}>
                            <div className={inputStyle.form_group}>
                                <input
                                    className={inputStyle.form_control}
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    id="title"
                                    name="title"
                                    placeholder="Nhập tiêu đề bài viết"
                                    autoComplete="off"
                                />
                                {formik.touched && formik.errors.title && (
                                    <div className={inputStyle.error_message}>
                                        {formik.errors.title.charAt(0).toUpperCase() +
                                            formik.errors.title.slice(1)}
                                    </div>
                                )}
                            </div>
                            <div className={inputStyle.form_group}>
                                <input
                                    className={inputStyle.form_control}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    id="description"
                                    name="description"
                                    placeholder="Nhập mô tả ngắn"
                                    autoComplete="off"
                                />
                            </div>
                            <div className={inputStyle.form_group}>
                                <Editor
                                    editorState={content.editorState}
                                    onEditorStateChange={onEditorStateChange}
                                    wrapperClassName={blogFormStyle.editorWrapper}
                                    editorClassName={blogFormStyle.editor}
                                    placeholder="Nhập nội dung bài viết"
                                    toolbar={{
                                        fontFamily: {
                                            options: [
                                                'Nanum Square',
                                                'Arial',
                                                'Georgia',
                                                'Impact',
                                                'Tahoma',
                                                'Verdana',
                                            ],
                                        },
                                        link: {
                                            popupClassName: blogFormStyle.editorLinkPopup,
                                        },
                                        // image: {
                                        //   uploadCallback: this.uploadImageCallBack,
                                        //   alt: { present: false, mandatory: false },
                                        //   urlEnabled: true,
                                        //   uploadEnabled: false,
                                        //   inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                        //   defaultSize: {
                                        //     height: 'auto',
                                        //     width: '100%',
                                        //   },
                                        // },
                                    }}
                                />
                            </div>
                        </div>
                        <div className={blogFormStyle.formRight}>
                            <div className={inputStyle.form_group}>
                                <input
                                    className={inputStyle.form_control}
                                    value={queryCategory}
                                    onChange={handleQueryCategoryChange}
                                    id="query-category"
                                    name="queryCategory"
                                    placeholder="Nhập tên category hoặc id"
                                    autoComplete="off"
                                />
                            </div>
                            <div className={blogFormStyle.categories}>
                                {categories &&
                                    categories.map((category) => {
                                        return (
                                            <div
                                                key={category._id}
                                                className={blogFormStyle.categoryItem}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={categoriesSelected.includes(
                                                        category._id,
                                                    )}
                                                    value={category._id}
                                                    onChange={handleSelectCategory}
                                                    className={blogFormStyle.categoryCheckbox}
                                                />
                                                {category.name}
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className={blogFormStyle.sidebar_wrap}>
                                <p>Link hình ảnh</p>
                                <div className={inputStyle.form_group}>
                                    <input
                                        className={inputStyle.form_control}
                                        value={formik.values.imageUrl}
                                        onChange={formik.handleChange}
                                        id="imageUrl"
                                        name="imageUrl"
                                        placeholder="Nhập link hình ảnh"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={blogFormStyle.formFooter}>
                        <button className={buttonStyle.btn_primary} type="submit">
                            Đăng bài
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default BlogFormComponent;
