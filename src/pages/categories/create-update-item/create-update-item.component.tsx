import classNames from 'classnames';
import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { Modal } from 'shared/components/modal';
import { ICategory, ICreateCategoryRequest } from 'shared/models/category.model';
import {
    CreateCategoryRequestAction,
    FetchCategoriesAction,
    UpdateCategoryRequestAction,
} from 'store/actions/category.action';

import btnStyles from 'styles/util-modules/button.module.scss';
import inputStyles from 'styles/util-modules/input.module.scss';
import categoryStyles from '../categories.module.scss';

export interface ICreateOrUpdateItemProps {
    isOpen: boolean;
    closeModal: () => void;
    data: ICategory;
}
const CreateOrUpdateCategoryComponent: React.FC<ICreateOrUpdateItemProps> = ({
    isOpen,
    closeModal,
    data,
}) => {
    const setCloseModal = () => {
        formik.resetForm();
        closeModal();
    };
    const handleSuccess = (data: any) => {
        setCloseModal();
        setCreatingCategory(false);
    };
    const handleError = (data: any) => {
        setCreatingCategory(false);
    };

    const initialValues: ICreateCategoryRequest = {
        name: '',
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
    });

    const dispatch = useDispatch();
    const [creatingCategory, setCreatingCategory] = useState(false);
    const formik = useFormik({
        initialValues,
        validationSchema,
        validate: (e) => {},
        onSubmit: (values) => {
            setCreatingCategory(true);
            if (!data) {
                const dispatched = dispatch(new CreateCategoryRequestAction(values));
                dispatched.onSuccess = handleSuccess;
                dispatched.onError = handleError;
            } else {
                const dispatched = dispatch(
                    new UpdateCategoryRequestAction({ id: data._id, data: values }),
                );
                dispatched.onSuccess = handleSuccess;
                dispatched.onError = handleError;
            }
        },
    });

    useEffect(() => {
        dispatch(new FetchCategoriesAction());
    }, [dispatch]);
    useEffect(() => {
        if (!!data) {
            formik.setValues({ name: data.name });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    const createCategoryButtonClassName = useMemo(
        () =>
            classNames({
                [categoryStyles.button_add]: true,
                [btnStyles.btn_primary]: formik.dirty && formik.isValid,
                [btnStyles.btn_disabled]: !(formik.dirty && formik.isValid) || creatingCategory,
            }),
        [formik.dirty, formik.isValid, creatingCategory],
    );

    return (
        <Modal isOpen={isOpen}>
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
                            onClick={setCloseModal}
                            type="button"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
export default CreateOrUpdateCategoryComponent;
