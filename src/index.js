import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './app/App';
import "./i18n";
import * as serviceWorker from './serviceWorker';
import store from './app/store/store'
import {Provider} from 'react-redux'
import {BASE_NAME} from "./app/utils/constants";

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}

ReactDOM.render(
        <Provider store={store}>

                <BrowserRouter basename={BASE_NAME}>
                    <AlertProvider template={AlertTemplate} {...options}>

                    <App/>
                    </AlertProvider>

                </BrowserRouter>

        </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();