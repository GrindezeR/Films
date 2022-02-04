import React from "react";
import s from './Preloader.module.scss';

type PropsType = {
    type?: 'line' | 'circle'
}

export const Preloader = ({type}: PropsType) => {
    return (
        <>
            <div className={s.back}/>
            <div className={type === "circle" ? s.preloaderCircle : s.preloader}/>
        </>
    );
}