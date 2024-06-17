import React from "react";
import {PokemonTheme} from "./PokemonTheme.js";
import {ThemeProvider} from "@mui/material";

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={ PokemonTheme }>
            { children }
        </ThemeProvider>
    )
}