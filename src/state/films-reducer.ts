import {Dispatch} from "redux";
import {api} from "../API/api";
import {appSetLoading} from "./app-reducer";
import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: InitialStateType = {
    Search: [],
    totalResults: 0,
    error: '',
    currentPage: 1,
    aboutFilm: {
        Title: '',
        Year: '',
        Rated: '',
        Released: '',
        Runtime: '',
        Genre: '',
        Director: '',
        Writer: '',
        Actors: '',
        Plot: '',
        Language: '',
        Country: '',
        Awards: '',
        Poster: '',
        Metascore: '',
        ImdbRating: '',
        ImdbVotes: '',
        ImdbID: '',
        Type: '',
        DVD: '',
        BoxOffice: '',
        Production: '',
        Website: '',
        Response: '',
        Ratings: [],
    },
    searchValue: '',
}

const slice = createSlice({
    name: 'films',
    initialState: initialState,
    reducers: {
        filmsSetData(state, action: PayloadAction<{ data: FilmsListType }>) {
            state.Search = action.payload.data.Search;
            state.totalResults = action.payload.data.totalResults;
        },
        filmsSetError(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error;
        },
        filmsSetCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage;
        },
        filmsSetFilmInfo(state, action: PayloadAction<{ filmData: AboutFilmType }>) {
            state.aboutFilm = action.payload.filmData;
        },
        filmsSetSearchValue(state, action: PayloadAction<{ searchValue: string }>) {
            state.searchValue = action.payload.searchValue;
        },
        filmsClearData(state) {
            state.Search = [];
            state.totalResults = 0;
        },
        filmsAboutClearData(state) {
            state.aboutFilm = {...initialState.aboutFilm};
        },
    }
})

export const filmsReducer = slice.reducer;

export const {
    filmsSetData,
    filmsSetError,
    filmsSetCurrentPage,
    filmsSetFilmInfo,
    filmsSetSearchValue,
    filmsClearData,
    filmsAboutClearData,
} = slice.actions;

export const getFilms = (title: string, page?: number) => async (dispatch: Dispatch) => {
    dispatch(appSetLoading({status: true}));
    try {
        const response = await api.getFilmsBySearch(title, page)
        if (response.data.Response === 'True') {
            dispatch(filmsClearData());
            dispatch(filmsSetData({data: response.data}));
        } else {
            dispatch(filmsSetError({error: response.data.Error}));
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(filmsSetError({error: e.message}));
        }
    } finally {
        dispatch(appSetLoading({status: false}));
    }
}
export const getFilmInfo = (filmId: string) => async (dispatch: Dispatch) => {
    dispatch(appSetLoading({status: true}));
    try {
        const response = await api.getAboutFilm(filmId);
        if (response.data.Response === 'True') {
            dispatch(filmsSetFilmInfo({filmData: response.data}));
        } else {
            dispatch(filmsSetError({error: response.data.Error}));
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(filmsSetError({error: e.message}));
        }
    } finally {
        dispatch(appSetLoading({status: false}));
    }
}

export type InitialStateType = {
    error: string
    currentPage: number
    aboutFilm: AboutFilmType
    Search: SearchFilmsType[]
    totalResults: number
    searchValue: string
}
export type AboutFilmType = {
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    Metascore: string,
    ImdbRating: string,
    ImdbVotes: string,
    ImdbID: string,
    Type: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: string
    Ratings: RatingsType[],
};
export type FilmsListType = {
    Search: SearchFilmsType[]
    totalResults: number
}
export type SearchFilmsType = {
    Poster: string
    Title: string
    Type: string
    Year: string
    imdbID: string
}
export type RatingsType = {
    Source: string
    Value: string
}