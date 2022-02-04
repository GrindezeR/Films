import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {filmsReducer} from "./films-reducer";
import {appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    app: appReducer,
    films: filmsReducer,
})
export type AppRootType = ReturnType<typeof rootReducer>;
// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})
// @ts-ignore
window.store = store;