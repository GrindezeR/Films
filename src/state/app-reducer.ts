import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        appSetLoading(state, action: PayloadAction<{ status: boolean }>) {
            state.isLoading = action.payload.status;
        }
    }
})

export const appReducer = slice.reducer;
export const {appSetLoading} = slice.actions;
// export const appSetLoading = (status: boolean) => {
//     return {type: 'APP/SET-LOADING', status} as const
// }

// type InitialStateType = {
//     isLoading: boolean
// }