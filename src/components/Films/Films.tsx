import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../state/store";
import {filmsSetCurrentPage, getFilms, InitialStateType} from "../../state/films-reducer";
import {Paginator} from "../../Features/Paginator/Paginator";
import {Film} from "./Film/Film";
import s from './Films.module.scss';
import Grid from "@mui/material/Grid";


export const Films = () => {
    const dispatch = useDispatch();
    const films = useSelector<AppRootType, InitialStateType>(state => state.films)

    const getFilmsByPage = (page: number) => {
        dispatch(getFilms(films.searchValue, page));
        dispatch(filmsSetCurrentPage(page));
    }

    const filmList = films.Search.map((f, i) => {
        return (
            <Film key={i} filmId={f.imdbID}
                  poster={f.Poster}
                  title={f.Title}
                  type={f.Type}
                  year={f.Year}/>
        );
    })

    return (
        <div className={s.filmsWrapper}>
            {films.error && <span className={s.error}>{films.error}</span>}
            <Grid className={s.filmsContainer}
                  container
                  rowSpacing={2}
                  columnSpacing={2}
                  justifyContent={"center"}
            >
                {filmList}
            </Grid>
            <div className={s.pagesWrapper}>
                {!!films.totalResults &&
                    <Paginator totalCount={films.totalResults}
                               pageSize={10}
                               currentPage={films.currentPage}
                               getItems={getFilmsByPage}/>}
            </div>
        </div>
    )
}