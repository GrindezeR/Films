import React from "react";
import notFound from "../../../common/images/notFound.png";
import {useDispatch} from "react-redux";
import {getFilmInfo} from "../../../state/films-reducer";
import {Link} from "react-router-dom";
import s from './Film.module.scss';
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";

type PropsType = {
    poster: string
    title: string
    type: string
    year: string
    filmId: string
}
export const Film = ({poster, title, type, year, filmId}: PropsType) => {
    const dispatch = useDispatch();

    let niceType = type.split('');
    niceType[0] = niceType[0].toUpperCase();

    const aboutFilmHandler = () => {
        dispatch(getFilmInfo(filmId));
    }

    return (
        <Grid item xs={2} margin={'0 10px'} alignContent={'center'}>

            <Card sx={{maxWidth: 345}}>
                <Link to={'/about'}>
                    <CardMedia component={'img'}
                               onClick={aboutFilmHandler}
                               image={poster !== 'N/A' ? poster : notFound}
                               alt={'poster'}>
                    </CardMedia>
                </Link>

                <CardContent className={s.aboutFilm}>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography color="text.secondary">
                        <div>{niceType}</div>
                        <div>{year}</div>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>

    );
}