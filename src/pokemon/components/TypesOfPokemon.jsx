import React, {memo} from 'react'
import {Grid, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import {capitalizeAWord} from "../helpers/index.js";

export const TypesOfPokemon = memo(
    ({
         typeOfPokemon
     }) => {
        const theme = useTheme();
        return (
            <Grid container gap={1} justifyContent="center" alignItems="center">
                {
                    data.results.map((type, index) => {
                        return (
                            typeOfPokemon.includes(type.name) &&
                            <Grid item
                                  padding='0.5rem'
                                  key={index}
                                  sx={{
                                      backgroundColor: theme.palette.customPalette[`${type.name}Type`],
                                      borderRadius: '0.5rem',
                                  }}
                            >
                                <Typography textAlign='center'>
                                    { capitalizeAWord(type.name) }
                                </Typography>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }
)

const data = {
    "count": 18,
    "next": null,
    "previous": null,
    "results": [
        {
            "name": "normal",
            "url": "https://pokeapi.co/api/v2/type/1/"
        },
        {
            "name": "fighting",
            "url": "https://pokeapi.co/api/v2/type/2/"
        },
        {
            "name": "flying",
            "url": "https://pokeapi.co/api/v2/type/3/"
        },
        {
            "name": "poison",
            "url": "https://pokeapi.co/api/v2/type/4/"
        },
        {
            "name": "ground",
            "url": "https://pokeapi.co/api/v2/type/5/"
        },
        {
            "name": "rock",
            "url": "https://pokeapi.co/api/v2/type/6/"
        },
        {
            "name": "bug",
            "url": "https://pokeapi.co/api/v2/type/7/"
        },
        {
            "name": "ghost",
            "url": "https://pokeapi.co/api/v2/type/8/"
        },
        {
            "name": "steel",
            "url": "https://pokeapi.co/api/v2/type/9/"
        },
        {
            "name": "fire",
            "url": "https://pokeapi.co/api/v2/type/10/"
        },
        {
            "name": "water",
            "url": "https://pokeapi.co/api/v2/type/11/"
        },
        {
            "name": "grass",
            "url": "https://pokeapi.co/api/v2/type/12/"
        },
        {
            "name": "electric",
            "url": "https://pokeapi.co/api/v2/type/13/"
        },
        {
            "name": "psychic",
            "url": "https://pokeapi.co/api/v2/type/14/"
        },
        {
            "name": "ice",
            "url": "https://pokeapi.co/api/v2/type/15/"
        },
        {
            "name": "dragon",
            "url": "https://pokeapi.co/api/v2/type/16/"
        },
        {
            "name": "dark",
            "url": "https://pokeapi.co/api/v2/type/17/"
        },
        {
            "name": "fairy",
            "url": "https://pokeapi.co/api/v2/type/18/"
        }
    ]
}