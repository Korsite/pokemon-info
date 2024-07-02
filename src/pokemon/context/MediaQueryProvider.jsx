import React from "react";
import {MediaQueryContext} from "./index.js";
import {useMediaQuery, useTheme} from "@mui/material";
import PropTypes from "prop-types";

export const MediaQueryProvider = ({children}) => {
    const theme = useTheme();
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));
    const isXs = useMediaQuery(theme.breakpoints.up('xs'));

    return (
        <MediaQueryContext.Provider value={
            {
                isXl,
                isLg,
                isMd,
                isSm,
                isXs
            }
        }>
            {children}
        </MediaQueryContext.Provider>
    )
}

MediaQueryProvider.propTypes = {
    children: PropTypes.node.isRequired
}