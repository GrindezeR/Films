import {Dispatch} from "redux";
import {api} from "../API/api";
import {appSetLoading} from "./app-reducer";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";


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

export const filmsReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "FILMS/SET-DATA":
            return {...state, ...action.data, totalResults: Number(action.data.totalResults)}
        case "FILMS/SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "FILMS/SET-ERROR":
            return {...state, error: action.error, Search: [], totalResults: 0}
        case "FILMS/SET-FILM-INFO":
            return {...state, aboutFilm: action.filmData}
        case "FILMS/SET-SEARCH-VALUE":
            return {...state, searchValue: action.searchValue}
        default:
            return state;
    }
}


type ActionsType = ReturnType<typeof filmsSetData>
    | ReturnType<typeof filmsSetError>
    | ReturnType<typeof filmsSetCurrentPage>
    | ReturnType<typeof filmsSetFilmInfo>
    | ReturnType<typeof filmsSetSearchValue>

export const filmsSetData = (data: FilmsListType) => ({type: 'FILMS/SET-DATA', data} as const)
export const filmsSetError = (error: string) => ({type: 'FILMS/SET-ERROR', error} as const)
export const filmsSetCurrentPage = (currentPage: number) => {
    return {type: 'FILMS/SET-CURRENT-PAGE', currentPage} as const
}
export const filmsSetFilmInfo = (filmData: AboutFilmType) => {
    return {type: 'FILMS/SET-FILM-INFO', filmData} as const
}
export const filmsSetSearchValue = (searchValue: string) => {
    return {type: 'FILMS/SET-SEARCH-VALUE', searchValue} as const
}

export const getFilms = (title: string, page?: number) => async (dispatch: Dispatch) => {
    dispatch(appSetLoading(true));
    try {
        const response = await api.getFilmsBySearch(title, page)
        if (response.data.Response === 'True') {
            dispatch(filmsSetData(response.data));
        } else {
            dispatch(filmsSetError(response.data.Error));
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(filmsSetError(e.message));
        }
    } finally {
        dispatch(appSetLoading(false));
    }
}
export const getFilmInfo = (filmId: string) => async (dispatch: Dispatch) => {
    dispatch(appSetLoading(true));
    try {
        const response = await api.getAboutFilm(filmId);
        if (response.data.Response === 'True') {
            dispatch(filmsSetFilmInfo(response.data));
        } else {
            dispatch(filmsSetError(response.data.Error));
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(filmsSetError(e.message));
        }
    } finally {
        dispatch(appSetLoading(false));
    }
}

export type InitialStateType = {
    error: string
    currentPage: number
    aboutFilm: AboutFilmType
    Search: searchFilmsType[]
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
    Search: searchFilmsType[]
    totalResults: number
}
export type searchFilmsType = {
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