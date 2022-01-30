import React, {ChangeEvent, KeyboardEvent} from "react";
import s from './Search.module.scss';
import {filmsSetError, filmsSetSearchValue, getFilm} from "../../state/films-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../state/store";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SavedSearch from "@mui/icons-material/SavedSearch";
import {Link} from "react-router-dom";


export const Search = () => {
    const dispatch = useDispatch();
    const inputValue = useSelector<AppRootType, string>(state => state.films.searchValue);
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(filmsSetSearchValue(e.currentTarget.value));
    }
    const onSearch = () => {
        dispatch(getFilm(inputValue));
        // dispatch(filmsSetSearchValue(''));
        dispatch(filmsSetError(''));
    }
    const onEnterSearch = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    }
    return (
        <div className={s.searchWrapper}>
            <TextField id="standard-basic"
                       onKeyPress={onEnterSearch}
                       className={s.search}
                       label="Search film"
                       variant="standard"
                       color={'success'}
                       value={inputValue} onChange={onChangeSearch}/>

            <IconButton onClick={onSearch}>
                <Link to={'/'}>
                    <SavedSearch/>
                </Link>
            </IconButton>
        </div>
    );
}