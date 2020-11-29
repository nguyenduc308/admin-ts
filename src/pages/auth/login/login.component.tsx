import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ILoginRequest } from 'shared/models/auth.model';
import { AuthPageWrapper, FormAuthWrapper, FromAuthFooterWrapper } from '../form-auth.styled';

import inputStyle from 'styles/util-modules/input.module.scss';
import buttonStyle from 'styles/util-modules/button.module.scss';
import { useTranslation } from 'react-i18next';
import { REGISTER } from 'constants/paths';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginRequestAction } from 'store/actions/auth.action';
import { useNotAuth } from 'shared/hooks';

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
    useNotAuth();
    const [t] = useTranslation();
    const initialValues: ILoginRequest = {
        email: '',
        password: '',
    };
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        validate: (e) => {
            // console.log(e);
        },
        onSubmit: (values, action) => {
            dispatch(new LoginRequestAction(values));
        },
    });
    return (
        <AuthPageWrapper>
            <FormAuthWrapper>
                <h1>{t('auth.login.title')}</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className={inputStyle.form_group}>
                        <label htmlFor="email">Email</label>
                        <input
                            className={inputStyle.form_control}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            id="email"
                            name="email"
                            placeholder="Nhập email"
                            autoComplete="off"
                        />
                    </div>
                    <div className={inputStyle.form_group}>
                        <label htmlFor="password">Password</label>
                        <input
                            className={inputStyle.form_control}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            id="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            autoComplete="off"
                        />
                    </div>
                    <FromAuthFooterWrapper>
                        <div>
                            <Link to={REGISTER}>Register</Link>
                        </div>
                        <button className={buttonStyle.btn_primary} type="submit">
                            Đăng nhập
                        </button>
                    </FromAuthFooterWrapper>
                </form>
            </FormAuthWrapper>
        </AuthPageWrapper>
    );
};
export default Login;
