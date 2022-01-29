import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {filmsReducer} from "./films-reducer";

const rootReducer = combineReducers({
    films: filmsReducer,
})
export type AppRootType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
window.store = store;