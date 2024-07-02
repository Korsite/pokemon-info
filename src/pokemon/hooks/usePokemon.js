import {useEffect, useReducer, useRef} from "react";
import {pokemonReducer} from "../useReducer/index.js";
import {capitalizeAWord, checkIfImageIsAvailable, listOfPokemonsId, returnARandomPokemonId} from "../helpers/index.js";
import {useForm} from "./useForm.js";

const initialState = []

export const usePokemon = () => {
    const [pokemonList, dispatch] = useReducer(pokemonReducer, initialState);
    const {
        formState,
        onInputChange,
        onResetForm
    } = useForm({
        inputSearchPokemon: ''
    });
    const isFetchingRef = useRef(false);

    const fetchAPokemon = async (url) => {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching Pokémon: ', error);
        }
    }

    const addRandomPokemons = async (numberOfPokemonsToFetch) => {
        for (let i = 0; i < numberOfPokemonsToFetch; i++) {
            const randomPokemonId = await returnARandomPokemonId();
            const urlInput = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`;
            const newPokemon = await fetchAPokemon(urlInput);
            await addAPokemon(newPokemon);
        }
    };

    const addAPokemon = async (newPokemon) => {
        dispatch({
            type: 'add',
            payload: {
                id: newPokemon.id,
                name: capitalizeAWord(newPokemon.name),
                image: checkIfImageIsAvailable(newPokemon.sprites.front_default),
                types: newPokemon.types.map((type) => type.type.name),
                isLoading: true
            },
        });
        await new Promise(resolve => setTimeout(resolve , 100));
        dispatch({type: 'loaded', payload: newPokemon.id});
    }

    const handleAddWithFilter = async (filter, abortController) => {
        removeAllPokemons();
        const listOfPokemons = await listOfPokemonsId();
        const regex = new RegExp("^" + filter, "i");

        for (const pokemonId of listOfPokemons) {
            try {
                const fetchPokemon = await fetchAPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, { signal: abortController.signal });
                if (fetchPokemon.name.match(regex)) {
                    console.log(fetchPokemon.name, " match with ", filter, " ", fetchPokemon.name.match(regex));
                    addAPokemon(fetchPokemon);
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Fetch error: ', error);
                }
            }
        }
    };

    const removeAllPokemons = () => {
        dispatch({type: 'removeAll'});
    };

    useEffect(() => {
        if (!isFetchingRef.current) {
            isFetchingRef.current = true;
            addRandomPokemons(25);
        }
    }, []);

    return {
        pokemonList,
        formState,
        onInputChange,
        addRandomPokemons,
        removeAllPokemons,
        handleAddWithFilter,
    };
};