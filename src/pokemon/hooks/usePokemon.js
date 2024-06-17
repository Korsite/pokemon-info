import {useEffect, useReducer, useRef} from "react";
import {pokemonReducer} from "../useReducer/index.js";
import {useFetch} from "../../hooks/useFetch.js";
import {capitalizeAWord} from "../helpers/index.js";

const initialState = []

export const usePokemon = () => {
    const [pokemonList, dispatch] = useReducer(pokemonReducer, initialState);
    const isFetchingRef = useRef(false); // Añadir un ref para controlar la ejecución

    const handleAdd = async (numberOfPokemonsToFetch) => {
        for (let i = pokemonList.length + 1; i <= pokemonList.length + numberOfPokemonsToFetch; i++) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const data = await response.json();

                dispatch({
                    type: 'add',
                    payload: {
                        id: data.id ,
                        name: capitalizeAWord(data.name),
                        image: data.sprites.front_default,
                        types: data.types.map((type) => type.type.name)
                    }
                });
            } catch (error) {
                console.error('Error fetching Pokémon: ', error);
            }
        }
    };

    useEffect(() => {
        if (!isFetchingRef.current) { // Verificar si ya se está realizando la petición
            isFetchingRef.current = true;
            handleAdd(50);
        }
    }, [handleAdd]); // Dependencias vacías para ejecutar solo en el montaje

    return {
        pokemonList: pokemonList,
        pokemonCount: pokemonList.length,
        isFetchingRef,
        handleAdd
    };
};