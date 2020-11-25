import { ICategoryState } from 'shared/models/category.model';
import { CategoryActionTypes, ECategoryActionTypes } from 'store/actions/category.action';

const initialState: ICategoryState = {
    list: null,
};

const categoriesReducer = (
    state: ICategoryState = initialState,
    action: CategoryActionTypes,
): ICategoryState => {
    switch (action.type) {
        case ECategoryActionTypes.GET_CATEGORIES_REQUEST:
            return state;
        case ECategoryActionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};
export default categoriesReducer;
