import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {filmsReducer} from "./films-reducer";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    films: filmsReducer,
})
export type AppRootType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
window.store = store;