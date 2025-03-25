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

        const signal = abortControllerRef.current.signal;
        const regex = new RegExp("^" + filter, "i");

        // 1. Obtener todos los IDs de pokemons
        const allPokemonIds = await listOfPokemonsId();

        // 2. Dividir en chunks para procesamiento paralelo
        const CHUNK_SIZE = 5; // Ajustar según rendimiento
        const chunkedIds = chunkArray(allPokemonIds, CHUNK_SIZE);

        setIsFetchingRef(true);

        try {
            // 3. Procesar chunks en secuencia, con requests en paralelo dentro de cada chunk
            for (const chunk of chunkedIds) {
                if (signal.aborted) break;

                const promises = chunk.map(pokemonId =>
                    fetchAPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, signal)
                        .then(response => {
                            if (response?.name.match(regex)) {
                                addAPokemon(response);
                            }
                            return null;
                        })
                        .catch(error => {
                            if (!error.message.includes('aborted')) {
                                console.error('Fetch error:', error);
                            }
                            return null;
                        })
                );

                await Promise.all(promises);
            }
        } catch (error) {
            if (!signal.aborted) {
                console.error('Error general:', error);
            }
        } finally {
            setIsFetchingRef(false);
        }
    };

    // Helper para dividir el array en chunks
    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
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