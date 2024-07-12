import {useEffect, useReducer, useRef, useState} from "react";
import {pokemonReducer} from "../useReducer/index.js";
import {
    capitalizeAWord,
    checkIfImageIsAvailable,
    listOfPokemonsId,
    returnARandomPokemonId,
    fetchAPokemon
} from "../helpers/index.js";
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

    const addRandomPokemons = async (numberOfPokemonsToFetch = 40) => {
        cancelPreviewRequests();

        const signal = abortControllerRef.current.signal;

        for (let i = 0; i < numberOfPokemonsToFetch; i++) {
            setIsFetchingRef(true)

            const randomPokemonId = await returnARandomPokemonId();
            const urlInput = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`;
            const newPokemon = await fetchAPokemon(urlInput, signal)
                    .then((response) => {
                        if (response) {
                            addAPokemon(response)
                        }
                    })
                    .catch((error) => console.error('Pokemon fetching canceled: ', error));
        }
        setIsFetchingRef(false)
    };

    /**
     * * @param newPokemon object, check {@link fetchAPokemon} for the structure
     */
    const addAPokemon = async (newPokemon) => {
        dispatch({
            type: 'add',
            payload: newPokemon,
        });
    }


    const handleAddWithFilter = async (filter) => {
        cancelPreviewRequests();
        removeAllPokemons();

        const listOfPokemons = await listOfPokemonsId();
        const regex = new RegExp("^" + filter, "i"); // case insensitive, similar to %LIKE% in SQL
        const signal = abortControllerRef.current.signal; // in case we need to cancel the fetch


        for (const pokemonId of listOfPokemons) {
            setIsFetchingRef(true)

            await fetchAPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, signal)
                .then((response) => {
                    if (response && response.name.match(regex)) {
                        addAPokemon(response);
                    }
                })
                .catch((error) => console.log('Pokemon fetching canceled: ', error));

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
            addRandomPokemons();
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