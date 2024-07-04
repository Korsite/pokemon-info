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
    const abortControllerRef = useRef(new AbortController());

    const fetchAPokemon = async (url, signal) => {
        try {
            const response = await fetch(url, { signal });
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


    const handleAddWithFilter = async (filter) => {
        removeAllPokemons();

        // Cancelar las solicitudes anteriores si existen
        if (abortControllerRef.current !== null) {
            abortControllerRef.current.abort();
            console.log('Abort previous requests');
        }

        // Crear un nuevo AbortController para la nueva serie de solicitudes
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        const listOfPokemons = await listOfPokemonsId();
        const regex = new RegExp("^" + filter, "i");
        const signal = abortController.signal;

        console.log(abortControllerRef)
        for (const pokemonId of listOfPokemons) {

            try {
                await fetchAPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, signal)
                    .then((response) => {
                        if(response && response.name.match(regex)) {
                            addAPokemon(response);
                        }
                    })
                    .catch((error) => console.error('Pokemon fetching canceled: ', error))
                ;
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
        isFetchingRef,
        onInputChange,
        addRandomPokemons,
        removeAllPokemons,
        handleAddWithFilter,
    };
};