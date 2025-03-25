import {useState, useContext, useMemo} from "react";
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
import {useLocation, useNavigate} from "react-router-dom";
import {
    alpha, debounce,
    InputBase,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Slide,
    styled,
    useScrollTrigger
} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import {Link as RouterLink} from "react-router-dom";
// import BorderAllIcon from "@mui/icons-material/BorderAll.js";
// import SouthAmericaOutlinedIcon from "@mui/icons-material/SouthAmericaOutlined.js";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined.js";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {PokemonsContext} from "../pokemon/context/index.js";
import PropTypes from "prop-types";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import SouthAmericaOutlinedIcon from "@mui/icons-material/SouthAmericaOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

function HideOnScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const MyFacebookProfile = "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/470197228_1740917903426925_1966197865853947375_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JtQQN8wmyZsQ7kNvgHTYPf2&_nc_oc=AdgTlol-txP2QIwxaK_NLmcTNm8DCpT1RbXx0DslJ1R6h3jJU8BG1D8DgB53np3WXTjj2SjXcvs7_1eaB45B9w76&_nc_zt=23&_nc_ht=scontent-mty2-1.xx&_nc_gid=GV32fVWGgcM9AQIbk1gaYA&oh=00_AYHKcsUeiM_BtPKAtP_5qVrGQQI2zAs9YDT8OQsP_3aEyw&oe=67DE5BB4"
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

        const {
            onInputChange,
            handleAddWithFilter,
            addRandomPokemons,
            removeAllPokemons,
            inputSearchPokemon
        } = useContext(PokemonsContext)

        const [timeoutId, setTimeoutId] = useState(null);

        const debounceSearch = useMemo(() =>
                debounce((value) => {
                    if (value) {
                        handleAddWithFilter(value);
                    } else {
                        removeAllPokemons();
                        addRandomPokemons(100);
                    }
                }, 300),
            [handleAddWithFilter, removeAllPokemons, addRandomPokemons]);


        const handleSearchChange = (e) => {
            onInputChange(e);
            const value = e.target.value;
            if (value) {
                debounceSearch(value);
            } else {
                removeAllPokemons();
                addRandomPokemons(100);
                console.log('No value');
            }
        };


        return (
            <HideOnScroll>
                <AppBar position="fixed" enableColorOnDark>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>

                            <IconButton
                                size="large"
                                onClick={setOpenDrawer}
                                color="inherit"
                            >
                                <ListIcon fontSize='large'/>
                            </IconButton>


                            <Link color='inherit' to='/pokemon-info' component={RouterLink} underline='none'>
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
                            <Search sx={{maxWidth: '400px'}}>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    value={inputSearchPokemon}
                                    onChange={handleSearchChange}
                                    name="inputSearchPokemon"
                                    placeholder="Search a pokemon!"
                                    inputProps={{'aria-label': 'search'}}
                                />
                                {inputSearchPokemon && (
                                    <ClearIconWrapper>
                                        <IconButton
                                            onClick={() => handleSearchChange({
                                                target: {
                                                    value: '',
                                                    name: 'inputSearchPokemon'
                                                }
                                            })}
                                            size="small"
                                        >
                                            <ClearIcon/>
                                        </IconButton>
                                    </ClearIconWrapper>
                                )}
                            </Search>

                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar alt="G" src={MyFacebookProfile}/>
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
            </HideOnScroll>
        );
    }
Navbar.propTypes = {
    setOpenDrawer: PropTypes.func.isRequired,
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

const ClearIconWrapper = styled('div')(() => ({
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
