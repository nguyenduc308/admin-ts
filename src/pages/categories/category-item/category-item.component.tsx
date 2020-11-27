import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ICategory } from 'shared/models/category.model';
import { DeleteCategoryRequestAction } from 'store/actions/category.action';
import categoryStyles from './category-item.module.scss';

export interface ICategoryItemProps {
    category: ICategory;
    setCurrentCategoryEdit: (category: ICategory) => void;
}

const CategoryItemComponent: React.FC<ICategoryItemProps> = ({
    category,
    setCurrentCategoryEdit,
}) => {
    const dispatch = useDispatch();
    const deleteCategory = () => {
        dispatch(new DeleteCategoryRequestAction(category._id));
    };
    return (
        <div className={categoryStyles.category}>
            <div>{category.name}</div>
            <div className={categoryStyles.action_wrap}>
                <span
                    className={categoryStyles.action_edit}
                    onClick={() => setCurrentCategoryEdit(category)}
                >
                    Edit
                </span>
                <span className={categoryStyles.action_delete} onClick={deleteCategory}>
                    Delete
                </span>
            </div>
        </div>
    );
};
export default CategoryItemComponent;
