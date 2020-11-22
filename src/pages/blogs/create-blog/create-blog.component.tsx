import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ICreateBlogRequest } from 'shared/models/blog.model';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import createBlogStyles from './create-blog.module.scss';
import inputStyle from 'styles/util-modules/input.module.scss';
import buttonStyle from 'styles/util-modules/button.module.scss';
import blockStyles from 'styles/components/blocks.module.scss';
interface ICreateBlogProps {}

const CreateBlogComponent: React.FunctionComponent<ICreateBlogProps> = () => {
    const [t] = useTranslation();
    const initialValues: Omit<ICreateBlogRequest, 'content'> = {
        title: '',
        description: '',
        categories: [],
        imageUrl: '',
    };
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        title: Yup.string().email().required(),
        description: Yup.string().required(),
        categories: Yup.array().required(),
        imageUrl: Yup.string().required(),
    });
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
    const formik = useFormik({
        initialValues,
        validationSchema,
        validate: (e) => {
            console.log(convertEditorStateToHTML(content.editorState));
        },
        onSubmit: (values, action) => {},
    });
    return (
        <>
            <header className={blockStyles.header}>
                <h2>{t('blogs.create.title')}</h2>
            </header>
            <div className={blockStyles.content}>
                <form onSubmit={formik.handleSubmit}>
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
                            wrapperClassName={createBlogStyles.editorWrapper}
                            editorClassName={createBlogStyles.editor}
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
                                    popupClassName: createBlogStyles.editorLinkPopup,
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
                    <div className={createBlogStyles.formFooter}>
                        <button className={buttonStyle.btn_primary} type="submit">
                            Đăng bài
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateBlogComponent;
