import React from 'react';
import { ICategory } from 'shared/models/category.model';
import categoryStyles from './category-item.module.scss';

export interface ICategoryItemProps {
    category: ICategory;
}

const CategoryItemComponent: React.FC<ICategoryItemProps> = ({ category }) => {
    return <div className={categoryStyles.category}>{category.name}</div>;
};
export default CategoryItemComponent;
