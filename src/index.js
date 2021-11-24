import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import Words from "./pages/Words";
import {WordsProvider} from "./hooks/useWords";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <WordsProvider>
                <Words/>
            </WordsProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
