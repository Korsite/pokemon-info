import React, {memo, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {ImageListItem, ImageListItemBar, IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Typography from "@mui/material/Typography";
import {ImageNotFound} from "../../pokemon/assets/index.js";

export const PokemonInfoImage = memo(
    ({
         pokemon,
         setHoveredPokemon,
         index
     }) => {

        const timerRef = useRef(null);

        const handleMouseEnter = useCallback((event) => {
            event.target.style.transform = 'scale(1.1)';
            timerRef.current = setTimeout(() => {
                setHoveredPokemon(pokemon);
            }, 150);
        }, [pokemon, setHoveredPokemon]);

        const handleMouseLeave = useCallback((event) => {
            event.target.style.transform = 'scale(1)';
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            setHoveredPokemon(null);
        }, [setHoveredPokemon]);


        return (
            <ImageListItem
                className='animate__animated animate__fadeIn'
                key={pokemon.id}
                sx={{backgroundColor: 'gray'}}
            >
                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    loading='lazy'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transition: 'transform 0.3s ease',
                    }}

                />
                <ImageListItemBar
                    subtitle={<Typography sx={{fontSize: '0.9rem'}}> {index + 1} {pokemon.name} </Typography>}
                    actionIcon={
                        <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}>
                            <InfoIcon/>
                        </IconButton>
                    }
                    sx={{}}
                />
            </ImageListItem>
        );
    });

PokemonInfoImage.propTypes = {
    pokemon: PropTypes.object.isRequired,
    setHoveredPokemon: PropTypes.func.isRequired
};

