import { Sidebar } from 'components/siderbar';
import React from 'react';
interface ILayoutWithSidebarProp {
    component: React.ComponentType<any>;
}
const LayoutWithSidebarComponent: React.FC<ILayoutWithSidebarProp> = ({
    component: Component,
    ...rest
}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col col-2">
                    <Sidebar />
                </div>
                <div className="col col-10">
                    <main>
                        <Component {...rest}></Component>
                    </main>
                </div>
            </div>
        </div>
    );
};
export default LayoutWithSidebarComponent;
