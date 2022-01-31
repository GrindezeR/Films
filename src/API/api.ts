import axios from "axios";
import {AboutFilmType, FilmsListType} from "../state/films-reducer";

const apiKey = '?apikey=48c63132&'
const instance = axios.create({
    baseURL: `http://www.omdbapi.com/`
})

export const api = {
    getFilmsBySearch(title: string, page?: number) {
        return instance.get<GetFilmsResponseType>(`${apiKey}s=${title}${page ? `&page=${page}` : ''}`)
    },
    getAboutFilm(filmId: string) {
        return instance.get(`${apiKey}i=${filmId}&plot=full`)
    }
}

export type GetFilmsResponseType = {
    Error: string
    Response: 'True' | 'False'
} & FilmsListType
export type AboutFilmResponseType = {
    Error: string
    Response: 'True' | 'False'
} & AboutFilmType