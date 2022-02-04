import React from "react";
import {AboutFilmType, filmsAboutClearData} from "../../../state/films-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../state/store";
import {useNavigate} from "react-router-dom";
import s from './AboutFilm.module.scss';
import {Button, Paper} from "@mui/material";
import noPoster from '../../../common/images/notFound.png';

export const AboutFilm = () => {
    const dispatch = useDispatch();
    const filmData = useSelector<AppRootType, AboutFilmType>(state => state.films.aboutFilm)
    const navigate = useNavigate();

    const dataList = Object.keys(filmData).map((title, index) => {
        let value = filmData[title as keyof AboutFilmType]

        if (title !== 'Response') {
            if (typeof value === 'string') {
                if (title !== 'Poster') {
                    return <li key={index}><b>{title}</b>: {value}</li>
                } else {
                    return <li key={index}>
                        <b>{title}</b>: <a rel={'noreferrer'} target={'_blank'} href={value}>{value}</a>
                    </li>
                }
            } else {
                const ratingList = value.map((r, i) =>
                    <div key={i}><b>{r.Source}</b> - {r.Value}</div>)
                return (
                    <React.Fragment key={index}>
                        <li><b>{title}</b>:</li>
                        <li>{ratingList}</li>
                    </React.Fragment>
                );
            }
        } else return null
    })

    const onBackClickHandler = () => {
        dispatch(filmsAboutClearData());
        navigate('/');
    }

    return (
        <div className={s.aboutWrapper}>
            <h3>ABOUT FILM</h3>
            <div className={s.contentWrapper}>
                <div>
                    <img className={s.poster} src={filmData.Poster !== 'N/A' ? filmData.Poster : noPoster}
                         alt="Poster"/>
                </div>
                <Paper className={s.data}>
                    {dataList}
                </Paper>
            </div>
            <div className={s.buttonWrapper}>
                <Button onClick={onBackClickHandler} color={'info'} variant={'contained'}>Back</Button>
            </div>
        </div>
    )
}