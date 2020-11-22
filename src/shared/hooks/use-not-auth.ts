import { HOMEPAGE_PATH } from 'constants/paths';
import { IAppState } from 'shared/models/store.model';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useNotAuth = (): void => {
    const { isAuth, isLoading } = useSelector((state: IAppState) => state.auth);
    const history = useHistory();

    useEffect(() => {
        if (isAuth && !isLoading) {
            history.push(HOMEPAGE_PATH);
        }
    }, [isAuth, history]);
};
export default useNotAuth;
