import React from "react";
import {FilmType} from "../../../state/films-reducer";

type PropsType = {
    filmData: FilmType
}

export const Film = ({filmData}: PropsType) => {
    const dataList = Object.keys(filmData).map((title, index) => {
        let value = filmData[title as keyof FilmType]

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
            <div>
                <img src={filmData.Poster} alt="Poster"/>
            </div>
            <ul>
                {dataList}
            </ul>
        </div>
    )
}