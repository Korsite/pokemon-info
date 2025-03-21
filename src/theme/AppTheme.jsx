import {ThemeContextProvider} from "../pokemon/context/index.js";
import PropTypes from "prop-types";
import {Experimental_CssVarsProvider} from "@mui/material";


export const AppTheme = ({children}) => {
    return (
            <ThemeContextProvider>
                {children}
            </ThemeContextProvider>

    )
}
AppTheme.propTypes = {
    children: PropTypes.node.isRequired,
};
