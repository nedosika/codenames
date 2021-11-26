import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Words from "../pages/Words";
import AddWordDialog from "../pages/Words/AddWordDialog";
import Games from "../pages/Games";
import AddWordsDialog from "../pages/Games/AddWordsDialog";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="words" element={<Words/>}>
                    <Route path="add" element={<AddWordDialog/>}/>
                </Route>
                <Route path="games/:id" element={<Games/>}>
                    <Route path="add" element={<AddWordsDialog/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;