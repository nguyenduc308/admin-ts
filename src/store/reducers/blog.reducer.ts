import { IBlogState } from 'shared/models/blog.model';
import { BlogActions, EBlogActionTypes } from '../actions/blog.action';
export const initialState: IBlogState = {
    list: null,
    current: null,
};

const blogReducer = (state = initialState, action: BlogActions): IBlogState => {
    switch (action.type) {
        case EBlogActionTypes.GET_LIST_BLOGS_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
        case EBlogActionTypes.DELETE_BLOG_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.filter((blog) => blog._id !== action.payload),
                },
            };
        case EBlogActionTypes.GET_BLOG_BY_SLUG_SUCCESS:
            return {
                ...state,
                current: action.payload,
            };
        default:
            return state;
    }
};

export default blogReducer;
