import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
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
import {AboutFilmType} from "./state/films-reducer";

function App() {
    const filmData = useSelector<AppRootType, AboutFilmType>(state => state.films.aboutFilm)
    let navigate = useNavigate()

    useEffect(() => {
        if (!filmData.Title) {
            navigate('/')
        }
    }, [])

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
            <div className={s.content}>
                <Routes>
                    <Route path={'/'} element={<Films/>}/>
                    <Route path={`/about`} element={<AboutFilm/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
