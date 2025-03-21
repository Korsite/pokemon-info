import {memo} from 'react'
import {Card, CardActionArea, CardContent, CardHeader, Grid}from "@mui/material";
import {StatsOfPokemon, TypesOfPokemon} from "../../components/index.js";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

export const PokemonInfoOnHoverOrPinned = memo(
    ({pokemon}) => {
        const navigate = useNavigate();

        const goToPokemonPage = () => {
            navigate(`/pokemon-info/${pokemon.name}`, { state: { pokemon } });
        };
        return (
            <Card
                raised={false}
                className='animate__animated animate__fadeIn'
                key={pokemon.id}
            >
                <CardActionArea
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Alinea el contenido al inicio
                        justifyContent: 'flex-start', // Alinea el contenido al inicio
                        overflow: 'visible',
                    }}
                    onClick={ goToPokemonPage }
                >
                    <CardHeader
                        sx={{
                            padding: '0.5rem',
                            paddingRight: '1rem',
                        }}
                        title={pokemon.name}
                        titleTypographyProps={{
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    />
                    <CardContent sx={{padding: 0.5}}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TypesOfPokemon typeOfPokemon={pokemon.types}/>
                            </Grid>
                            {
                                pokemon.moves.length > 0 &&
                                <Grid item xs={12}>
                                    <Typography textAlign="center">
                                        Able to learn {pokemon.moves.length} {pokemon.moves.length > 1 ? 'moves' : 'move'}
                                    </Typography>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <StatsOfPokemon stats={pokemon.stats}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
);
PokemonInfoOnHoverOrPinned.displayName = 'PokemonInfoOnHoverOrPinned';
PokemonInfoOnHoverOrPinned.propTypes = {
    pokemon: PropTypes.object.isRequired,
    setPinnedPokemons: PropTypes.func.isRequired
}
