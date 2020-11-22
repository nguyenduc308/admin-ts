import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from 'store/configureStore';

import './styles/main.scss';
import './i18n';
import { CircleSpinner } from 'shared/components/spinner';

ReactDOM.render(
    <Provider store={store()}>
        <BrowserRouter>
            <Suspense fallback={<CircleSpinner />}>
                <Route path="/" component={App} />
            </Suspense>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

reportWebVitals();
