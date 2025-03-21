import {Navbar} from "../../ui/Navbar.jsx";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {DrawerList} from "../../ui/DrawerList.jsx";
import {useState} from "react";
import {ScrollTop} from "../../helpers/index.js";
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import {CssBaseline} from "@mui/material";

export const PokemonLayout = ({children}) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const handleOpenDrawer = () => {
        setOpenDrawer(!openDrawer)
    }
    return (
        <Box
              sx={{
                  bgcolor: 'background.default',
                  display: 'flex'
              }}
        >
            <CssBaseline />

            <Navbar setOpenDrawer={handleOpenDrawer}/>
            <DrawerList openDrawer={openDrawer} setOpenDrawer={handleOpenDrawer}/>


            <Box sx={{ mt: 8, padding: 1.5, width: '100%'}}>
                {children}
            </Box>

            <ScrollTop/>
            {/*aqui va el footer*/}
        </Box>
    )
}

PokemonLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
