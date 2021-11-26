import React from 'react';
import ReactDOM from 'react-dom';

import {WordsProvider} from "./hooks/useWords";
import Router from "./router";
import {GamesProvider} from "./hooks/useGames";

ReactDOM.render(
    <React.StrictMode>
        <GamesProvider>
            <WordsProvider>
                <Router/>
            </WordsProvider>
        </GamesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
