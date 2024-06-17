import {Navbar} from "../components/Navbar.jsx";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export const PokemonLayout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Navbar />

            <Toolbar />

            { children }

            {/*aqui va el footer*/}
        </Box>
    )
}
