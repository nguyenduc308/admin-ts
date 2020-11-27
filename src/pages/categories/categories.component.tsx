import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { IAppState } from 'shared/models/store.model';
import CategoryItemComponent from './category-item/category-item.component';
import CreateOrUpdateCategoryComponent from './create-update-item/create-update-item.component';

import btnStyles from 'styles/util-modules/button.module.scss';
import blockStyles from 'styles/components/blocks.module.scss';
import categoryStyles from './categories.module.scss';
import { ICategory } from 'shared/models/category.model';

export interface ICategoriesProps {}
const CategoriesComponent: React.FC<ICategoriesProps> = () => {
    const { list } = useSelector((state: IAppState) => state.category);
    const [currentEditingCategory, setCurrentEditingCategory] = useState<ICategory | null>(null);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const openEditingCategory = (cat: ICategory) => {
        setCurrentEditingCategory(cat);
        setOpenModal(true);
    };
    const closeModal = () => {
        setCurrentEditingCategory(null);
        setOpenModal(false);
    };
    return (
        <>
            <header className={blockStyles.header}>
                <h2>Categories</h2>
            </header>
            <div>
                <button onClick={() => setOpenModal(true)} className={btnStyles.btn_primary}>
                    Add New
                </button>
            </div>
            <div className={categoryStyles.list}>
                {list &&
                    list.data &&
                    list.data.map((category) => {
                        return (
                            <CategoryItemComponent
                                key={category._id}
                                category={category}
                                setCurrentCategoryEdit={openEditingCategory}
                            />
                        );
                    })}
            </div>
            <CreateOrUpdateCategoryComponent
                isOpen={isOpenModal}
                closeModal={() => closeModal()}
                data={currentEditingCategory}
            />
        </>
    );
};
export default CategoriesComponent;
