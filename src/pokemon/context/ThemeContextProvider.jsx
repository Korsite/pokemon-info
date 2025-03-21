import {useMemo, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {fonts, PokemonTheme} from "../../theme/index.js";
import {ThemeContext} from "./AppContexts.jsx";
import PropTypes from "prop-types";

/**
 * Componente que provee el contexto de tema de la aplicación
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const ThemeContextProvider = ({ children }) => {
    const [fontSettings, setFontSettings] = useState({
        fontFamily: fonts.default,
        fontSize: 14,
    });

    // Estado para controlar el modo claro/oscuro
    const [mode, setMode] = useState('dark');

    // Crear tema dinámico basado en el modo
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            ...PokemonTheme.colorSchemes[mode].palette,
            ...PokemonTheme.customPalette
        },
        customPalette: PokemonTheme.colorSchemes[mode].customPalette, // Accede a la versión correcta
        typography: {
            ...fontSettings
        },
    }), [fontSettings, mode]);

    const toggleFont = () => {
        setFontSettings(prev =>
            prev.fontFamily === fonts.default
                ? { fontFamily: fonts.alternate, fontSize: 20 }
                : { fontFamily: fonts.default, fontSize: 14 }
        );
    };

    return (
        <ThemeContext.Provider value={{ toggleFont, mode, setMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

ThemeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}