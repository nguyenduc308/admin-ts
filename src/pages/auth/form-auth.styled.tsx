import styled from 'styled-components';

export const AuthPageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: flex-end;
    background: url('/images/auth-bg.jpg') center center / cover no-repeat;
`;
export const FormAuthWrapper = styled.div`
    background: #fff;
    width: 400px;
    padding: 50px;
    .form-auth-title {
        text-align: center;
    }
`;
export const FromAuthFooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    a {
        color: #333;
    }
`;
