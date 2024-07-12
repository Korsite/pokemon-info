import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {fetchAPokemon} from "../helpers/index.js";

export const usePokemonClicked = () => {
    const [lastPokemonClicked, setLastPokemonClicked] = useState(null)
    const {state} = useLocation();
    const { pokemonId } = useParams()

    useEffect(() => {
        if(state !== null) {
            const { pokemon } = state
            setLastPokemonClicked(pokemon)
            // console.log('Pokemon clicked: ', pokemon)

        }else{
            // console.log('Pokemon searched in URL: ', pokemonId)
            const fetchAPokemonWithUrl = async () => {
                const pokemon = await fetchAPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId.toLowerCase()}`)
                setLastPokemonClicked(pokemon)
            }
            fetchAPokemonWithUrl()
        }
    }, [pokemonId]);

    const changeLastPokemonClicked = (pokemon) => {
        console.log('Pokemon clicked: ', pokemon)
        setLastPokemonClicked(pokemon)
    }

    return {
        lastPokemonClicked,
        changeLastPokemonClicked
    }
}