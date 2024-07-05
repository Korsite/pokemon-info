import React, { useMemo, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {fonts, PokemonTheme} from "../../theme/index.js";
import {ThemeContext} from "./AppContexts.jsx";

export const ThemeContextProvider = ({children}) => {
    const [fontSettings, setFontSettings] = useState({
        fontFamily: fonts.default,
        fontSize: 14, // MUI default font size
    });

    const theme = useMemo(() => createTheme({
        ...PokemonTheme,
        typography: {
            ...fontSettings
        },
    }), [fontSettings]);

    const toggleFont = () => {
        console.log('i am working')
        setFontSettings((prevFont) =>
            prevFont.fontFamily === fonts.default
                ?
                {
                    fontFamily: fonts.alternate,
                    fontSize: 20,
                }
                :
                {
                    fontFamily: fonts.default,
                    fontSize: 14, // MUI default font size
                }
        );
    };

    return (
        <ThemeContext.Provider value={{toggleFont}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};