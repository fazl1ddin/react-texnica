import React from "react";
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./store/index";
import App from './App'

const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <BrowserRouter>
                <App/>
        </BrowserRouter>
    </Provider>
)