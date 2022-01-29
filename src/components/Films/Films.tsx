import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../state/store";
import {FilmType} from "../state/films-reducer";

type PropsType = {}

export const Films = ({}: PropsType) => {
    const dispatch = useDispatch();
    const films = useSelector<AppRootType, FilmType[]>(state => state.films);

    return (
        <div>
            <div>
                <input type="text"/>
                <button>Search</button>
            </div>
            <div>
                <div>Data</div>
            </div>
        </div>
    )
}