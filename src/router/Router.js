import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Words from "../pages/Words";
import AddWordsDialog from "../pages/Words/AddWordsDialog";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="words" element={<Words/>}>
                    <Route path="add" element={<AddWordsDialog/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;