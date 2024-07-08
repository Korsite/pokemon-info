import {Navbar} from "../../ui/Navbar.jsx";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {DrawerList} from "../../ui/DrawerList.jsx";
import {useState} from "react";
import {ScrollTop} from "../../helpers/index.js";

export const PokemonLayout = ({ children }) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const handleOpenDrawer = () => {
        setOpenDrawer(!openDrawer)
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Navbar setOpenDrawer={ handleOpenDrawer }/>

            <Toolbar />
            <DrawerList openDrawer={openDrawer} setOpenDrawer={handleOpenDrawer}/>

            { children }

            <ScrollTop />
            {/*aqui va el footer*/}
        </Box>
    )
}
