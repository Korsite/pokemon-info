import React, {useState, useContext, Fragment, useMemo} from 'react';
import {Grid, ImageList, ImageListItem, Skeleton} from '@mui/material';
import {usePokemon} from "../hooks/index.js";
import {PokemonInfoOnHoverOrPinned, PokemonInfoImage} from "../views/PokemonPage/index.js";
import {MediaQueryContext, PokemonsContext} from "../context/index.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {loadingGif, PokemonsNotFound} from "../assets/index.js";

// este componente se renderiza como 100 veces al iniciar la app y dejar sobre el mouse un pokemon
export const PokemonInfoPage = () => {
    const {pokemonList, addRandomPokemons, inputSearchPokemon, isFetchingRef} = useContext(PokemonsContext);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const {isLg, isMd, isSm} = useContext(MediaQueryContext);
    const [pinnedPokemons, setPinnedPokemons] = useState([]);

    const cols = useMemo(() => (
        isLg ? 8 :
            isMd ? 6 :
                isSm ? 5 : 3
    ), [isLg, isMd, isSm]);

    const imageToDisplayIfPokemonsNotFound =
        <img src={PokemonsNotFound} alt='PokemonsNotFound' width='100%' height='100%'/>

    const imageToDiplayPokemonsLoading =
        <img src={loadingGif} alt='loadingGif' width='100%' height='100%'/>

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h3' align='center'>Pokemons list</Typography>
                </Grid>

                <Grid item container justifyContent='center'>
                    <Typography variant='h6' align='center'>
                        {
                            pokemonList.length === 0 && (
                                isFetchingRef
                                    ? imageToDiplayPokemonsLoading
                                    : imageToDisplayIfPokemonsNotFound
                            )
                        }
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <ImageList cols={cols} sx={{overflow: 'visible'}}>
                        {
                            pokemonList.map((pokemon, index) => (
                                (hoveredPokemon && hoveredPokemon.id === pokemon.id) || pinnedPokemons.includes(pokemon) ? (
                                    <PokemonInfoOnHoverOrPinned
                                        key={index}
                                        pokemon={pokemon}
                                        setPinnedPokemons={setPinnedPokemons}
                                    />
                                ) : (
                                    <PokemonInfoImage
                                        key={index}
                                        setHoveredPokemon={setHoveredPokemon}
                                        pokemon={pokemon}
                                        index={index}
                                    />
                                )
                            ))
                        }
                        {isFetchingRef && <Skeleton variant="rounded" width="100%" height='100%' animation='pulse'/>}
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
