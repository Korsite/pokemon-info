import React from 'react'
import {fireEvent, render} from "@testing-library/react";
import {PokemonInfoOnHoverOrPinned} from "../../../src/views/PokemonPage/index.js";
import {AppTheme} from "../../../src/theme/index.js";

describe('Tests in <PokemonInfoOnHoverOrPinned', () => {
    test('should call function to add the pokemon to the list of pokemons pinned', () => {
        const setPinnedPokemons = jest.fn()
        const pokemon = {
            id: 1,
            name: 'bulbasaur',
            types: ['grass', 'poison']
        }
        const { container } = render(
            <AppTheme>
                <PokemonInfoOnHoverOrPinned pokemon={pokemon} setPinnedPokemons={setPinnedPokemons} />
            </AppTheme>
        )
        const buttonToPinPokemon = container.querySelector('button')
        fireEvent.click(buttonToPinPokemon)
        expect(setPinnedPokemons).toHaveBeenCalled()

        const updateFunction = setPinnedPokemons.mock.calls[0][0]

        const alreadyPokemonsPinned = [{id: 2, name: 'ivysaur', types: ['grass', 'poison']}]
        const newPokemonsPinned = updateFunction(alreadyPokemonsPinned)
        expect(newPokemonsPinned).toEqual([...alreadyPokemonsPinned, pokemon])
    })

    test('should call function to remove pokemon to the list of pokemons pinned', () => {
        const setPinnedPokemons = jest.fn()
        const pokemon = {
            id: 1,
            name: 'bulbasaur',
            types: ['grass', 'poison']
        }
        const { container } = render(
            <AppTheme>
                <PokemonInfoOnHoverOrPinned pokemon={pokemon} setPinnedPokemons={setPinnedPokemons} />
            </AppTheme>
        )
        const buttonToPinPokemon = container.querySelector('button')
        fireEvent.click(buttonToPinPokemon) // pin the pokemon
        fireEvent.click(buttonToPinPokemon) // unpin the pokemon
        expect(setPinnedPokemons).toHaveBeenCalled()

        const updateFunction = setPinnedPokemons.mock.calls[0][0]

        console.log(updateFunction)
    })

})
