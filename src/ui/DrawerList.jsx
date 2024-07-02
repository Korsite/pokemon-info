import React from 'react'
import {Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SouthAmericaOutlinedIcon from '@mui/icons-material/SouthAmericaOutlined';
import HomeIcon from '@mui/icons-material/Home';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import {useLocation, useNavigate} from "react-router-dom";

export const DrawerList =
    ({
         openDrawer,
         setOpenDrawer
     }) => {
        const navigate = useNavigate()
        const location = useLocation()

        const DrawerList = (
            <Box sx={{width: 250}} role="presentation">
                <List>
                    {
                        options.map (option => (
                            <ListItem key={option.name} disablePadding>
                                <ListItemButton
                                    selected={ location.pathname === option.path }
                                    onClick={() => {
                                        setOpenDrawer()
                                        navigate(option.path)
                                    }}
                                >
                                    <ListItemIcon sx={{  }}>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={option.name}/>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
                <Divider/>

            </Box>
        );

        return (
            <div>
                <Drawer open={openDrawer} onClose={setOpenDrawer}>
                    {DrawerList}
                </Drawer>
            </div>
        )
    }

const options = [
    {
        name: "PokeInfo",
        icon: <HomeIcon />,
        path: "/PokemonInfo",
    },
    {
        name: "By type",
        icon: <BorderAllIcon />,
        path: "/ByType",
    },
    {
        name: "By region",
        icon: <SouthAmericaOutlinedIcon />,
        path: "/ByRegion",
    },
    {
        name: "By favorites",
        icon: <FavoriteOutlinedIcon />,
        path: "/ByFavorites",
    }
];
