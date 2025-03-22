import {useState} from 'react';
import {Box, Typography, IconButton, useTheme} from '@mui/material';
import {ArrowForwardIos} from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {useImageCarousel} from "../../hooks/index.js";

export const ImageCarousel = ({pokemon}) => {
    const {name, types, imagesTest} = pokemon;
    const theme = useTheme();

    const {
        hasValidImages,
        imagesOfPokemon,
        index,
        nextIndex,
        previousIndex,
        handleOpenImages,
        lenghtOfImages
    } = useImageCarousel({imagesTest});

    const colorOfBackgroundBasedOnType = theme.customPalette[`${types?.[0]}Type`] || theme.palette.background.default;

    const renderDots = () => {
        if (lenghtOfImages === 0) return null;

        return [...Array(lenghtOfImages).keys()].map((_, indexDot) => (
            <Box
                key={indexDot}
                sx={{
                    height: 10,
                    width: 10,
                    borderRadius: '50%',
                    backgroundColor: indexDot === index
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                    margin: 1
                }}
            />
        ));
    };

    if (!hasValidImages) {
        return (
            <Box sx={{
                backgroundColor: colorOfBackgroundBasedOnType,
                borderRadius: "2%",
                padding: 3,
                textAlign: 'center'
            }}>
                <Typography variant="h6">No hay imágenes disponibles</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            backgroundColor: colorOfBackgroundBasedOnType,
            position: 'relative',
            borderRadius: "2%",
            padding: 1,
        }}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography sx={{flexGrow: 1, textAlign: 'center'}} variant="h6">
                    {name} ({imagesOfPokemon.flatImages[index]?.type || 'imagen'})
                </Typography>
                <NestedMenu
                    listOfPokemonImages={imagesTest}
                    handleOpenImages={handleOpenImages}
                    selectedGeneration={imagesOfPokemon.generationName}
                    selectedVersion={imagesOfPokemon.versionName}
                />
            </Box>


            <Box>
                <Typography sx={{textAlign: 'center'}} variant="h6">
                    {imagesOfPokemon.generationName}
                </Typography>
                <Typography sx={{textAlign: 'center'}} variant="subtitle1">
                    {imagesOfPokemon.versionName}
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                minHeight: 200
            }}>
                <IconButton
                    color="primary"
                    onClick={previousIndex}
                    size="large"
                    sx={{position: 'absolute', left: 0, ml: 1}}
                    disabled={lenghtOfImages <= 1}
                >
                    <ArrowBackIosNewIcon fontSize='inherit'/>
                </IconButton>

                <img
                    src={imagesOfPokemon.flatImages[index]?.url || ''}
                    alt="Pokemon"
                    style={{width: '90%', maxHeight: 300, objectFit: 'contain'}}
                    onError={(e) => e.target.style.display = 'none'}
                />

                <IconButton
                    color="primary"
                    onClick={nextIndex}
                    size="large"
                    sx={{position: 'absolute', right: 0, mr: 1}}
                    disabled={lenghtOfImages <= 1}
                >
                    <ArrowForwardIos fontSize='inherit'/>
                </IconButton>
            </Box>

            <Box mb={1.5} sx={{display: 'flex', justifyContent: 'center'}}>
                {renderDots()}
            </Box>
        </Box>
    );
};

ImageCarousel.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string).isRequired,
        imagesTest: PropTypes.object
    }).isRequired
};
/* an example of listoFpokemonImages
        "versions": {
            "generation-i": {
                "red-blue": {
                    "back_default": null,
                    "back_gray": null,
                    "back_transparent": null,
                    "front_default": null,
                    "front_gray": null,
                    "front_transparent": null
                },
                "yellow": {
                    "back_default": null,
                    "back_gray": null,
                    "back_transparent": null,
                    "front_default": null,
                    "front_gray": null,
                    "front_transparent": null
                }
            },
            "generation-ii": {
                "crystal": {
                    "back_default": null,
                    "back_shiny": null,
                    "back_shiny_transparent": null,
                    "back_transparent": null,
                    "front_default": null,
                    "front_shiny": null,
                    "front_shiny_transparent": null,
                    "front_transparent": null
                },
                "gold": {
                    "back_default": null,
                    "back_shiny": null,
                    "front_default": null,
                    "front_shiny": null,
                    "front_transparent": null
                },
                "silver": {
                    "back_default": null,
                    "back_shiny": null,
                    "front_default": null,
                    "front_shiny": null,
                    "front_transparent": null
                }
            }
*/

/**
 * Component to display a nested menu with options to show images of a Pokémon
 * @param listOfPokemonImages
 * @param handleOpenImages
 * @returns {JSX.Element}
 * @constructor
 */
const NestedMenu =
    ({
         listOfPokemonImages,
         handleOpenImages,
         selectedGeneration,
         selectedVersion
     }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const [openSubmenu, setOpenSubmenu] = useState(null);
        const [allOpen, setAllOpen] = useState(false);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
            setOpenSubmenu(null);
        };

        const handleSubmenuClick = (generationName, event) => {
            event.stopPropagation();
            setOpenSubmenu(openSubmenu === generationName ? null : generationName);
        };

        const handleToggleAll = (e) => {
            e.stopPropagation();
            setAllOpen(!allOpen);
            setOpenSubmenu(null); // Resetea submenús individuales
        };

        const theme = useTheme();

        return (
            <>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{position: 'absolute', right: 0}}
                >
                    <MoreVertIcon/>
                </IconButton>

                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{maxHeight: 500}}
                >
                    <MenuItem onClick={handleToggleAll} selected={allOpen}>
                        <ListItemText primary={allOpen ? "Close All" : "Open All"}/>
                        <ListItemIcon sx={{justifyContent: "flex-end"}}>
                            {allOpen ? <LockIcon/> : <LockOpenIcon/>}
                        </ListItemIcon>
                    </MenuItem>

                    {Object.keys(listOfPokemonImages).map((generationName, generationIndex) => (
                        <div key={generationName}>
                            <MenuItem onClick={(e) => handleSubmenuClick(generationName, e)} selected={generationName === selectedGeneration}>
                                <ListItemText primary={generationName}/>
                                <ListItemIcon sx={{justifyContent: "flex-end"}}>
                                    {openSubmenu === generationName ? <ExpandLessIcon/> : <ExpandMore/>}
                                </ListItemIcon>
                            </MenuItem>

                            <Collapse in={allOpen || openSubmenu === generationName}>
                                <List disablePadding>
                                    {Object.keys(listOfPokemonImages[generationName]).map((versionName, versionIndex) => (
                                        <MenuItem
                                            selected={versionName === selectedVersion}
                                            key={versionName}
                                            sx={{pl: 4}}
                                            onClick={() => {
                                                handleClose();
                                                handleOpenImages({
                                                    generationName,
                                                    generationIndex,
                                                    versionName,
                                                    versionIndex
                                                });
                                            }}
                                        >
                                            {versionName}
                                        </MenuItem>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </Menu>
            </>
        );
    };

NestedMenu.propTypes = {
    listOfPokemonImages: PropTypes.object.isRequired,
    handleOpenImages: PropTypes.func.isRequired,
    selectedGeneration: PropTypes.string.isRequired,
    selectedVersion: PropTypes.string.isRequired
}

MenuItem.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node
};
