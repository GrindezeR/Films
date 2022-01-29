import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../state/store";
import {filmsSetCurrentPage, getFilm, InitialStateType} from "../../state/films-reducer";
import {Paginator} from "../../Features/Paginator/Paginator";
import notFound from '../../common/images/notFound.png';


export const Films = () => {
    const dispatch = useDispatch();
    const films = useSelector<AppRootType, InitialStateType>(state => state.films)

    const [inValue, setInValue] = useState('');
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setInValue(e.currentTarget.value);
    }
    const onSearch = () => {
        dispatch(getFilm(inValue));
    }
    const getFilms = (page: number) => {
        dispatch(getFilm(inValue, page));
        dispatch(filmsSetCurrentPage(page));
    }

    const filmList = films.Search.map((f, i) => {
        return <div key={i}>
            <img src={f.Poster !== 'N/A' ? f.Poster : notFound} alt="poster" width={'200px'}/>
            <ul>
                <li>{f.Title}</li>
                <li>{f.Type}</li>
                <li>{f.Year}</li>
                <li>{f.imdbID}</li>
            </ul>
        </div>
    })

    return (
        <div>
            <div>
                <input value={inValue} onChange={onChangeSearch} type="text"/>
                <button onClick={onSearch}>Search</button>
            </div>
            {films.error && <span style={{color: 'red'}}>{films.error}</span>}
            {filmList}
            {!!films.totalResults && <Paginator totalCount={films.totalResults}
                                                  pageSize={10}
                                                  currentPage={films.currentPage}
                                                  getItems={getFilms}/>}
        </div>
    )
}