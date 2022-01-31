import React from "react";
import s from './Preloader.module.css';

type PropsType = {
    type?: 'line' | 'circle'
}

export const Preloader = ({type}: PropsType) => {
    return (
        <>
            <div className={s.back}></div>
            <div className={type === "circle" ? s.preloaderCircle : s.preloader}/>
        </>
    );
}