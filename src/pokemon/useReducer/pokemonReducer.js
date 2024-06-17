export const pokemonReducer = (initialState, action) => {
    switch (action.type) {
        case 'add':
            return [
                ...initialState,
                action.payload
            ]
    }
}