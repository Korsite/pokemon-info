import React from 'react'
import {usePokemon} from "../hooks/index.js";
import {PokemonsContext} from "./index.js";
import PropTypes from "prop-types";

export const PokemonsProvider = ({children}) => {
    const {
        pokemonList,
        formState,
        onInputChange,
        addRandomPokemons,
        removeAllPokemons,
        handleAddWithFilter
    } = usePokemon()
    return (
        <PokemonsContext.Provider value={{
            pokemonList,
            ...formState,
            formState,
            onInputChange,
            addRandomPokemons,
            removeAllPokemons,
            handleAddWithFilter
        }}>
            {children}
        </PokemonsContext.Provider>
    )
}

PokemonsProvider.propTypes = {
    children: PropTypes.node.isRequired
}