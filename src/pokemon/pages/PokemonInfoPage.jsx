import React, {useContext} from 'react'
import {PokemonsContext} from "../context/index.js";
import {Grid} from "@mui/material";
import {usePokemonClicked} from "../hooks/index.js";
import {ImageCarousel, InfoTabs} from "../views/PokemonInfoPage/index.js";

export const PokemonInfoPage = () => {
    const {lastPokemonClicked} = usePokemonClicked();

    return (
        <>
            {lastPokemonClicked && (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <ImageCarousel pokemon={{...lastPokemonClicked}}/>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <InfoTabs pokemon={lastPokemonClicked}/>
                    </Grid>
                </Grid>
            )}
        </>
    );
};