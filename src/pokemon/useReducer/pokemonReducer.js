export const pokemonReducer = (state, action) => {
    switch (action.type) {
        case 'add': return [...state, action.payload];
        case 'removeAll':
            return [];
        default:
            return state;
    }
};