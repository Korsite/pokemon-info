import React from 'react'
import {usePokemon, usePokemonClicked} from "../hooks/index.js";
import {PokemonsContext} from "./index.js";
import PropTypes from "prop-types";

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
        pokemonCLickedRef
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