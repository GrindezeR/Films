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
import Particles from "react-tsparticles";

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
            <Particles
                id="tsparticles"
                options={{
                    background: {
                        color: {
                            value: "#91ede4",
                        },
                    },
                    backgroundMode: {
                        zIndex: -10,
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "trail",
                            },
                            onHover: {
                                enable: true,
                                mode: "attract",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 20,
                                opacity: 0.8,
                                size: 140,
                            },
                            push: {
                                quantity: 4,
                            },
                            attract: {
                                distance: 200,
                                duration: 0.4,
                                factor: 2
                            },
                            repulse: {
                                distance: 80,
                                duration: 0.1,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#000",
                        },
                        links: {
                            color: "#000",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 50,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "line",
                        },
                        size: {
                            value: 2,
                        },
                    },
                    detectRetina: true,
                }}
            />

            {isLoading && <Preloader type={'circle'}/>}
            <div className={s.app}>
                <Box>
                    <AppBar className={s.appBar} position="static">
                        <Toolbar className={s.barContainer}>
                            <img className={s.logoImage} src={logo} alt="cinema"/>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Search/>
                <Routes>
                    <Route path={'/'} element={filmData.Search && <Films/>}/>
                    <Route path={`/about`} element={filmData.aboutFilm.Title && <AboutFilm/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
