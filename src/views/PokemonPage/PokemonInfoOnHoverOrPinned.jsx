import React, {memo, useState} from 'react'
import {Card, CardContent, CardHeader, ListItem, useTheme} from "@mui/material";
import {TypesOfPokemon} from "../../pokemon/components/index.js";
import IconButton from "@mui/material/IconButton";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import PropTypes from "prop-types";

export const PokemonInfoOnHoverOrPinned = memo(
    ({
         pokemon,
         setPinnedPokemons
     }) => {

        return (
                <Card
                    raised={false}
                    className='animate__animated animate__fadeIn'
                    key={pokemon.id}
                    sx={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <CardHeader
                        sx={{
                            padding: '0.5rem',
                            paddingRight: '1rem',
                        }}
                        action={<PinIcon pokemon={pokemon} setPinnedPokemons={setPinnedPokemons}/>}
                        subheader={pokemon.name}
                        subheaderTypographyProps={{
                            textAlign: 'center'
                        }}
                    />
                    <CardContent>
                        <TypesOfPokemon typeOfPokemon={pokemon.types}/>
                    </CardContent>
                </Card>
        )
    }
)

PokemonInfoOnHoverOrPinned.propTypes = {
    pokemon: PropTypes.object.isRequired,
    setPinnedPokemons: PropTypes.func.isRequired
}

const PinIcon = memo(
    ({
         pokemon,
         setPinnedPokemons
     }) => {
        const [pinned, setPinned] = useState(false)
        return (
            <IconButton aria-label="settings" size='medium' onClick={() => {
                setPinned(!pinned)
                if (pinned) {
                    setPinnedPokemons((prev) => prev.filter((pinnedPokemon) => pinnedPokemon.id !== pokemon.id))
                } else {
                    setPinnedPokemons((prev) => [...prev, pokemon])
                }
            }}>
                {pinned ? <PushPinIcon fontSize='medium'/> : <PushPinOutlinedIcon fontSize='medium'/>}
            </IconButton>
        )
    }
)

PinIcon.propTypes = {
    pokemon: PropTypes.object.isRequired,
    setPinnedPokemons: PropTypes.func.isRequired
}