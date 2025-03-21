import React from 'react'
import {PokemonsContext} from "./index.js";
import PropTypes from "prop-types";
import {usePokemon} from "../hooks/index.js";

export const PokemonHooksProvider = ({children}) => {
    const {
        pokemonList,
        formState,
        isFetchingRef,
        onInputChange,
        onResetForm,
        addRandomPokemons,
        removeAllPokemons,
        handleAddWithFilter,
    } = usePokemon()

    return (
        <PokemonsContext.Provider value={{
            pokemonList,
            ...formState,
            isFetchingRef,
            formState,
            onInputChange,
            onResetForm,
            addRandomPokemons,
            removeAllPokemons,
            handleAddWithFilter,

        }}>
            {children}
        </PokemonsContext.Provider>
    )
}

PokemonHooksProvider.propTypes = {
    children: PropTypes.node.isRequired
}