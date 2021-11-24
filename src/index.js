import React from 'react';
import ReactDOM from 'react-dom';

import {WordsProvider} from "./hooks/useWords";
import Router from "./router";

ReactDOM.render(
    <React.StrictMode>
        <WordsProvider>
            <Router/>
        </WordsProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
