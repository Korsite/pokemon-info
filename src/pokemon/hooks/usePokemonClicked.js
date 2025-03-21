import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {fetchAPokemon} from "../helpers/index.js";

export const usePokemonClicked = () => {
    const [lastPokemonClicked, setLastPokemonClicked] = useState(null);
    const { state } = useLocation();
    const { pokemonId } = useParams();

    // Función reusable para manejar el cambio del Pokémon
    const updatePokemon = (pokemon) => {
        // console.log('Pokemon actualizado: ', pokemon);
        setLastPokemonClicked(pokemon);
    };
    useEffect(() => {
        if (state?.pokemon) {
            // Si existe un Pokémon en el estado, actualiza directamente
            updatePokemon(state.pokemon);
        } else if (pokemonId) {

            const fetchPokemonById = async (id) => {
                try {
                    const pokemon = await fetchAPokemon(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`);
                    console.log(pokemon)
                    updatePokemon(pokemon);
                } catch (error) {
                    console.error('Error fetching Pokémon: ', error);
                }
            };
            // Este camino es para cuando se navega directamente a la URL
            // Si no hay estado, busca por ID en la URL
            fetchPokemonById(pokemonId);
        }
    }, [state, pokemonId]);

    return {
        lastPokemonClicked,
        changeLastPokemonClicked: updatePokemon, // Renombrado para consistencia
    };
};
