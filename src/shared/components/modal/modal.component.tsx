import React from 'react';
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.scss';
const modalRoot = document.getElementById('modal');
export interface IModalProps {
    isOpen?: boolean;
    config?: {
        panelClass?: string;
    };
}
const ModalComponent: React.FC<IModalProps> = ({ isOpen, config, children }) => {
    return (
        isOpen &&
        createPortal(
            <div className={(config && config.panelClass) || modalStyles.panel}>{children}</div>,
            modalRoot,
        )
    );
};

export default ModalComponent;
