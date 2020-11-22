import React from 'react';
import spinnerStyle from '../spinner.module.scss';
import circleSpinnerStyles from './circle-spinner.module.scss';

const CircleSpinnerComponent: React.FC<any> = () => {
    return (
        <>
            <div className={spinnerStyle.spinner}>
                <div className={circleSpinnerStyles.circle}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
};
export default CircleSpinnerComponent;
