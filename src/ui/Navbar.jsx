import * as React from 'react';
import {useState, useContext} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TuneIcon from '@mui/icons-material/Tune';
import {useLocation, useNavigate} from "react-router-dom";
import {alpha, InputBase, Link, List, ListItem, ListItemButton, ListItemText, styled} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import BorderAllIcon from "@mui/icons-material/BorderAll.js";
import SouthAmericaOutlinedIcon from "@mui/icons-material/SouthAmericaOutlined.js";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined.js";
import SearchIcon from '@mui/icons-material/Search';
import {usePokemon} from "../pokemon/hooks/index.js";
import {PokemonsContext} from "../pokemon/context/index.js";

const pages = ['By type', 'By region', 'Favorites'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Navbar =
    ({
         setOpenDrawer
     }) => {
        const [anchorElUser, setAnchorElUser] = useState(null);
        const navigate = useNavigate();
        const location = useLocation();
        const handleOpenUserMenu = (event) => {
            setAnchorElUser(event.currentTarget);
        };

        const handleCloseUserMenu = () => {
            setAnchorElUser(null);
        };

        const {onInputChange, handleAddWithFilter, addRandomPokemons, removeAllPokemons} = useContext(PokemonsContext)

        const [timeoutId, setTimeoutId] = useState(null);

        const debounceSearch = (value) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const newAbortController = new AbortController();

            const id = setTimeout(() => {
                handleAddWithFilter(value);
                setTimeoutId(null); // Limpiar el timeoutId después de ejecutar handleAddWithFilter
            }, 500);
            setTimeoutId(id); // Actualizar el timeoutId con el nuevo id
        };

        const handleSearchChange = (e) => {
            onInputChange(e);
            const value = e.target.value;
            if (value) {
                debounceSearch(value);
            } else {
                removeAllPokemons();
                addRandomPokemons(25);
                console.log('No value');
            }
        };



        return (
            <AppBar position="fixed" enableColorOnDark>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        <IconButton
                            size="large"
                            onClick={setOpenDrawer}
                            color="inherit"
                        >
                            <TuneIcon fontSize='large'/>
                        </IconButton>


                        <Link color='inherit' to='/PokemonInfo' component={RouterLink} underline='none'>
                            <Typography
                                variant="h4"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                PokeInfo
                            </Typography>
                        </Link>

                        <List sx={{display: {xs: 'none', md: 'flex'}}}>
                            {
                                options.map(option => (
                                    <ListItem key={option.name} disablePadding>
                                        <ListItemButton
                                            selected={location.pathname === option.path}
                                            onClick={() => {
                                                navigate(option.path)
                                            }}
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            <ListItemText primary={option.name}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>

                        <Box sx={{flexGrow: 1}}/>

                        <Search
                            sx={{
                                maxWidth: '400px',
                            }}
                            onInput={handleSearchChange}>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                name="inputSearchPokemon"
                                placeholder="Search a pokemon!"
                                inputProps={{'aria-label': 'search'}}
                            />
                        </Search>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }

const options = [
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

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));