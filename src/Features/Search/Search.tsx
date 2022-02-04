import React, {ChangeEvent, KeyboardEvent, useRef} from "react";
import s from './Search.module.scss';
import {
    filmsClearData,
    filmsSetCurrentPage,
    filmsSetError,
    filmsSetSearchValue,
    getFilms
} from "../../state/films-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../state/store";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SavedSearch from "@mui/icons-material/SavedSearch";
import {Link, useNavigate} from "react-router-dom";


export const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputValue = useSelector<AppRootType, string>(state => state.films.searchValue);
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(filmsSetSearchValue({searchValue: e.currentTarget.value}));
    }
    const input = useRef<HTMLInputElement>(null);
    const onSearch = () => {
        if (inputValue.trim() !== '') {
            input.current?.blur();
            dispatch(filmsClearData());
            dispatch(getFilms(inputValue));
            dispatch(filmsSetCurrentPage({currentPage: 1}))
            dispatch(filmsSetError({error: ''}));
            navigate('/');
        } else {
            dispatch(filmsSetError({error: 'Type search value!'}));
        }
    }
    const onEnterSearch = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    }
    return (
        <div className={s.searchWrapper}>
            <TextField id="standard-basic"
                       ref={input}
                       onKeyPress={onEnterSearch}
                       className={s.search}
                       label="Search Film"
                       variant="standard"
                       color={'success'}
                       value={inputValue} onChange={onChangeSearch}/>

            <IconButton size={'small'} onClick={onSearch}>
                <Link to={'/'}>
                    <SavedSearch color={'success'}/>
                </Link>
            </IconButton>
        </div>
    );
}