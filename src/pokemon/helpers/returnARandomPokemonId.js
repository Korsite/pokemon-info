
const pokemonsIdsUsed = [];
let cachedPokemons = [];

/**
 * Returns a list of numbers to fetch pokemons from the API
 * @returns {Promise<*>}
 */
export const listOfPokemonsId = async () => {
    if(cachedPokemons.length === 0){
        const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000")
        const response = await data.json();
        cachedPokemons = response.results.map(pokemon => getIdFromUrl(pokemon.url));
    }
    return cachedPokemons;
}

/*
 * https://pokeapi.co/api/v2/pokemon?limit=100000
 * The id of pokemon matches with the array index until pokemon/1025 (which index in array is 1024)
 * because to fetch next pokemon, the request must be like pokemon/10001 (which index in array is 1025)
 * that breaks completely the dependency logic of the id with the index in the array,
 * to fix that, the function  was created to extract the id from the url
 */
/**
 * Split urls like https://pokeapi.co/api/v2/pokemon/90, to return only the id, in this case 90
 * @param url
 * @returns {string}
 */
const getIdFromUrl = (url) => {
    const urlParts = new URL(url).pathname.split('/').filter(part => part);
    return urlParts[3];
};

export const returnARandomPokemonId = async () => {
    const totalPokemons = await listOfPokemonsId();

    if(pokemonsIdsUsed.length === totalPokemons.length){
        return 0 // if all pokemons are used
    }

    let randomPokemonId;
    do {
        randomPokemonId = totalPokemons[Math.floor(Math.random() * totalPokemons.length)];
    } while (pokemonsIdsUsed.includes(randomPokemonId));

    pokemonsIdsUsed.push(randomPokemonId);
    return randomPokemonId;
}
