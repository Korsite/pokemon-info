import React, {useState, useContext, Fragment, useMemo} from 'react';
import {Grid, ImageList, Skeleton} from '@mui/material';
import {usePokemon} from "../hooks/index.js";
import {PokemonInfoOnHoverOrPinned, PokemonInfoImage} from "../../views/PokemonPage/index.js";
import {MediaQueryContext, PokemonsContext} from "../context/index.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// este componente se renderiza como 100 veces al iniciar la app y dejar sobre el mouse un pokemon
export const PokemonInfoPage = () => {
    const {pokemonList, addRandomPokemons, inputSearchPokemon, isFetchingRef} = useContext(PokemonsContext);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const {isLg, isMd, isSm} = useContext(MediaQueryContext);
    const [pinnedPokemons, setPinnedPokemons] = useState([]);

    const cols = useMemo(() => (
        isLg ? 8 :
            isMd ? 6 :
                isSm ? 5 : 2
    ), [isLg, isMd, isSm]);
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h3' align='center'>Pokemons list</Typography>
                </Grid>

                <Grid item xs={12}>
                    <ImageList cols={cols} sx={{overflow: 'visible'}}>
                        {
                            pokemonList.map((pokemon, index) => (
                                <Fragment key={pokemon.id}>
                                    {
                                        pokemon.isLoading ? (
                                            <Skeleton variant="rectangular" width="100%" height="100%"
                                                      animation='pulse'/>
                                        ) : (
                                            (hoveredPokemon && hoveredPokemon.id === pokemon.id)
                                            || pinnedPokemons.includes(pokemon) ? (
                                                <PokemonInfoOnHoverOrPinned
                                                    pokemon={pokemon}
                                                    setPinnedPokemons={setPinnedPokemons}
                                                />
                                            ) : (
                                                <PokemonInfoImage
                                                    setHoveredPokemon={setHoveredPokemon}
                                                    pokemon={pokemon}
                                                    index={index}
                                                />
                                            )
                                        )
                                    }
                                </Fragment>
                            ))
                        }
                    </ImageList>
                </Grid>

                {
                    inputSearchPokemon === '' && (
                        <Grid container justifyContent="center">
                            <Button aria-label='testButton' variant='contained' onClick={() => addRandomPokemons(10)}>
                                Add 10 Pokémon
                            </Button>
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
};
