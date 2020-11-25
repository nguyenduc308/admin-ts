import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import classNames from 'classnames';

import { IAppState } from 'shared/models/store.model';
import { CreateCategoryRequestAction, FetchCategoriesAction } from 'store/actions/category.action';
import CategoryItemComponent from './category-item/category-item.component';
import { Modal } from 'shared/components/modal';

import btnStyles from 'styles/util-modules/button.module.scss';
import inputStyles from 'styles/util-modules/input.module.scss';
import blockStyles from 'styles/components/blocks.module.scss';
import categoryStyles from './categories.module.scss';
import { useFormik } from 'formik';
import { ICreateCategoryRequest } from 'shared/models/category.model';

export interface ICategoriesProps {}
const CategoriesComponent: React.FC<ICategoriesProps> = () => {
    const { list } = useSelector((state: IAppState) => state.category);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const initialValues: ICreateCategoryRequest = {
        name: '',
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
    });

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        validationSchema,
        validate: (e) => {
            console.log(formik.isValid);
        },
        onSubmit: (values, action) => {
            dispatch(new CreateCategoryRequestAction(values));
        },
    });

    useEffect(() => {
        dispatch(new FetchCategoriesAction());
    }, []);
    const createCategoryButtonClassName = classNames({
        [categoryStyles.button_add]: true,
        [btnStyles.btn_primary]: formik.dirty && formik.isValid,
        [btnStyles.btn_disabled]: !(formik.dirty && formik.isValid),
    });

    return (
        <>
            <header className={blockStyles.header}>
                <h2>Categories</h2>
            </header>
            <div>
                <button onClick={() => setOpenModal(true)} className={btnStyles.btn_primary}>
                    Add New
                </button>
            </div>
            <div className={categoryStyles.list}>
                {list &&
                    list.data &&
                    list.data.map((category) => {
                        return <CategoryItemComponent key={category._id} category={category} />;
                    })}
            </div>

            <Modal isOpen={isOpenModal}>
                <div className={categoryStyles.add_new}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={inputStyles.form_group}>
                            <input
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                name="name"
                                autoComplete="off"
                                placeholder="Input name"
                                className={inputStyles.form_control}
                            />
                            {formik.touched && formik.errors.name && (
                                <div className={inputStyles.error_message}>
                                    {formik.errors.name.charAt(0).toUpperCase() +
                                        formik.errors.name.slice(1)}
                                </div>
                            )}
                        </div>

                        <div className={categoryStyles.add_new__bottom}>
                            <button className={createCategoryButtonClassName} type="submit">
                                Create Now
                            </button>
                            <button
                                className={btnStyles.btn_secondary}
                                onClick={() => setOpenModal(false)}
                                type="button"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};
export default CategoriesComponent;
