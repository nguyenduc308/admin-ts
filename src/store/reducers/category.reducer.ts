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
        case ECategoryActionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [action.payload, ...state.list.data],
                },
            };
        case ECategoryActionTypes.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.filter((item) => item._id !== action.payload),
                },
            };
        case ECategoryActionTypes.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.map((item) => {
                        if (item._id === action.payload._id) {
                            return action.payload;
                        }
                        return item;
                    }),
                },
            };
        default:
            return state;
    }
};
export default categoriesReducer;
