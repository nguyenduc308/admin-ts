import { combineReducers } from 'redux';
import auth from './auth.reducer';
import category from './category.reducer';
export const rootReducer = combineReducers({ auth, category });
