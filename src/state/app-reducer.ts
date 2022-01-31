const initialState: InitialStateType = {
    isLoading: false
}
export const appReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "APP/SET-LOADING":
            return {...state, isLoading: action.status}
        default:
            return state
    }
}

export const appSetLoading = (status: boolean) => {
    return {type: 'APP/SET-LOADING', status} as const
}

type ActionsType = ReturnType<typeof appSetLoading>
type InitialStateType = {
    isLoading: boolean
}