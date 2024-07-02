export const pokemonReducer = (state, action) => {
    switch (action.type) {
        case 'loaded':
            return state.map(pokemon =>
                pokemon.id === action.payload ? {...pokemon, isLoading: false} : pokemon
            );
        case 'add':
            return [...state, {...action.payload}];
        case 'removeAll':
            return [];
        default:
            return state;
    }
};