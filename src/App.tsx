import React from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './App.module.scss';
import {Films} from "./components/Films/Films";
import {AboutFilm} from "./components/Films/AboutFilm/AboutFilm";
import {Search} from "./Features/Search/Search";
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import okko from './common/images/okko.png';
import {useSelector} from "react-redux";
import {AppRootType} from "./state/store";

function App() {
    return (
        <div className={s.app}>
            <Box>
                <AppBar className={s.appBar} position="static">
                    <Toolbar>
                        <span className={s.letterM}>M</span><img src={okko} alt="mokko" height={'80px'}/>
                    </Toolbar>
                </AppBar>
            </Box>


            <Search/>
            <Routes>
                <Route path={'/'} element={<Films/>}/>
                <Route path={`/about`} element={<AboutFilm/>}/>
            </Routes>
        </div>
    );
}

export default App;
