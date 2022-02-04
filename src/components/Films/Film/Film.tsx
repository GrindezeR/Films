import React, {ChangeEvent} from "react";
import notFound from "../../../common/images/notFound.png";
import {useDispatch} from "react-redux";
import {getFilmInfo} from "../../../state/films-reducer";
import {useNavigate} from "react-router-dom";
import s from './Film.module.scss';
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";

type PropsType = {
    poster: string
    title: string
    type: string
    year: string
    filmId: string
    animationDelay: number
}
export const Film = ({poster, title, type, year, filmId, animationDelay}: PropsType) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    let niceType = type.split('');
    niceType[0] = niceType[0].toUpperCase();

    const onErrorImageLoad = (e: ChangeEvent<HTMLImageElement>) => {
        e.currentTarget.src = notFound;
    }

    const aboutFilmHandler = () => {
        dispatch(getFilmInfo(filmId))
        navigate('/about')
    }

    return (
        <Grid className={s.cardWrapper} style={{animationDelay: `.${animationDelay}s`}} item>
            <Card className={s.card} onClick={aboutFilmHandler} sx={{maxWidth: 300}} elevation={5}>
                <CardMedia component={'img'}
                           image={poster !== 'N/A' ? poster : notFound}
                           onError={onErrorImageLoad}
                           alt={'poster'}>
                </CardMedia>

                <CardContent className={s.aboutFilm}>
                    <Typography gutterBottom variant="h6" component="span">
                        {title}
                    </Typography>
                    <Typography color="text.secondary">
                        <span className={s.type}>{niceType}</span>
                        <span className={s.year}>{year}</span>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}