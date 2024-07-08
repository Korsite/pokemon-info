import {useEffect, useReducer, useRef, useState} from "react";
import {pokemonReducer} from "../useReducer/index.js";
import {capitalizeAWord, checkIfImageIsAvailable, listOfPokemonsId, returnARandomPokemonId} from "../helpers/index.js";
import {useForm} from "./useForm.js";

const initialState = []

export const usePokemon = () => {
    const [pokemonList, dispatch] = useReducer(pokemonReducer, initialState, () => []);
    const {
        formState,
        onInputChange,
        onResetForm
    } = useForm({
        inputSearchPokemon: ''
    });
    const [isFetchingRef, setIsFetchingRef] = useState(false)
    const abortControllerRef = useRef(new AbortController());

    const fetchAPokemon = async (url, signal) => {
        try {
            const response = await fetch(url, {signal});
            return await response.json();
        } catch (error) {
            // do not log error if fetch was aborted
            if (!signal.aborted) {
                console.error('Error fetching Pokémon: ', error);
            }
        }
    }

    const addRandomPokemons = async (numberOfPokemonsToFetch) => {
        cancelPreviewRequests();

        const signal = abortControllerRef.current.signal;

        for (let i = 0; i < numberOfPokemonsToFetch; i++) {
            setIsFetchingRef(true)

            const randomPokemonId = await returnARandomPokemonId();
            const urlInput = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`;
            await fetchAPokemon(urlInput, signal)
                .then((response) => {
                    if (response) {
                        addAPokemon(response)
                    }
                })
                .catch((error) => console.error('Pokemon fetching canceled: ', error))
            ;
        }
        setIsFetchingRef(false)
    };

    const addAPokemon = async (newPokemon) => {
        dispatch({
            type: 'add',
            payload: {
                id: newPokemon.id,
                name: capitalizeAWord(newPokemon.name),
                image: checkIfImageIsAvailable(newPokemon.sprites.other['official-artwork'].front_default),
                types: newPokemon.types.map((type) => type.type.name),
                moves: newPokemon.moves,
                stats: newPokemon.stats,
                isLoading: false
            },
        });
    }


    const handleAddWithFilter = async (filter) => {
        cancelPreviewRequests();
        removeAllPokemons();

        const listOfPokemons = await listOfPokemonsId();
        const regex = new RegExp("^" + filter, "i");
        const signal = abortControllerRef.current.signal;


        for (const pokemonId of listOfPokemons) {
            setIsFetchingRef(true)

            try {
                await fetchAPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, signal)
                    .then((response) => {
                        if (response && response.name.match(regex)) {
                            addAPokemon(response);
                        }
                    })
                    .catch((error) => console.error('Pokemon fetching canceled: ', error));
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Fetch error: ', error);
                }
            }
        }
        setIsFetchingRef(false)
    };

    const removeAllPokemons = () => {
        dispatch({type: 'removeAll'});
    };

    const cancelPreviewRequests = () => {
        if (abortControllerRef.current !== null) {
            abortControllerRef.current.abort();
            console.log('Abort previous requests');
            abortControllerRef.current = new AbortController();
        }
    }

    useEffect(() => {
        if (!isFetchingRef) {
            setIsFetchingRef(true)
            addRandomPokemons(100);
        }
    }, []);


    return {
        pokemonList,
        formState,
        isFetchingRef,
        onInputChange,
        onResetForm,
        addRandomPokemons,
        removeAllPokemons,
        handleAddWithFilter,
    };
};