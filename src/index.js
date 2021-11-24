import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import Words from "./pages/Words";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Words/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
