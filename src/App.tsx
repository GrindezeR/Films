import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import s from './App.module.scss';
import {Films} from "./components/Films/Films";
import {AboutFilm} from "./components/Films/AboutFilm/AboutFilm";
import {Search} from "./Features/Search/Search";
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from './common/images/logo.png';
import {useSelector} from "react-redux";
import {AppRootType} from "./state/store";
import {InitialStateType} from "./state/films-reducer";
import {Preloader} from "./Features/Preloader/Preloader";

function App() {
    const filmData = useSelector<AppRootType, InitialStateType>(state => state.films);
    const isLoading = useSelector<AppRootType, boolean>(state => state.app.isLoading);
    let navigate = useNavigate()

    useEffect(() => {
        if (!filmData.aboutFilm.Title) {
            navigate('/')
        }
    }, [])

    return (
        <>
            {isLoading && <Preloader type={'circle'}/>}
            <div className={s.app}>
                <Box>
                    <AppBar className={s.appBar} position="static">
                        <Toolbar className={s.barContainer}>
                            <img className={s.logoImage} src={logo} alt="cinema" />
                        </Toolbar>
                    </AppBar>
                </Box>

                <Search/>
                <div className={s.content}>
                    <Routes>
                        <Route path={'/'} element={filmData.Search && <Films/>}/>
                        <Route path={`/about`} element={filmData.aboutFilm.Title && <AboutFilm/>}/>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
