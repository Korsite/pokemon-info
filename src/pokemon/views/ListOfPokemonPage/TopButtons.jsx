import React, {useContext} from 'react'
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import {PokemonsContext} from "../../context/index.js";

export const TopButtons = () => {
    const {
        addRandomPokemons,
        removeAllPokemons,
        isFetchingRef,
        pokemonList,
        inputSearchPokemon
    } = useContext(PokemonsContext)
    return (
        <>
            {
                ( pokemonList.length > 0 && inputSearchPokemon === '' ) &&
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                        <Button
                            variant='outlined'
                            color='primary'
                            disabled={isFetchingRef}
                            fullWidth onClick={
                            () => addRandomPokemons(10)}
                        >
                            Add 10 pokemons
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                        <Button
                            variant='outlined' color='primary'
                            onClick={() => {
                                removeAllPokemons()
                                addRandomPokemons(100)
                            }}
                            disabled={isFetchingRef}
                            fullWidth
                        >
                            Load random pokemons
                        </Button>
                    </Grid>
                </Grid>
            }
        </>
    )
}
