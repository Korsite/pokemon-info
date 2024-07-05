import React from "react";
import {ThemeContextProvider} from "../pokemon/context/index.js";

export const AppTheme = ({ children }) => {
    return (
        <ThemeContextProvider>
            { children }
        </ThemeContextProvider>
    )
}