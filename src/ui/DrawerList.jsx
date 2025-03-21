import { useContext } from 'react'
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme
} from "@mui/material";
import Box from "@mui/material/Box";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SouthAmericaOutlinedIcon from '@mui/icons-material/SouthAmericaOutlined';
import HomeIcon from '@mui/icons-material/Home';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import AbcIcon from '@mui/icons-material/Abc';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useLocation, useNavigate} from "react-router-dom";
import {ThemeContext} from "../pokemon/context/index.js";
import PropTypes from 'prop-types';

export const DrawerList = ({openDrawer, setOpenDrawer}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {toggleFont, mode, setMode } = useContext(ThemeContext);
    const theme = useTheme();
    // Extraer lógica del fontFamily a una constante
    const fontFamily = `Font ${
        theme.typography.fontFamily === '"Press Start 2P", Arial, sans-serif'
            ? 'Press Start'
            : 'Comic Sans MS'
    }`;

    // Función para cambiar el modo
    const handleToggleMode = () => {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

    // Función para generar configuración dinámica
    const generateSettings = () => [
        {
            name: fontFamily,
            icon: <AbcIcon fontSize="large"/>,
            action: toggleFont, // Directamente referencia la función
        },
        {
            name: mode === 'light' ? 'Light Mode' : 'Dark Mode',
            icon: mode === 'light' ? <LightModeIcon fontSize="large"/> : <DarkModeIcon fontSize="large"/>,
            action: handleToggleMode
        }
    ];

    // Función reutilizable para renderizar ListItems
    const renderListItems = (items, onClickHandler) =>
        items.map(option => (
            <ListItem key={option.name} disablePadding>
                <ListItemButton
                    selected={location.pathname === option.path}
                    onClick={() => {
                        if (onClickHandler) onClickHandler(option);
                    }}
                >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.name}/>
                </ListItemButton>
            </ListItem>
        ));

    const settings = generateSettings();

    return (
        <Drawer open={openDrawer} onClose={setOpenDrawer}>
            <Box sx={{width: 250}} role="presentation">
                {/* Renderiza lista principal de opciones */}
                <List>{renderListItems(options, option => navigate(option.path))}</List>
                <Divider/>
                {/* Renderiza configuraciones dinámicas */}
                <List>{renderListItems(settings, option => option.action())}</List>
            </Box>
        </Drawer>
    );
};

DrawerList.propTypes = {
    openDrawer: PropTypes.bool.isRequired,
    setOpenDrawer: PropTypes.func.isRequired
};

const options = [
    {
        name: "PokeInfo",
        icon: <HomeIcon/>,
        path: "/pokemon-info",
    },
    {
        name: "By type",
        icon: <BorderAllIcon/>,
        path: "/ByType",
    },
    {
        name: "By region",
        icon: <SouthAmericaOutlinedIcon/>,
        path: "/ByRegion",
    },
    {
        name: "By favorites",
        icon: <FavoriteOutlinedIcon/>,
        path: "/ByFavorites",
    }
];

