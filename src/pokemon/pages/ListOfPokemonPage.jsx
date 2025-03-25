import {useState, useContext, useMemo} from 'react';
import {ImageList, Skeleton} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    PokemonInfoOnHoverOrPinned,
    PokemonInfoImage,
    TopButtons,
    AddPokemons
} from "../views/ListOfPokemonPage/index.js";
import {MediaQueryContext, PokemonsContext} from "../context/index.js";
import Typography from "@mui/material/Typography";
import {PokemonsNotFound} from "../assets/index.js";

// este componente se renderiza como 100 veces al iniciar la app y dejar sobre el mouse un pokemon
export const ListOfPokemonPage = () => {
    const {pokemonList, inputSearchPokemon, isFetchingRef} = useContext(PokemonsContext);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const {isXl, isLg, isMd, isSm} = useContext(MediaQueryContext);
    const [pinnedPokemons, setPinnedPokemons] = useState([]);

    const cols = useMemo(() => (
        isXl ? 7
            : isLg ? 6
                : isMd ? 5
                    : isSm ? 3
                        : 2
    ), [isXl, isLg, isMd, isSm]);

    const imageToDisplayIfPokemonsNotFound =
        <img src={PokemonsNotFound} alt='PokemonsNotFound' width='100%' height='100%'/>

    const imageToDiplayPokemonsLoading =
        <iframe src="https://giphy.com/embed/8lQyyys3SGBoUUxrUp"
                style={{border: 'none', width: '100%', height: '100%', pointerEvents: 'none'}}
                className="giphy-embed">
        </iframe>

    return (
        <>
            <Grid container>
                <Grid size={12}  id='back-to-top-anchor' sx={{ mt: 3, mb: 3}}>
                    <Typography variant='h3' align='center'>Pokemons list</Typography>
                </Grid>

                <Grid justifyContent='center'>
                    {
                        pokemonList.length === 0
                            ? (
                                isFetchingRef
                                    ? imageToDiplayPokemonsLoading
                                    : imageToDisplayIfPokemonsNotFound
                            )
                            : isFetchingRef &&
                            <Typography>Might take up to 1 minute, thank you for your patience!</Typography>
                    }
                </Grid>

                <Grid size={12} sx={{ mt: 1, mb: 1}}>
                    <TopButtons/>
                </Grid>

                <Grid size={12}>
                    <ImageList cols={cols} sx={{overflow: 'hidden'}}>
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
                            <AddPokemons />
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
};