import React from 'react'
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ListOfPokemonPage} from "../../../src/pokemon/pages/ListOfPokemonPage.jsx";
import {usePokemon} from "../../../src/pokemon/hooks/index.js";
import {MediaQueryProvider} from "../../../src/pokemon/context/index.js";
jest.mock('../../../src/pokemon/hooks/usePokemon.js')

describe('Tests in <ListOfPokemonPage />', () => {
    test('Should call function to add 10 pokemons', async () => {
        const handleAdd = jest.fn()
        const mockPokemonList = [{
            id: 1,
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/'
        }];

        usePokemon.mockReturnValue({
            pokemonList: mockPokemonList,
            handleAdd
        })

        render(
            <MediaQueryProvider>
                <ListOfPokemonPage />
            </MediaQueryProvider>
        )

        const buttonToDisplayMorePokemons = screen.getByRole('button', {name: 'testButton'})
        fireEvent.click(buttonToDisplayMorePokemons)
        expect(handleAdd).toHaveBeenCalledWith(10)


    })
});