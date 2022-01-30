import React from "react";
import {AboutFilmType} from "../../../state/films-reducer";
import {useSelector} from "react-redux";
import {AppRootType} from "../../../state/store";
import { Link } from "react-router-dom";

type PropsType = {

}

export const AboutFilm = ({}: PropsType) => {
    const filmData = useSelector<AppRootType, AboutFilmType>(state => state.films.aboutFilm)

    const dataList = Object.keys(filmData).map((title, index) => {
        let value = filmData[title as keyof AboutFilmType]

        if (typeof value === 'string') {
            return <li key={index}>{title} - {value}</li>
        } else {
            const ratingList = value.map((r, i) => <li key={i}>{r.Source} - {r.Value}</li>)
            return (
                <React.Fragment key={index}>
                    <li>{title}:</li>
                    <ul>{ratingList}</ul>
                </React.Fragment>
            );
        }
    })

    return (
        <div>
            <Link to={'/'}>
                <button>Back</button>
            </Link>
            <div>
                <img src={filmData.Poster} alt="Poster"/>
            </div>
            <ul>
                {dataList}
            </ul>
        </div>
    )
}