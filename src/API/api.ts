import axios from "axios";

const apiKey = '?apikey=48c63132&'
const instance = axios.create({
    baseURL: `http://www.omdbapi.com/`
})

export const api = {
    searchFilm(title: string, page?: number) {
        return instance.get(`${apiKey}s=${title}&plot=full${page ? `&page=${page}` : ''}`)
    }
}
